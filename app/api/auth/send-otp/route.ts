
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { storeOtp } from '@/lib/otpStore';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in memory (or DB)
    storeOtp(email, otp);

    // Create Transporter
    // Note: Ensure EMAIL_USER and EMAIL_PASS are set in .env.local
    // For Gmail: Use App Password, not regular password.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Milan '26 Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #fce7f3; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          
          <!-- Outer Wrapper / Background Pattern -->
          <div style="width: 100%; background-color: #f3e8ff; background-image: repeating-linear-gradient(45deg, #f3e8ff 0, #f3e8ff 10px, #fdf4ff 0, #fdf4ff 50px); padding: 40px 0;">
              
              <!-- Main Red Card -->
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #4a0404; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                  
                  <!-- Top Header with Logo Area (Black Curve effect simulation) -->
                  <tr>
                      <td style="background-color: #000000; padding: 30px 20px; text-align: center; border-bottom: 4px solid #b91c1c;">
                          <h1 style="color: #ffffff; font-size: 38px; font-weight: 800; margin: 0; letter-spacing: -1px; font-family: sans-serif;">MILAN</h1>
                          <p style="color: #a3a3a3; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin: 5px 0 0 0;">National Level Cultural Fest</p>
                          <p style="color: #ffffff; font-size: 14px; font-style: italic; margin: 5px 0 0 0; opacity: 0.8;">#LiveTheChange</p>
                      </td>
                  </tr>

                  <!-- Content Section -->
                  <tr>
                      <td style="padding: 40px 30px; text-align: center;">
                          
                          <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.4; margin: 0 0 30px 0;">
                              Here is your verification code<br>to access your account for<br>MILAN'26
                          </h2>

                          <!-- OTP Pill -->
                          <div style="background-color: #000000; border-radius: 50px; padding: 20px 40px; display: inline-block; margin-bottom: 30px; border: 1px solid #333;">
                              <span style="color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 6px; font-family: 'Courier New', monospace;">${otp}</span>
                          </div>

                          <p style="color: #e5e5e5; font-size: 14px; margin: 0; font-weight: 500;">
                              The code is valid for 10 minutes.<br>Do not share it with anyone.
                          </p>
                      </td>
                  </tr>

                  <!-- Footer Section -->
                  <tr>
                      <td style="padding: 0 30px 40px 30px; text-align: center;">
                          <p style="color: #999999; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 0;">&copy; 2026 SRM Milan.</p>
                          <p style="color: #666666; font-size: 10px; margin: 5px 0 0 0;">All rights reserved.</p>
                          <p style="color: #555555; font-size: 10px; margin: 15px 0 0 0; line-height: 1.4;">This is an automated message,<br>please do not reply.</p>
                      </td>
                  </tr>

              </table>
          </div>

      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Milan '26" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Login Code: ${otp}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error: unknown) {
    console.error('Error in send-otp:', error);
    // Return detailed error for debugging if environment vars are missing
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return NextResponse.json({ 
            success: false, 
            message: 'Server configuration error: Missing Email Credentials.' 
        }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: 'Failed to send OTP email.' }, { status: 500 });
  }
}
