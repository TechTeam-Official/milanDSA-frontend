"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Ban,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

type PassType = "events" | "single" | "pro";

interface PassOption {
  id: PassType;
  title: string;
  price: string;
  description: string;
  features: string[];
  restriction: "open" | "srm";
  icon: React.ElementType;
  color: string;
  comingSoon?: boolean;
}

const PASSES: PassOption[] = [
  {
    id: "events",
    title: "Events Pass",
    price: "₹300",
    description: "Access to all technical and non-technical events.",
    features: [
      "One pass. Access to 40+ events",
      "Compete for a prize pool of worth ₹10 lakhs+",
      "Learn, compete & level up",
    ],
    restriction: "open",
    icon: Ticket,
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "pro",
    title: "Pro-Show Pass",
    price: "₹999",
    description: "Exclusive access to the star-studded nights.",
    features: ["Access to all Pro-Shows", "Unforgettable live performances"],
    restriction: "srm",
    icon: Crown,
    color: "from-amber-400 to-orange-400",
    comingSoon: false,
  },
];

export default function Passes() {
  const { user } = useAuth();
  const router = useRouter();
  // Removed unused state vars

  const handleBuyPass = async (pass: PassOption) => {
    // Prevent action if coming soon
    if (pass.comingSoon) return;

    // Determine the target URL based on pass type
    let targetUrl = "";
    if (pass.id === "events") {
      targetUrl = "/checkout/events";
    } else if (pass.id === "pro") {
      targetUrl = "/checkout/proshow";
    } else if (pass.id === "single") {
      targetUrl = "/checkout/single-day";
    }

    // 1. Not Logged In -> Redirect to Login with returnUrl = Target Checkout Page
    if (!user) {
      localStorage.setItem("redirectAfterLogin", targetUrl);
      router.push(`/login?returnUrl=${targetUrl}`);
      return;
    }

    // 2. Logged In -> Check Eligibility & Redirect Directly
    const isSrmEmail = user.email?.endsWith("@srmist.edu.in");

    // Events Pass: Open to all
    if (pass.id === "events") {
      router.push(targetUrl);
      return;
    }

    // Pro / Single: SRM Only
    if (isSrmEmail) {
      router.push(targetUrl);
    } else {
      // If logged in but ineligible (e.g. non-SRM email trying to buy Pro),
      // they shouldn't have been able to click this if the UI hid it,
      // but if they did (or logic flow brought them here), stay/do nothing.
      return;
    }
  };

  const filteredPasses = PASSES;

  return (
    <main className="relative min-h-screen bg-[#14172B] text-white selection:bg-[#E0B65C]/30 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14172B] via-[#1C2140] to-[#14172B]" />

        {/* Subtle Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

        {/* Original Image */}
        <Image
          src="/BackgroundImages/Passes.png"
          alt="Pass Background"
          fill
          className="object-cover opacity-50"
          priority
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_#14172B_80%]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E0B65C]/20 bg-[#E0B65C]/5 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-[#E0B65C] mb-2 shadow-[0_0_15px_rgba(224,182,92,0.1)]">
            <Sparkles
              size={12}
              className="text-[#F2A900]"
            />
            <span>Secure Your Spot</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#E0B65C] via-[#F2A900] to-[#E0B65C] drop-shadow-lg">
            Student Festival Pass
          </h1>
          <p className="text-lg text-[#E0B65C]/60 max-w-2xl mx-auto font-light tracking-wide">
            Unlock the Festival Experience
          </p>
        </motion.div>

        {/* Pass Grid */}
        <div
          className={`grid gap-8 w-full ${
            filteredPasses.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : "grid-cols-1 md:grid-cols-2 max-w-5xl"
          }`}>
          {filteredPasses.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col">
              {/* Premium Card Container */}
              <div className="relative flex flex-col h-full bg-[#1C2140]/40 backdrop-blur-xl border border-[#E0B65C]/20 rounded-3xl p-8 hover:bg-[#1C2140]/60 hover:border-[#E0B65C]/40 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(224,182,92,0.05)]">
                {/* Soft Inner Gradient Highlight (Top) */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none rounded-t-3xl" />

                {/* Header */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#E0B65C]/10 border border-[#E0B65C]/20 p-4 flex items-center justify-center group-hover:bg-[#E0B65C]/20 transition-colors duration-500">
                      <pass.icon className="w-full h-full text-[#E0B65C] group-hover:text-[#F2A900] transition-colors duration-500" />
                    </div>
                    <h3 className="text-3xl font-serif text-white leading-none tracking-tight">
                      {pass.title}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span
                      className={`${pass.comingSoon ? "text-2xl" : "text-4xl"} font-medium text-white tracking-tight`}>
                      {pass.comingSoon ? "Coming Soon" : pass.price}
                    </span>
                    {!pass.comingSoon && (
                      <span className="text-[#E0B65C]/60 font-medium text-sm uppercase tracking-wider ml-1">
                        / person
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider (Gold) */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E0B65C]/30 to-transparent mb-6" />

                {/* Features */}
                <ul className="space-y-4 mb-8 grow relative z-10">
                  {pass.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#E0B65C] shadow-[0_0_8px_#E0B65C]" />
                      <span className="text-sm font-light text-neutral-200 group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Restriction Badge */}
                <div className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E0B65C] bg-[#E0B65C]/5 p-3 rounded-xl border border-[#E0B65C]/10">
                  {pass.restriction === "srm" ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>SRMIST Students Only</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Open to All</span>
                    </>
                  )}
                </div>

                {/* Action Button */}
                {(() => {
                  const isSrmPass = pass.restriction === "srm";
                  const isSrmEmail = user?.email?.endsWith("@srmist.edu.in");
                  const isEligible = !isSrmPass || (user && isSrmEmail);

                  let buttonText = user ? "Purchase Pass" : "Login to Buy";
                  if (pass.id === "events")
                    buttonText = user ? "Register Now" : "Login to Register";

                  // Override for blocked state
                  if (user && !isEligible) {
                    buttonText = "SRM Verified Only";
                  }

                  if (pass.comingSoon) {
                    buttonText = "Coming Soon...";
                  }

                  return (
                    <div className="space-y-2 relative z-10">
                      <Button
                        onClick={() => handleBuyPass(pass)}
                        disabled={(!!user && !isEligible) || !!pass.comingSoon}
                        className={`w-full font-bold py-6 rounded-xl group/btn transform transition-all duration-300 ${
                          user && !isEligible
                            ? "bg-[#14172B] text-neutral-500 cursor-not-allowed border border-white/5"
                            : pass.comingSoon
                              ? "bg-[#14172B]/60 text-neutral-400 cursor-not-allowed border border-dashed border-white/20"
                              : "bg-white text-[#14172B] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-neutral-200 hover:border-white border border-white"
                        }`}>
                        <span className="flex items-center justify-center gap-2 font-bold tracking-wide">
                          <>
                            {buttonText}
                            {pass.comingSoon || (user && !isEligible) ? (
                              <Ban className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            )}
                          </>
                        </span>
                      </Button>

                      {/* Ineligibility Warning */}
                      {user && !isEligible && !pass.comingSoon && (
                        <p className="text-center text-[10px] text-red-400/80 font-medium tracking-wide uppercase mt-2">
                          Requires @srmist.edu.in email address
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Error/Success Feedback Modal/Overlay - Using specific state feedback directly on screen or simplified toast */}
        <AnimatePresence>
          {/* Removed legacy state-based toasts */}
        </AnimatePresence>
      </div>
    </main>
  );
}
