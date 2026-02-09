"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { Loader2, ShieldAlert, CheckCircle, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProShowCheckoutPage() {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">("pending");

    // Derived Access State
    const accessDenied = user && !user.email.endsWith('@srmist.edu.in');

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            localStorage.setItem('redirectAfterLogin', '/checkout/proshow');
            router.push('/login?returnUrl=/checkout/proshow');
            return;
        }
    }, [user, isLoading, router]);

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
                        router.push("/dashboard");
                    }, 3000);
                }
            } catch (error) {
                console.error("Polling error (ignoring...)", error);
            }
        };

        const intervalId = setInterval(checkPaymentStatus, 3000);
        return () => clearInterval(intervalId);
    }, [router]);

    if (isLoading || !user) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (accessDenied) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-red-950/30 border border-red-500/20 rounded-3xl p-8 text-center"
                >
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-red-100 mb-2">Access Denied</h1>
                    <p className="text-red-200/70 mb-8">
                        The Pro Show Pass is exclusively reserved for SRM Students.
                        Please login with your institutional email (@srmist.edu.in).
                    </p>
                    <Button onClick={() => router.push('/passes')} className="bg-red-500/10 text-red-200 hover:bg-red-500/20 border-red-500/20 w-full">
                        Return to Passes
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* SUCCESS OVERLAY */}
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

                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-white/60">
                        Checkout: Pro Show Pass
                    </h1>
                    <p className="text-sm text-red-300/80 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Reserved for SRM Students
                    </p>

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
                            src="https://konfhub.com/widget/milan-proshows-2026?desc=true&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Caveat+Brush&borderRadius=20&widget_type=quick&screen=2&tickets=75806&ticketId=75806%7C1"
                            id="konfhub-widget"
                            title="Register for MILAN Proshows 2026"
                            width="100%"
                            height="600"
                            className="w-full rounded-xl bg-white"
                            style={{ border: "none", overflow: "hidden" }}
                        ></iframe>
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
                    <span className="h-4 w-px bg-neutral-800" />
                    <span className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-pulse" />
                        Instant Confirmation
                    </span>
                </div>
            </motion.div>
        </main>
    );
}
