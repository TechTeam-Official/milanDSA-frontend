"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentGatewayPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">(
    "pending",
  );

  // 🔄 POLLING LOGIC: Checks for payment every 3 seconds
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Ask our internal API if the webhook has arrived
        const res = await fetch("/api/check-payment");
        const data = await res.json();

        if (data.paid) {
          console.log("✅ Payment Confirmed! Redirecting...");
          setPaymentStatus("success");

          // Wait 3 seconds to show success message, then go to home/dashboard
          setTimeout(() => {
            router.push("/"); // 👈 CHANGE THIS to your desired success URL
          }, 3000);
        }
      } catch (error) {
        console.error("Polling error (ignoring...)", error);
      }
    };

    // Start the interval
    // ⭐️ FIX: Changed 'let' to 'const'
    const intervalId = setInterval(checkPaymentStatus, 3000);

    // Cleanup when user leaves page
    return () => clearInterval(intervalId);
  }, [router]);

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* SUCCESS OVERLAY (Shows when payment is detected) */}
      <AnimatePresence>
        {paymentStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md text-center p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-white/50 text-lg">
              Redirecting you to the dashboard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN PAYMENT FORM */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl relative">
        {/* HEADER */}
        <div className="mb-4 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white/60">
            Complete Payment
          </h1>
          <p className="text-sm text-white/40 flex items-center justify-center gap-2">
            {paymentStatus === "pending" && (
              <Loader2 className="w-3 h-3 animate-spin" />
            )}
            Waiting for secure confirmation...
          </p>
        </div>

        {/* IFRAME CONTAINER */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-1">
            <iframe
              title="Register for MILAN 2026 Events"
              id="konfhub-widget"
              className="w-full rounded-xl bg-white"
              height="600"
              width="100%"
              src="https://konfhub.com/widget/milan-events-2026-84fc6d93?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=quick&screen=2&tickets=75151&ticketId=75151%7C1"
              style={{ border: "none", overflow: "hidden" }}
            />
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
          <span className="flex items-center gap-2">
            <Lock className="h-3 w-3" />
            SSL Encrypted
          </span>
          <span className="h-4 w-px bg-neutral-800" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" />
            Trusted Payment
          </span>
        </div>
      </motion.div>
    </main>
  );
}
