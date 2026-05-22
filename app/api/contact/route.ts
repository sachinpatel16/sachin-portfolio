import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, query } = body;
    
    const actualMessage = message || query || "";
    const actualSubject = subject || "New Contact Inquiry";

    // Validate inputs
    if (!name || !email || !actualMessage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, message/query)" },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to admin with user details
    const adminMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || "noreply@tms.com",
      to: process.env.ADMIN_EMAIL || "sachinpatel7496007@gmail.com",
      subject: `Portfolio: ${actualSubject} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAE4; border-radius: 8px; background-color: #FAF9F5; color: #1C1917;">
          <h2 style="color: #B45309; border-bottom: 1px solid #EAEAE4; padding-bottom: 10px; margin-top: 0;">New Inquiry Received</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #B45309; text-decoration: none;">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${actualSubject}</p>
          <p style="margin: 15px 0 5px 0;"><strong>Message:</strong></p>
          <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #EAEAE4; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #1C1917;">${actualMessage}</div>
        </div>
      `,
    };

    // Thank you email to user
    const userMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || "noreply@tms.com",
      to: email,
      subject: `Thank you for reaching out, ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAE4; border-radius: 8px; background-color: #FAF9F5; color: #1C1917;">
          <h2 style="color: #B45309; border-bottom: 1px solid #EAEAE4; padding-bottom: 10px; margin-top: 0;">Thank You!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Sachin Patel. I have received your message regarding "<strong>${actualSubject}</strong>" and will get back to you shortly.</p>
          
          <p style="margin-top: 20px; font-size: 12px; color: #78716c; font-style: italic;">A copy of your message is included below:</p>
          <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #EAEAE4; white-space: pre-wrap; font-size: 13px; line-height: 1.5; color: #44403c;">${actualMessage}</div>
          
          <p style="margin-top: 25px; border-top: 1px solid #EAEAE4; padding-top: 15px; line-height: 1.5;">
            Best regards,<br>
            <strong>Sachin Patel</strong><br>
            <span style="font-size: 12px; color: #78716c;">Python & LLM Developer</span>
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
