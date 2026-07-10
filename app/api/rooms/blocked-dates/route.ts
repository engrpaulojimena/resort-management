import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

/**
 * GET /api/rooms/blocked-dates?roomId=<id>
 *
 * Returns all reserved date ranges for a specific room so the
 * public booking calendar can visually block those dates.
 *
 * Query params:
 *   roomId  — numeric DB id (required)
 *
 * Response:
 *   {
 *     roomId: number,
 *     blockedRanges: Array<{ checkIn: string; checkOut: string }>
 *   }
 *
 * Only reservations with status NOT IN ('cancelled', 'checked_out')
 * are included — i.e. the same logic used in /api/rooms/availability.
 * Dates are returned as ISO date strings (YYYY-MM-DD) so the client
 * does not have to deal with timezone-shifted timestamps.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const roomIdParam = searchParams.get('roomId')

  if (!roomIdParam || isNaN(parseInt(roomIdParam))) {
    return NextResponse.json({ error: 'roomId query param is required' }, { status: 400 })
  }

  const roomId = parseInt(roomIdParam)

  try {
    // Fetch active reservations for this room
    const rows = await sql`
      SELECT
        check_in::date  AS check_in,
        check_out::date AS check_out
      FROM reservations
      WHERE room_id = ${roomId}
        AND status NOT IN ('cancelled', 'checked_out')
      ORDER BY check_in
    `

    const blockedRanges = rows.map((r) => ({
      checkIn:  r.check_in  as string,
      checkOut: r.check_out as string,
    }))

    return NextResponse.json({ roomId, blockedRanges })
  } catch (error) {
    console.error('GET /api/rooms/blocked-dates error:', error)
    return NextResponse.json({ error: 'Failed to fetch blocked dates' }, { status: 500 })
  }
}
