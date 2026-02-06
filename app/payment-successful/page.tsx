'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/auth-context'

export default function PaymentSuccessfulPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      // Fallback protection
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-lg w-full bg-neutral-900/60 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl text-center shadow-2xl shadow-green-900/20"
      >
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle2 className="w-12 h-12 text-green-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-neutral-400 mb-10 leading-relaxed">
          Thank you for your purchase. You are now verified as <span className="text-white font-medium">{user.email}</span>.
          <br />Please proceed to complete your event registration.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => router.push('/events')}
            className="h-16 w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02]"
          >
            Explore Events
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
