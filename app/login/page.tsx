"use client";

import Image from "next/image";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { sendOtp, verifyOtp, loginWithGoogle, user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in - Centralized Logic
  useEffect(() => {
    if (!isLoading && user) {
      // Check for return URL in query params or local storage
      const params = new URLSearchParams(window.location.search);
      const returnUrl =
        params.get("returnUrl") || localStorage.getItem("redirectAfterLogin");

      if (returnUrl) {
        // Clear storage to prevent sticky redirects
        localStorage.removeItem("redirectAfterLogin");
        router.push(returnUrl);
      } else {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const res = await sendOtp(email);
    setLoading(false);

    if (res.success) {
      setOtpSent(true);
    } else {
      alert(res.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setVerifying(true);
    const res = await verifyOtp(email, otp);
    setVerifying(false);

    if (!res.success) {
      alert(res.message || "Invalid OTP");
    }
    // If success, 'user' state updates -> useEffect triggers redirect
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        alert(res.message || "Google Login Failed");
      }
      // If success, 'user' state updates -> useEffect triggers redirect
    } catch (error) {
      console.error(error);
      alert("Something went wrong with Google Login");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,#0B0B0C,#120E18,#0A0A0A)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Subtle Grain Texture (Optional simulation via transparent noise if available, otherwise just gradient) */}

      {/* Background Glow - Reduced to very subtle warm ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121212]/85 border border-[#C9A24D]/20 rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-[18px]">
        {/* Header */}
        <div className="text-center mb-10 relative">
          {/* Logo Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#C9A24D]/10 rounded-full blur-2xl -z-10" />

          <div className="flex justify-center mb-6">
            <Image
              src="/Sprites/MilanLogo.png"
              alt="MILAN '26"
              width={300}
              height={120}
              className="h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(201,162,77,0.2)]"
              priority
            />
          </div>
          <p className="text-[#C9A24D]/60 text-[10px] font-bold tracking-[0.3em] uppercase">
            {otpSent ? "Identity Verification" : "Secure Login"}
          </p>
        </div>

        {/* Form Container */}
        {!otpSent ? (
          <form
            onSubmit={handleSendOtp}
            className="space-y-7">
            <div className="space-y-2">
              <label className="text-[#F6F2EA]/60 text-xs font-semibold tracking-widest uppercase block pl-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#C9A24D]/50 group-focus-within:text-[#C9A24D] transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#141414] border border-[#C9A24D]/25 text-[#F6F2EA] rounded-full py-4 pl-14 pr-6 focus:outline-none focus:border-[#C9A24D] focus:shadow-[0_0_15px_rgba(201,162,77,0.1)] transition-all duration-300 placeholder:text-[#F6F2EA]/20"
                  required
                />
              </div>
              <p className="text-[#F6F2EA]/40 text-[11px] pl-1 tracking-wide">
                SRM students use{" "}
                <span className="text-[#C9A24D]/70 font-medium">
                  @srmist.edu.in
                </span>{" "}
                mail id.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F6F2EA] text-[#1A1A1A] font-bold tracking-wide rounded-full py-4 flex items-center justify-center gap-2 hover:bg-[#fffcf5] hover:shadow-[0_0_20px_rgba(201,162,77,0.2)] active:scale-[0.98] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#1A1A1A]" />
                  Sending...
                </>
              ) : (
                <>Get Verification Code</>
              )}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-7">
            <div className="space-y-2">
              <label className="text-[#F6F2EA]/60 text-xs font-bold tracking-widest uppercase block pl-1">
                Verification Code
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <CheckCircle className="h-5 w-5 text-[#C9A24D]/50 group-focus-within:text-[#C9A24D] transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-[#141414] border border-[#C9A24D]/25 text-[#F6F2EA] rounded-full py-4 pl-14 pr-6 focus:outline-none focus:border-[#C9A24D] focus:shadow-[0_0_15px_rgba(201,162,77,0.1)] transition-all duration-300 placeholder:text-[#F6F2EA]/20 tracking-[0.25em]"
                  required
                  maxLength={6}
                />
              </div>
              <p className="text-[#F6F2EA]/40 text-[11px] pl-1">
                Sent to{" "}
                <span className="text-[#F6F2EA]/80 font-medium">{email}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full bg-[#F6F2EA] text-[#1A1A1A] font-bold tracking-wide rounded-full py-4 flex items-center justify-center gap-2 hover:bg-[#fffcf5] hover:shadow-[0_0_20px_rgba(201,162,77,0.2)] active:scale-[0.98] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed">
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#1A1A1A]" />
                  Verifying...
                </>
              ) : (
                <>
                  Enter Milan &apos;26
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-[#C9A24D]/60 text-xs hover:text-[#C9A24D] transition-colors tracking-wide mt-2">
              Incorrect email? Restart
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#C9A24D]/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px]">
            <span className="px-4 text-[#C9A24D]/40 bg-[#121212] uppercase tracking-[0.2em] font-medium">
              or
            </span>
          </div>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#1A1A1A] hover:bg-[#222] border border-[#C9A24D]/20 hover:border-[#C9A24D]/40 text-[#F6F2EA]/80 font-medium rounded-full py-3.5 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group">
          <svg
            className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="tracking-wide">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
