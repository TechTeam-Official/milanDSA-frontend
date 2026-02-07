// components/navbar.tsx
'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
// ADDED: Pass import
import { Home, Image as ImageIcon, Users, Calendar, Menu, Handshake, Compass, Ticket as PassIcon, LogIn, LogOut } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useModal } from '@/context/ui-context'

interface NavItem {
  label: string
  id: string
  path: string
  icon: React.ElementType
}

export const PillBase = () => {
  const router = useRouter()
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  /* New Hook to control visibility when modals open */
  const { isModalOpen } = useModal()

  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!expanded) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expanded])

  // FIX: Reordered items and added Passes
  const navItems: NavItem[] = useMemo(() => [
    { label: 'Home', id: 'home', path: '/', icon: Home },
    { label: 'Events', id: 'events', path: '/events', icon: Calendar },
    { label: 'Sponsors', id: 'sponsors', path: '/sponsors', icon: Handshake },
    { label: 'Passes', id: 'passes', path: '/passes', icon: PassIcon },
    { label: 'Explore', id: 'explore', path: '/explore', icon: Compass },
    { label: 'Gallery', id: 'gallery', path: '/gallery', icon: ImageIcon },
    { label: 'Team', id: 'team', path: '/team', icon: Users },
  ], [])

  const activeItem = navItems.find((i) => i.path === pathname) || navItems[0]

  const handleNavigate = (path: string) => {
    setExpanded(false)
    router.push(path)
  }

  const width = useSpring(160, { stiffness: 300, damping: 30 })
  const height = useSpring(56, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (expanded) {
      // Adjusted width to fit the extra items
      width.set(isMobile ? 260 : 850)
      // Calculate height: base nav items + auth section if mobile
      const authHeight = isMobile ? (user ? 100 : 60) : 0
      height.set(isMobile ? navItems.length * 50 + 24 + authHeight : 56)
    } else {
      width.set(160)
      height.set(56)
    }
  }, [expanded, isMobile, navItems.length, width, height, user])

  if (pathname?.startsWith('/operator') || isModalOpen) return null

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      {/* Centered Nav Pill */}
      <motion.nav
        ref={containerRef}
        style={{ width, height }}
        className={`pointer-events-auto relative flex flex-col items-center justify-center overflow-hidden border border-[#C9A24D]/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-[linear-gradient(to_right,rgba(20,10,25,0.85),rgba(10,15,20,0.85))] z-50 transition-all duration-300 ease-out ${isMobile && expanded ? 'rounded-3xl' : 'rounded-full'}`}
        onClick={() => {
          if (isMobile) setExpanded(!expanded)
        }}
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
      >
        <div className={`relative z-10 w-full h-full flex ${isMobile && expanded ? 'flex-col justify-center py-4' : 'items-center justify-center'}`}>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <activeItem.icon size={18} className="text-[#F6F2EA]/80" />
              <span className="text-sm font-semibold tracking-wide text-[#F6F2EA]">
                {activeItem.label}
              </span>
              {isMobile && <Menu size={16} className="text-[#F6F2EA]/50 ml-2" />}
            </motion.div>
          )}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex ${isMobile ? 'flex-col items-center w-full gap-2' : 'flex-row items-center justify-between w-full px-6'}`}
              >
                {navItems.map((item) => {
                  const isActive = pathname === item.path
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigate(item.path)
                      }}
                      className={`
                        flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all duration-300 relative group
                        ${isMobile ? 'w-[90%] flex-row gap-3 justify-start' : ''}
                        ${isActive
                          ? 'bg-[#C9A24D]/15 text-[#F6F2EA]'
                          : 'text-[#F6F2EA]/70 hover:text-[#F6F2EA] hover:bg-[#C9A24D]/10'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon size={18} className={isActive ? "text-[#C9A24D]" : "opacity-80"} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>


                    </button>
                  )
                })}

                {/* Mobile Auth Section */}
                {isMobile && (
                  <div className="w-[90%] border-t border-white/10 pt-3 mt-2 flex flex-col items-center">
                    {user ? (
                      <div className="flex items-center justify-between w-full px-1">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-sm shrink-0">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-white truncate">
                            {user.name?.split('(')[0]}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setExpanded(false)
                            logout()
                          }}
                          className="p-2 ml-2 rounded-full text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors shrink-0"
                          title="Logout"
                        >
                          <LogOut size={20} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavigate('/login')}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-full w-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <LogIn size={18} />
                        <span className="text-sm font-medium">Login</span>
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Login / Profile Button - Absolute Right (Hidden on mobile if overlapping, or adapted) */}
      {!isMobile && (
        <div className="absolute right-6 top-0 h-[56px] flex items-center pointer-events-auto z-50">
          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 30, 30, 0.9)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121212]/90 border border-[#C9A24D]/30 hover:border-[#C9A24D]/60 transition-all text-[#F6F2EA] shadow-lg backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#8C6A3D] flex items-center justify-center text-xs font-bold text-black border border-[#F6F2EA]/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium pr-1">{user.name.split('(')[0].trim()}</span>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-[#121212] border border-[#C9A24D]/20 rounded-xl backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden p-1 z-[60]"
                  >
                    <div className="px-3 py-2 border-b border-[#C9A24D]/10 mb-1">
                      <p className="text-xs text-[#C9A24D]/70 uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-medium text-[#F6F2EA] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        logout()
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#F6F2EA]/80 hover:bg-red-500/10 hover:text-red-200 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : pathname !== '/login' ? (
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(201, 162, 77, 0.2)",
                background: "linear-gradient(135deg, #1A1A1A, #2A2312)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#121212] text-[#F6F2EA] font-medium text-sm shadow-lg border border-[#C9A24D]/35 transition-all"
            >
              <LogIn size={16} className="text-[#C9A24D]" />
              <span className="tracking-wide">Login</span>
            </motion.button>
          ) : null}
        </div>
      )}
    </div>
  )
}
