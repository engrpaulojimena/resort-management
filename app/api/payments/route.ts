import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import nodemailer from 'nodemailer'

const sql = neon(process.env.DATABASE_URL!)

const GMAIL_USER = process.env.GMAIL_USER || ''
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ''
const RESORT_NAME = process.env.RESORT_NAME || 'Kekamiya Beach Resort'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || GMAIL_USER

function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  })
}

async function sendEmail(to: string, subject: string, html: string) {
  const transporter = getTransporter()
  if (!transporter) {
    console.log(`[payments:dry-run] would send "${subject}" to ${to}`)
    return
  }
  try {
    await transporter.sendMail({
      from: `"${RESORT_NAME}" <${GMAIL_USER}>`,
      to,
      subject,
      html,
    })
  } catch (err) {
    console.error('[payments] sendEmail failed:', err)
  }
}

function guestPaymentReceivedHtml(opts: {
  guestName: string
  confirmationCode: string
  amount: number
  method: string
  referenceNumber: string
  roomName: string
  checkIn: string
  checkOut: string
}) {
  const methodLabel = opts.method === 'gcash' ? 'GCash' : 'Bank Transfer'
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f0f9ff;">
<div style="max-width:600px;margin:0 auto;padding:24px;">
  <div style="background:linear-gradient(135deg,#0c4a6e,#0284c7);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:24px;">${RESORT_NAME}</h1>
    <p style="color:#bae6fd;margin:6px 0 0;font-size:13px;">Botolan, Zambales · Philippines</p>
  </div>
  <div style="background:#fff;padding:28px;border-left:1px solid #e0f2fe;border-right:1px solid #e0f2fe;">
    <h2 style="color:#0c4a6e;margin:0 0 4px;">Deposit Received — Pending Verification 🕐</h2>
    <p style="color:#64748b;margin:0 0 24px;">Hi ${opts.guestName.split(' ')[0]}, we received your deposit submission! Our staff will verify and confirm within a few hours.</p>
    <div style="background:#f0f9ff;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #bae6fd;text-align:center;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#0284c7;letter-spacing:1px;text-transform:uppercase;">Booking Reference</p>
      <p style="margin:0;font-size:28px;font-weight:bold;color:#0c4a6e;letter-spacing:4px;">${opts.confirmationCode}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Villa</td>
          <td style="padding:10px 0;font-weight:600;text-align:right;color:#0c4a6e;">${opts.roomName}</td></tr>
      <tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Check-in</td>
          <td style="padding:10px 0;font-weight:600;text-align:right;color:#0c4a6e;">${opts.checkIn}</td></tr>
      <tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Check-out</td>
          <td style="padding:10px 0;font-weight:600;text-align:right;color:#0c4a6e;">${opts.checkOut}</td></tr>
      <tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Payment Method</td>
          <td style="padding:10px 0;font-weight:600;text-align:right;color:#0c4a6e;">${methodLabel}</td></tr>
      <tr><td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Reference No.</td>
          <td style="padding:10px 0;font-weight:600;text-align:right;color:#0c4a6e;">${opts.referenceNumber}</td></tr>
      <tr><td style="padding:14px 0 4px;color:#0c4a6e;font-weight:700;">Deposit Submitted</td>
          <td style="padding:14px 0 4px;font-weight:700;text-align:right;font-size:20px;color:#16a34a;">₱${opts.amount.toLocaleString()}</td></tr>
    </table>
    <div style="background:#fef9c3;border-radius:12px;padding:14px;border:1px solid #fde047;margin-top:20px;">
      <p style="margin:0;font-size:13px;color:#713f12;">⏳ <strong>Status: Pending Verification</strong><br>Once our staff confirms your payment, you'll receive a final confirmation email. This usually takes a few hours.</p>
    </div>
  </div>
  <div style="background:#0c4a6e;padding:18px;border-radius:0 0 16px 16px;text-align:center;">
    <p style="color:#bae6fd;margin:0;font-size:13px;">Questions? Email us at <a href="mailto:${GMAIL_USER}" style="color:#7dd3fc;">${GMAIL_USER}</a></p>
  </div>
</div>
</body>
</html>`
}

function adminPaymentNotificationHtml(opts: {
  guestName: string
  guestEmail: string
  confirmationCode: string
  amount: number
  method: string
  referenceNumber: string
  roomName: string
  checkIn: string
  checkOut: string
  totalAmount: number
  proofDataUrl?: string
}) {
  const methodLabel = opts.method === 'gcash' ? 'GCash' : 'Bank Transfer'
  const dashboardUrl = process.env.ADMIN_DASHBOARD_URL || '#'
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f8fafc;">
<div style="max-width:600px;margin:0 auto;padding:24px;">
  <div style="background:linear-gradient(135deg,#16a34a,#15803d);padding:24px 32px;border-radius:16px 16px 0 0;">
    <h2 style="color:#fff;margin:0;font-size:20px;">💰 Deposit Payment Submitted</h2>
    <p style="color:#bbf7d0;margin:4px 0 0;font-size:13px;">${RESORT_NAME} · pending verification</p>
  </div>
  <div style="background:#fff;padding:28px;border:1px solid #e2e8f0;border-top:none;">
    <div style="margin-bottom:20px;">
      <p style="margin:0;font-size:20px;font-weight:700;color:#1e293b;">${opts.guestName}</p>
      <p style="margin:2px 0 0;font-size:14px;color:#64748b;">${opts.guestEmail}</p>
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;margin-bottom:20px;">
      <p style="margin:0;font-size:11px;color:#16a34a;font-weight:700;letter-spacing:1px;">CONFIRMATION CODE</p>
      <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#15803d;letter-spacing:3px;">${opts.confirmationCode}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr style="background:#f8fafc;"><td style="padding:10px 12px;color:#64748b;font-weight:600;">Villa</td>
          <td style="padding:10px 12px;color:#1e293b;">${opts.roomName}</td></tr>
      <tr><td style="padding:10px 12px;color:#64748b;font-weight:600;">Check-in</td>
          <td style="padding:10px 12px;color:#1e293b;">${opts.checkIn}</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:10px 12px;color:#64748b;font-weight:600;">Check-out</td>
          <td style="padding:10px 12px;color:#1e293b;">${opts.checkOut}</td></tr>
      <tr><td style="padding:10px 12px;color:#64748b;font-weight:600;">Payment Method</td>
          <td style="padding:10px 12px;color:#1e293b;">${methodLabel}</td></tr>
      <tr style="background:#f8fafc;"><td style="padding:10px 12px;color:#64748b;font-weight:600;">Reference No.</td>
          <td style="padding:10px 12px;color:#1e293b;font-weight:700;">${opts.referenceNumber}</td></tr>
      <tr><td style="padding:10px 12px;color:#64748b;font-weight:600;">Total Booking</td>
          <td style="padding:10px 12px;color:#1e293b;">₱${opts.totalAmount.toLocaleString()}</td></tr>
      <tr style="background:#f0fdf4;"><td style="padding:12px;color:#15803d;font-weight:700;font-size:15px;">Deposit Amount</td>
          <td style="padding:12px;color:#15803d;font-weight:700;font-size:18px;">₱${opts.amount.toLocaleString()}</td></tr>
    </table>
    ${opts.proofDataUrl ? `<div style="margin-top:20px;"><p style="font-size:12px;color:#64748b;font-weight:600;margin-bottom:8px;">PROOF OF PAYMENT:</p><img src="${opts.proofDataUrl}" alt="Proof of payment" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0;" /></div>` : ''}
    <div style="margin-top:20px;text-align:center;">
      <a href="${dashboardUrl}/admin/payments" style="display:inline-block;background:#16a34a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Verify Payment in Dashboard →</a>
    </div>
  </div>
  <div style="background:#1e293b;padding:16px;border-radius:0 0 16px 16px;text-align:center;">
    <p style="color:#94a3b8;margin:0;font-size:12px;">${RESORT_NAME} Admin Notification · Action Required</p>
  </div>
</div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      reservationId,
      amount,
      method,
      paymentType,
      referenceNumber,
      proofBase64,
      proofFileName,
      proofFileType,
      guestName,
      guestEmail,
      confirmationCode,
      roomName,
      checkIn,
      checkOut,
      totalAmount,
    } = body

    // ── Validate ──
    if (!reservationId || !amount || !method || !referenceNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Insert payment record ──
    // Store proof as base64 data URL in proof_url (works without external storage)
    // In production, you'd upload to Supabase Storage / Cloudinary / S3 instead
    const proofUrl = proofBase64 || null

    const newPayment = await sql`
      INSERT INTO payments (
        reservation_id, amount, method, status, payment_type,
        reference_number, proof_url, notes, created_at, updated_at
      ) VALUES (
        ${reservationId}, ${amount.toFixed(2)}, ${method}, 'pending', ${paymentType || 'deposit'},
        ${referenceNumber}, ${proofUrl}, ${`Submitted via website by ${guestName}`},
        NOW(), NOW()
      )
      RETURNING id
    `
    const paymentId = newPayment[0].id

    // ── Notify admin users in DB ──
    try {
      const adminUsers = await sql`
        SELECT id FROM users WHERE role IN ('admin', 'super_admin') AND is_active = true
      `
      const methodLabel = method === 'gcash' ? 'GCash' : 'Bank Transfer'
      for (const adminUser of adminUsers) {
        await sql`
          INSERT INTO notifications (user_id, type, title, message, entity, entity_id, is_read, email_sent, created_at)
          VALUES (
            ${adminUser.id}, 'payment_pending',
            'Deposit Payment Submitted',
            ${`${guestName} submitted a ₱${Number(amount).toLocaleString()} deposit via ${methodLabel} for ${confirmationCode}. Reference: ${referenceNumber}`},
            'payment', ${paymentId}, false, false, NOW()
          )
        `
      }
    } catch (err) {
      console.error('[payments] notification insert failed (non-fatal):', err)
    }

    // ── Activity log ──
    await sql`
      INSERT INTO activity_logs (type, entity, entity_id, description, created_at)
      VALUES (
        'create', 'payment', ${paymentId},
        ${`Deposit of ₱${Number(amount).toLocaleString()} submitted via website by ${guestName} (${confirmationCode}) — ${method}, ref: ${referenceNumber}`},
        NOW()
      )
    `.catch(() => {})

    // ── Send emails ──
    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-PH', {
      weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
    })

    // Only attach proof image in email if it's an actual image (not PDF) and not too large
    const isImage = proofFileType?.startsWith('image/')
    const proofForEmail = isImage && proofBase64 && proofBase64.length < 3_000_000
      ? proofBase64
      : undefined

    Promise.allSettled([
      sendEmail(
        guestEmail,
        `Deposit Received — Pending Verification · ${confirmationCode}`,
        guestPaymentReceivedHtml({
          guestName,
          confirmationCode,
          amount: Number(amount),
          method,
          referenceNumber,
          roomName,
          checkIn: formatDate(checkIn),
          checkOut: formatDate(checkOut),
        })
      ),
      sendEmail(
        ADMIN_EMAIL,
        `💰 Deposit Submitted: ${guestName} · ${confirmationCode} · ₱${Number(amount).toLocaleString()}`,
        adminPaymentNotificationHtml({
          guestName,
          guestEmail,
          confirmationCode,
          amount: Number(amount),
          method,
          referenceNumber,
          roomName,
          checkIn: formatDate(checkIn),
          checkOut: formatDate(checkOut),
          totalAmount: Number(totalAmount),
          proofDataUrl: proofForEmail,
        })
      ),
    ])

    return NextResponse.json({ success: true, paymentId })
  } catch (err) {
    console.error('[payments] error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
