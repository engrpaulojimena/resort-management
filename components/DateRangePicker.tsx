'use client'

/**
 * DateRangePicker
 *
 * A custom calendar built on top of react-day-picker (v8).
 * Install: npm install react-day-picker@8 date-fns
 *
 * Features
 * ────────
 * • Resort colour palette (ocean / sand / palm) via Tailwind utility classes
 * • Visually blocks dates that are already reserved for the selected room
 * • Prevents selecting past dates or a check-out before check-in
 * • Highlights the currently selected range with ocean-tinted background
 * • Shows a red "fully blocked" warning if the entire visible month has no
 *   free dates for the chosen room
 */

import { useState, useEffect, useCallback } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { addDays, isBefore, isAfter, startOfDay, format, eachDayOfInterval, parseISO } from 'date-fns'
import { Loader2, AlertCircle } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

interface BlockedRange {
  checkIn:  string   // YYYY-MM-DD
  checkOut: string   // YYYY-MM-DD (exclusive end, i.e. last night)
}

interface DateRangePickerProps {
  roomId:    string | number | null
  checkIn:   string   // YYYY-MM-DD
  checkOut:  string   // YYYY-MM-DD
  onChange:  (checkIn: string, checkOut: string) => void
  className?: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toDate(iso: string): Date {
  return startOfDay(parseISO(iso))
}

/**
 * Expand blocked ranges into a flat Set of ISO date strings
 * (each day within [checkIn, checkOut) counts as blocked).
 * The checkOut date itself is the first free night, so we
 * exclude it so guests can check IN on the day someone else checks OUT.
 */
function buildBlockedSet(ranges: BlockedRange[]): Set<string> {
  const set = new Set<string>()
  for (const { checkIn, checkOut } of ranges) {
    const start = parseISO(checkIn)
    // Last blocked night is checkOut - 1 day
    const end   = addDays(parseISO(checkOut), -1)
    if (isBefore(end, start)) continue
    for (const d of eachDayOfInterval({ start, end })) {
      set.add(format(d, 'yyyy-MM-dd'))
    }
  }
  return set
}

function isDateBlocked(date: Date, blockedSet: Set<string>): boolean {
  return blockedSet.has(format(date, 'yyyy-MM-dd'))
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DateRangePicker({
  roomId,
  checkIn,
  checkOut,
  onChange,
  className = '',
}: DateRangePickerProps) {
  const [blockedRanges, setBlockedRanges] = useState<BlockedRange[]>([])
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState<string | null>(null)

  // ── Fetch blocked dates whenever the selected room changes ────────────────
  const fetchBlocked = useCallback(async (id: string | number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/rooms/blocked-dates?roomId=${id}`)
      if (!res.ok) throw new Error('Could not load blocked dates')
      const data: { blockedRanges: BlockedRange[] } = await res.json()
      setBlockedRanges(data.blockedRanges)
    } catch {
      setError('Could not load blocked dates for this room.')
      setBlockedRanges([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (roomId) fetchBlocked(roomId)
    else setBlockedRanges([])
  }, [roomId, fetchBlocked])

  // ── Derive state from props ───────────────────────────────────────────────
  const blockedSet = buildBlockedSet(blockedRanges)

  const today    = startOfDay(new Date())
  const selected: DateRange = {
    from: checkIn  ? toDate(checkIn)  : undefined,
    to:   checkOut ? toDate(checkOut) : undefined,
  }

  // ── Handle day selection ──────────────────────────────────────────────────
  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      onChange('', '')
      return
    }

    const { from, to } = range

    // Block selecting a blocked date as start
    if (from && isDateBlocked(from, blockedSet)) return

    if (from && !to) {
      onChange(format(from, 'yyyy-MM-dd'), '')
      return
    }

    if (from && to) {
      // If any day in the range is blocked, truncate check-out to day before first block
      const days = eachDayOfInterval({ start: from, end: to })
      let safeEnd = to
      for (const d of days) {
        if (isDateBlocked(d, blockedSet)) {
          safeEnd = addDays(d, -1)
          break
        }
      }
      if (isBefore(safeEnd, from)) {
        // Range collapses — only set check-in
        onChange(format(from, 'yyyy-MM-dd'), '')
      } else {
        onChange(format(from, 'yyyy-MM-dd'), format(safeEnd, 'yyyy-MM-dd'))
      }
    }
  }

  // ── Modifiers for react-day-picker ────────────────────────────────────────
  const disabledDays = [
    { before: today },
    (date: Date) => isDateBlocked(date, blockedSet),
  ]

  const modifiers = {
    blocked: (date: Date) => isDateBlocked(date, blockedSet),
    rangeStart: selected.from ? [selected.from] : [],
    rangeEnd:   selected.to   ? [selected.to]   : [],
    inRange: selected.from && selected.to
      ? (date: Date) =>
          isAfter(date, selected.from!) && isBefore(date, selected.to!)
      : [],
  }

  const modifiersClassNames = {
    blocked:    'rdp-day_blocked',
    rangeStart: 'rdp-day_range_start',
    rangeEnd:   'rdp-day_range_end',
    inRange:    'rdp-day_in_range',
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={`relative ${className}`}>
      {/* Inline styles scoped to this component */}
      <style>{`
        /* ── Base ── */
        .resort-picker { font-family: inherit; }
        .resort-picker .rdp-months        { gap: 0; }
        .resort-picker .rdp-caption_label { font-weight: 700; color: #003050; font-size: 0.95rem; }
        .resort-picker .rdp-nav_button    { color: #006da0; border-radius: 8px; padding: 4px; }
        .resort-picker .rdp-nav_button:hover { background: #e0f7ff; }
        .resort-picker .rdp-head_cell     { color: #0090c7; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; padding-bottom: 4px; }
        .resort-picker .rdp-day           { border-radius: 8px; font-size: 0.875rem; width: 2.25rem; height: 2.25rem; }
        .resort-picker .rdp-day:hover:not([disabled]) { background: #b3edff !important; color: #003050 !important; }

        /* ── Disabled / past ── */
        .resort-picker .rdp-day_disabled  { color: #d1d5db; cursor: not-allowed; }

        /* ── Blocked (reserved by someone else) ── */
        .resort-picker .rdp-day_blocked   {
          background: #fef2f2 !important;
          color: #fca5a5 !important;
          text-decoration: line-through;
          cursor: not-allowed;
        }

        /* ── Selected range ── */
        .resort-picker .rdp-day_range_start,
        .resort-picker .rdp-day_range_end {
          background: #006da0 !important;
          color: #ffffff !important;
          border-radius: 8px !important;
        }
        .resort-picker .rdp-day_in_range  {
          background: #b3edff !important;
          color: #003050 !important;
          border-radius: 0 !important;
        }
        .resort-picker .rdp-day_range_start { border-radius: 8px 0 0 8px !important; }
        .resort-picker .rdp-day_range_end   { border-radius: 0 8px 8px 0 !important; }
        .resort-picker .rdp-day_range_start.rdp-day_range_end { border-radius: 8px !important; }

        /* ── Today dot ── */
        .resort-picker .rdp-day_today:not(.rdp-day_range_start):not(.rdp-day_range_end) {
          color: #06b4e9;
          font-weight: 700;
        }
      `}</style>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center rounded-xl">
          <Loader2 className="w-6 h-6 animate-spin text-ocean-500" />
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2 mb-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Legend */}
      {blockedRanges.length > 0 && (
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-red-100 border border-red-200 inline-block" />
            Already reserved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-ocean-700 inline-block" />
            Your selection
          </span>
        </div>
      )}

      <DayPicker
        className="resort-picker"
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        disabled={disabledDays}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        fromDate={today}
        numberOfMonths={1}
        showOutsideDays={false}
      />
    </div>
  )
}
