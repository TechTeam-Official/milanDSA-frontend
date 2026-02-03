'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Globe, Smartphone, ChevronRight, Lock, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PaymentGatewayPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Mock payment processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push('/payment-successful')
  }

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-4xl">
        
        {/* Header / Progress */}
        <header className="mb-12 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-sm font-medium tracking-widest uppercase text-white/50">
            <span className="text-cyan-400">Step 2</span>
            <span>/</span>
            <span>3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white/60">
            Secure Payment
          </h1>
          
          {/* Progress Bar */}
          <div className="w-full max-w-sm h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
            <motion.div 
              initial={{ width: "33%" }}
              animate={{ width: "66%" }}
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            />
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Order Summary - Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-8 overflow-hidden relative group hover:border-white/20 transition-colors">
               {/* Decorative Glow */}
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />
               <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                      <div>
                          <h3 className="text-sm font-medium text-white/50 tracking-widest uppercase mb-2">Order Summary</h3>
                          <h2 className="text-3xl font-bold text-white">Milan &apos;26</h2>
                          <p className="text-cyan-400 font-medium">All Access Pass</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                  </div>

                  <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-white/80 p-3 rounded-xl bg-white/5 border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                          <span className="text-sm">Access to all technical & non-tech events</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80 p-3 rounded-xl bg-white/5 border border-white/5">
                         <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                         <span className="text-sm">Priority Entry for Pro-Shows</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80 p-3 rounded-xl bg-white/5 border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
                          <span className="text-sm">Official Milan &apos;26 Merchandise Kit</span>
                      </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-white/60">Subtotal</span>
                          <span className="text-white font-medium">₹499.00</span>
                      </div>
                       <div className="flex justify-between items-center mb-6">
                          <span className="text-white/60">Tax & Fees</span>
                          <span className="text-white font-medium">₹0.00</span>
                      </div>
                      <div className="flex justify-between items-end p-4 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 rounded-2xl border border-white/10">
                          <div>
                              <span className="text-xs uppercase tracking-wider text-white/50 font-bold block mb-1">Total to Pay</span>
                              <span className="text-3xl font-bold text-white tracking-tight">₹499</span>
                          </div>
                           <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-[10px] font-bold text-green-400 uppercase tracking-wide">
                              Best Value
                           </div>
                      </div>
                  </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Details - Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full space-y-8"
          >
            <div>
                 <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">2</span>
                    Select Payment Method
                 </h2>
                 
                 <div className="space-y-4">
                    {([
                      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Secure transfer via customized gateway' },
                      { id: 'upi', icon: Smartphone, label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm, etc.' },
                      { id: 'netbanking', icon: Globe, label: 'Net Banking', desc: 'All major indian banks supported' }
                    ] as const).map((method) => (
                       <div 
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`relative group cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                            selectedMethod === method.id 
                            ? 'bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                        }`}
                       >
                           <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                    selectedMethod === method.id ? 'bg-cyan-500 text-black' : 'bg-black/40 text-white/70'
                                }`}>
                                    <method.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold text-lg transition-colors ${selectedMethod === method.id ? 'text-white' : 'text-white/80'}`}>
                                        {method.label}
                                    </h4>
                                    <p className="text-sm text-white/40">{method.desc}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                    selectedMethod === method.id ? 'border-cyan-500' : 'border-white/20 group-hover:border-white/40'
                                }`}>
                                    {selectedMethod === method.id && (
                                        <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                    )}
                                </div>
                           </div>
                       </div>
                    ))}
                 </div>
            </div>

            <div className="pt-4 border-t border-white/10">
                 <Button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-16 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden group"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-3">
                         <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         Processing Payment...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Pay <span className="text-cyan-100">₹499.00</span> Securely
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-white/30 mt-4 flex items-center justify-center gap-2">
                      <Lock className="w-3 h-3" />
                      Encrypted and Secured by Razorpay
                  </p>
            </div>

          </motion.div>
        
        </div>
      </div>
    </main>
  )
}
