
import { NextResponse } from 'next/server';
import { verifyOtpInStore } from '@/lib/otpStore';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: 'Email and OTP are required' }, { status: 400 });
    }

    const isValid = verifyOtpInStore(email, otp);

    if (isValid) {
      // In a real app, you would create a session JWT here.
      // Since we are decoupling from Supabase Auth for the OTP part,
      // we return success and the frontend handles the 'logged in' state via Context.
      // If backend routes need protection, we would need to issue a token here.
      
      return NextResponse.json({ 
          success: true, 
          user: { 
              email, 
              name: email.split('@')[0], // Simple name derivation
              id: 'custom-otp-user' 
          } 
      });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 500 });
  }
}
