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
