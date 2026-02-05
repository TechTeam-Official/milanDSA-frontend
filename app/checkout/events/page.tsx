"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

export default function PaymentGatewayPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] bg-purple-900/25 blur-[160px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-cyan-900/25 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* HEADER */}
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-100 to-white/60">
              Complete Payment
            </h1>
            <p className="text-sm text-white/40">
              Securely complete your payment to join Milan &apos;26
            </p>
          </div>

          {/* GLASS CARD */}
          <div
            className="
              relative overflow-hidden rounded-3xl
              bg-white/5 backdrop-blur-2xl
              border border-white/10
              shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_120px_-20px_rgba(0,0,0,0.85)]
            ">
            {/* TOP ACCENT LINE */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-60" />

            {/* EDGE MASKS (HIDES IFRAME UI) */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/95 to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/95 to-transparent z-10" />

            {/* INNER PADDING = NATIVE FEEL */}
            <div className="relative p-4 md:p-6">
              <iframe
                title="Register for Milan Events 2026"
                id="konfhub-widget"
                className="w-full border-none rounded-2xl"
                height="720"
                src="https://konfhub.com/widget/milan-events-2026?desc=true&bg=000000&secondaryBg=000000&ticketBg=111111&borderCl=1f2937&fontColor=ffffff&ticketCl=ffffff&btnColor=06b6d4&fontFamily=Inter&borderRadius=12&widget_type=quick&screen=2&tickets=74449&ticketId=74449%7C1"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/40">
            <span className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              SSL Encrypted
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" />
              Trusted Payment
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
