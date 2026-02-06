"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";

export default function PaymentGatewayPage() {
  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl relative">

        {/* HEADER */}
        <div className="mb-4 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-100 to-white/60">
            Complete Payment
          </h1>
          <p className="text-sm text-white/40">
            Securely complete your payment to join Milan &apos;26
          </p>
        </div>

        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-1">
            <iframe
              title="Register for MILAN 2026 Events"
              id="konfhub-widget"
              className="w-full rounded-xl"
              height="700"
              scrolling="no"
              src="https://konfhub.com/widget/milan-events-2026?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=quick&screen=2&tickets=74449&ticketId=74449%7C1"
              style={{ border: "none", backgroundColor: "#FFFFFF", overflow: "hidden" }}
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
