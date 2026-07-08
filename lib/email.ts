import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set. Check your .env.local file.')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'reservations@kekamiyabeachresort.com'

// Send booking confirmation to guest
export async function sendBookingConfirmation({
  to,
  guestName,
  roomType,
  checkIn,
  checkOut,
  guests,
  totalAmount,
  bookingId,
}: {
  to: string
  guestName: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  bookingId: number
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `🌊 Booking Confirmed! Welcome to Kekamiya Beach Resort`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f0f9ff; padding: 20px; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #0284c7, #0ea5e9); padding: 32px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🌊 Kekamiya Beach Resort</h1>
          <p style="color: #bae6fd; margin: 8px 0 0;">Botolan, Zambales</p>
        </div>

        <div style="background: white; padding: 28px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #e0f2fe;">
          <h2 style="color: #0c4a6e; margin: 0 0 8px;">Booking Confirmed! 🎉</h2>
          <p style="color: #475569; margin: 0 0 24px;">Hi ${guestName}, your paradise awaits!</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Booking ID</td><td style="padding: 10px 0; font-weight: bold; text-align: right; color: #0c4a6e;">#${bookingId}</td></tr>
            <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Room</td><td style="padding: 10px 0; font-weight: bold; text-align: right; color: #0c4a6e;">${roomType}</td></tr>
            <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Check-in</td><td style="padding: 10px 0; font-weight: bold; text-align: right; color: #0c4a6e;">${checkIn}</td></tr>
            <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Check-out</td><td style="padding: 10px 0; font-weight: bold; text-align: right; color: #0c4a6e;">${checkOut}</td></tr>
            <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Guests</td><td style="padding: 10px 0; font-weight: bold; text-align: right; color: #0c4a6e;">${guests}</td></tr>
            <tr><td style="padding: 10px 0; color: #64748b;">Total Amount</td><td style="padding: 10px 0; font-weight: bold; text-align: right; font-size: 20px; color: #0284c7;">₱${totalAmount.toLocaleString()}</td></tr>
          </table>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 12px; border: 1px solid #d1fae5; margin-bottom: 16px;">
          <h3 style="color: #065f46; margin: 0 0 8px;">📍 Getting Here</h3>
          <p style="color: #047857; margin: 0; font-size: 14px;">Botolan, Zambales, Philippines<br>~3-4 hours from Manila via NLEX/SCTEX</p>
        </div>

        <p style="color: #94a3b8; font-size: 12px; text-align: center;">Questions? Contact us at ${FROM_EMAIL}</p>
      </div>
    `,
  })
}

// Send contact form notification to admin
export async function sendContactNotification({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: FROM_EMAIL,
    subject: `📬 New Contact: ${subject || 'General Inquiry'} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f8fafc; padding: 16px; border-radius: 8px;">${message}</p>
      </div>
    `,
  })
}

// Generic sendEmail function used by send-email route
export async function sendEmail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string
  subject: string
  html: string
  attachments?: { filename: string; content: Buffer; contentType: string }[]
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      attachments: attachments?.map(a => ({
        filename: a.filename,
        content: a.content,
      })),
    })
    return { success: true, id: result.data?.id ?? 'sent' }
  } catch (err: any) {
    return { success: false, error: err?.message ?? 'Unknown error' }
  }
}

// Email templates
import type { Reservation, Payment } from '@/types'

export function reservationConfirmationEmail(reservation: Reservation): { subject: string; html: string } {
  return {
    subject: `🌊 Booking Confirmed! #${reservation.id} — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0c4a6e;">Booking Confirmed! 🎉</h2>
      <p>Hi ${reservation.guestName}, your booking #${reservation.id} is confirmed.</p>
      <p><strong>Check-in:</strong> ${reservation.checkIn}</p>
      <p><strong>Check-out:</strong> ${reservation.checkOut}</p>
      <p><strong>Room:</strong> ${reservation.room?.type ?? reservation.roomId ?? "N/A"}</p>
      <p>Thank you for choosing Kekamiya Beach Resort!</p>
    </div>`,
  }
}

export function paymentReceivedEmail(payment: Payment): { subject: string; html: string } {
  return {
    subject: `💳 Payment Received — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0c4a6e;">Payment Received</h2>
      <p>We received your payment of <strong>₱${Number(payment.amount).toLocaleString()}</strong>.</p>
      <p>It is currently being verified. We'll notify you once confirmed.</p>
    </div>`,
  }
}

export function paymentVerifiedEmail(payment: Payment): { subject: string; html: string } {
  return {
    subject: `✅ Payment Verified — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#065f46;">Payment Verified! ✅</h2>
      <p>Your payment of <strong>₱${Number(payment.amount).toLocaleString()}</strong> has been verified.</p>
      <p>We look forward to welcoming you!</p>
    </div>`,
  }
}

export function paymentRejectedEmail(payment: Payment): { subject: string; html: string } {
  return {
    subject: `❌ Payment Issue — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#991b1b;">Payment Not Verified</h2>
      <p>Unfortunately, we could not verify your payment of <strong>₱${Number(payment.amount).toLocaleString()}</strong>.</p>
      <p>Please contact us for assistance.</p>
    </div>`,
  }
}

export function checkInReminderEmail(reservation: Reservation): { subject: string; html: string } {
  return {
    subject: `🏖️ Check-in Reminder — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0c4a6e;">Your Stay Starts Today! 🏖️</h2>
      <p>Hi ${reservation.guestName}, your check-in is today.</p>
      <p>We can't wait to welcome you to Kekamiya Beach Resort!</p>
    </div>`,
  }
}

export function checkOutReceiptEmail(reservation: Reservation, payments: Payment[]): { subject: string; html: string } {
  const total = payments.filter(p => p.status === 'verified').reduce((s, p) => s + Number(p.amount), 0)
  return {
    subject: `🧾 Check-out Receipt — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0c4a6e;">Thank You for Staying! 🌊</h2>
      <p>Hi ${reservation.guestName}, we hope you enjoyed your stay.</p>
      <p><strong>Total Paid:</strong> ₱${total.toLocaleString()}</p>
      <p>See you again at Kekamiya Beach Resort!</p>
    </div>`,
  }
}

export function testEmail(name: string): { subject: string; html: string } {
  return {
    subject: `✉️ Test Email — Kekamiya Beach Resort`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0c4a6e;">Test Email ✉️</h2>
      <p>Hi ${name}, this is a test email from Kekamiya Beach Resort.</p>
      <p>If you received this, your email configuration is working correctly! ✅</p>
    </div>`,
  }
}