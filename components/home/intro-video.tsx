'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function IntroVideo() {
    const [isVisible, setIsVisible] = useState(true)
    const desktopVideoRef = useRef<HTMLVideoElement>(null)
    const mobileVideoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        // Optional: Check session storage
        // const hasShown = sessionStorage.getItem('milan-intro-shown')
        // if (hasShown) {
        //   setIsVisible(false)
        //   return
        // }

        const handleEnded = () => {
            // sessionStorage.setItem('milan-intro-shown', 'true')
            setIsVisible(false)
        }

        const dVideo = desktopVideoRef.current
        const mVideo = mobileVideoRef.current

        // Determine which device we are on
        const isDesktop = window.matchMedia("(min-width: 768px)").matches

        if (isDesktop && dVideo) {
            dVideo.addEventListener('ended', handleEnded)
            dVideo.play().catch((e) => console.log("Desktop autoplay prevented", e))

            // Pause mobile video if it started autoplaying
            if (mVideo) mVideo.pause()
        } else if (!isDesktop && mVideo) {
            mVideo.addEventListener('ended', handleEnded)
            mVideo.play().catch((e) => console.log("Mobile autoplay prevented", e))

            // Pause desktop video if it started autoplaying
            if (dVideo) dVideo.pause()
        }

        // Handle resize - if user resizes window significantly, we might want to switch?
        // For now, simpler to stick with the initial decision for the duration of the intro (usually <10s)

        return () => {
            if (dVideo) dVideo.removeEventListener('ended', handleEnded)
            if (mVideo) mVideo.removeEventListener('ended', handleEnded)
        }
    }, [])

    // Lock body scroll
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isVisible])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md"
                        aria-label="Skip Intro"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Desktop Video */}
                    <div className="hidden md:block w-full h-full relative">
                        <video
                            ref={desktopVideoRef}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                        // removing autoPlay here relies on useEffect to start it, 
                        // which prevents both from downloading/playing immediately.
                        >
                            <source src="/intro/desktop/intro_video_desktop.webm" type="video/webm" />
                            <source src="/intro/desktop/intro_video_desktop.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Mobile Video */}
                    <div className="block md:hidden w-full h-full relative">
                        <video
                            ref={mobileVideoRef}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                        >
                            <source src="/intro/mobile/milan_intro_vid.webm" type="video/webm" />
                            <source src="/intro/mobile/milan_intro_vid.mp4" type="video/mp4" />
                        </video>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
