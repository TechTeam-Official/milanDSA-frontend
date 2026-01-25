
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
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  background-color: #000000;
                  color: #ffffff;
              }
              .wrapper {
                  width: 100%;
                  table-layout: fixed;
                  background-color: #000000;
                  padding-bottom: 40px;
              }
              .main-table {
                  background-color: #0a0a0a;
                  margin: 0 auto;
                  width: 100%;
                  max-width: 600px;
                  border-spacing: 0;
                  font-family: sans-serif;
                  color: #e5e5e5;
                  border: 1px solid #262626;
                  border-radius: 20px;
                  overflow: hidden;
                  box-shadow: 0 0 50px rgba(139, 92, 246, 0.1); 
              }
              .header-bg {
                  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
                  padding: 40px 0;
                  text-align: center;
                  position: relative;
              }
              .header-glow {
                  position: absolute;
                  top: -50%;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 200px;
                  height: 200px;
                  background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(0,0,0,0) 70%);
                  filter: blur(40px);
                  z-index: 0;
              }
              .brand-text {
                  font-size: 36px;
                  font-weight: 800;
                  margin: 0;
                  position: relative;
                  z-index: 1;
                  background: linear-gradient(to bottom, #ffffff, #9ca3af);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  letter-spacing: -1px;
              }
              .brand-sub {
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 3px;
                  color: #6d28d9;
                  margin-top: 5px;
                  font-weight: 600;
                  position: relative;
                  z-index: 1;
              }
              .content-section {
                  padding: 40px 40px 20px 40px;
                  text-align: center;
              }
              .welcome-text {
                  font-size: 18px;
                  color: #e5e5e5;
                  margin-bottom: 24px;
                  line-height: 1.5;
              }
              .otp-container {
                  margin: 30px auto;
                  background: #171717;
                  border: 1px solid #333;
                  border-radius: 16px;
                  padding: 24px;
                  max-width: 280px;
                  position: relative;
              }
              .otp-code {
                  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
                  font-size: 32px;
                  color: #ffffff;
                  font-weight: 700;
                  letter-spacing: 8px;
                  margin: 0;
                  text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
              }
              .expiry-text {
                  font-size: 13px;
                  color: #737373;
                  margin-top: 24px;
              }
              .divider {
                  height: 1px;
                  background-color: #262626;
                  margin: 30px 40px;
              }
              .footer {
                  text-align: center;
                  padding: 0 20px 30px 20px;
                  color: #525252;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="wrapper">
              <table class="main-table">
                  <tr>
                      <td class="header-bg">
                          <div class="header-glow"></div>
                          <h1 class="brand-text">MILAN '26</h1>
                          <div class="brand-sub">Secure Login</div>
                      </td>
                  </tr>
                  <tr>
                      <td class="content-section">
                          <p class="welcome-text">Here is your verification code to access your Milan '26 account.</p>
                          
                          <div class="otp-container">
                              <div class="otp-code">${otp}</div>
                          </div>
  
                          <p class="expiry-text">This code is valid for 10 minutes. Do not share it with anyone.</p>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <div class="divider"></div>
                      </td>
                  </tr>
                  <tr>
                      <td class="footer">
                          <p style="margin: 5px 0;">&copy; 2026 SRM Milan. All rights reserved.</p>
                          <p style="margin: 5px 0;">This is an automated message, please do not reply.</p>
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
