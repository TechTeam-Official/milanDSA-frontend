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
}

const PASSES: PassOption[] = [
  {
    id: "events",
    title: "Events Pass",
    price: "₹299",
    description: "Access to all technical and non-technical events.",
    features: [
      "One pass. Access to 40+ events",
      "Compete for a cash prize worth ₹10+ lakhs",
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
    features: [
      "Access to all Pro-Shows",
      "Exclusive meet & greet opportunities",
      "Unforgettable live performances",
    ],
    restriction: "srm",
    icon: Crown,
    color: "from-amber-400 to-orange-400",
  },
];

export default function Passes() {
  const { user } = useAuth();
  const router = useRouter();
  // Removed unused state vars

  const handleBuyPass = async (pass: PassOption) => {
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

  const filteredPasses = PASSES.filter((pass) => {
    // If not logged in, show all
    if (!user) return true;

    // If logged in:
    // 1. Show 'pro' ONLY if email is srmist.edu.in
    if (pass.id === "pro") {
      return user.email?.endsWith("@srmist.edu.in");
    }

    // 2. Show other passes (e.g., 'events') for everyone
    return true;
  });

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/BackgroundImages/Passes.png"
          alt="Pass Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-purple-200 mb-2">
            <Sparkles
              size={14}
              className="text-yellow-400"
            />
            <span>Secure Your Spot</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-neutral-200 to-neutral-500">
            Student Festival Pass
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Unlock the Festival Experience
          </p>
        </motion.div>

        {/* Pass Grid */}
        <div
          className={`grid gap-8 w-full ${filteredPasses.length === 1
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
              {/* Card Glow Effect */}
              <div
                className={`absolute -inset-0.5 bg-linear-to-b ${pass.color} opacity-0 group-hover:opacity-20 transition duration-500 blur-xl rounded-3xl`}
              />

              <div className="relative flex flex-col h-full bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-linear-to-br ${pass.color} p-3 shadow-lg shadow-purple-900/20 shrink-0`}>
                      <pass.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-none">
                      {pass.title}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {pass.price}
                    </span>
                    <span className="text-neutral-500 font-medium">
                      /person
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/5 mb-4" />

                {/* Features */}
                <ul className="space-y-3 mb-6 grow">
                  {pass.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-neutral-300">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 shrink-0 bg-linear-to-r ${pass.color}`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Restriction Badge */}
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-950/50 p-3 rounded-xl border border-white/5">
                  {pass.restriction === "srm" ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>SRM Students Only</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      <span>Open to All</span>
                    </>
                  )}
                </div>

                {/* Action Button */}
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

                  return (
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleBuyPass(pass)}
                        disabled={!!user && !isEligible}
                        className={`w-full font-bold py-4 rounded-xl group/btn overflow-hidden relative ${user && !isEligible
                            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5"
                            : "bg-white text-black hover:bg-neutral-200"
                          }`}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <>
                            {buttonText}
                            {(user && isEligible) || !user ? (
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            ) : (
                              <Ban className="w-4 h-4" />
                            )}
                          </>
                        </span>
                        {/* Hover Gradient only if active */}
                        {(!user || isEligible) && (
                          <div
                            className={`absolute inset-0 bg-linear-to-r ${pass.color} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`}
                          />
                        )}
                      </Button>

                      {/* Ineligibility Warning */}
                      {user && !isEligible && (
                        <p className="text-center text-xs text-red-400/80 font-medium">
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
