import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, MapPin, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface FooterTheme {
  bg: string;
  border: string;
  accent: string;
  accentBg: string;
  divider: string;
  brandGradient: string;
  iconHover: string;
  iconColor: string;
  linkHover: string;
  text: string;
  heading: string;
  subtext: string;
  copyright: string;
}

interface FooterProps {
  variant?: "default" | "events" | "sponsors" | "passes" | "gallery" | "team";
}

export function Footer({ variant = "default" }: FooterProps) {
  // Theme Configuration
  const themes = {
    default: {
      bg: "bg-gradient-to-br from-[#13072E] via-[#1F0818] to-[#03201F]",
      border: "border-white/10",
      accent: "text-rose-400",
      accentBg: "bg-rose-400",
      divider: "from-transparent via-purple-500/30 to-transparent",
      brandGradient: "from-indigo-400 via-rose-400 to-teal-400 bg-[length:200%_auto] hover:bg-right transition-all duration-500",
      iconHover: "hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
      iconColor: "text-indigo-200",
      linkHover: "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:via-rose-400 hover:to-teal-400",
      text: "text-neutral-300",
      heading: "text-white",
      subtext: "text-neutral-400",
      copyright: "text-neutral-500",
    },
    events: {
      bg: "bg-[#0B0B0F]",
      border: "border-[#C9A24D]/20",
      accent: "text-[#C9A24D]",
      accentBg: "bg-[#C9A24D]",
      divider: "from-transparent via-[#C9A24D] to-transparent",
      brandGradient: "from-[#C9A24D] to-[#D97706]",
      iconHover: "hover:bg-[#C9A24D]/20 hover:border-[#C9A24D]/50 hover:shadow-[0_0_15px_rgba(201,162,77,0.3)]",
      iconColor: "text-[#C9A24D]",
      linkHover: "hover:text-[#C9A24D]",
      text: "text-neutral-300",
      heading: "text-white",
      subtext: "text-neutral-400",
      copyright: "text-neutral-500",
    },
    sponsors: {
      bg: "bg-[#021C15]",
      border: "border-emerald-500/20",
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500",
      divider: "from-transparent via-emerald-500/40 to-transparent",
      brandGradient: "from-emerald-400 via-yellow-200 to-teal-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500",
      iconHover: "hover:bg-emerald-900/40 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:text-emerald-300",
      iconColor: "text-[#4F7A6E]",
      linkHover: "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-300 hover:to-yellow-200",
      text: "text-neutral-300",
      heading: "text-white",
      subtext: "text-neutral-400",
      copyright: "text-neutral-500",
    },
    passes: {
      bg: "bg-[#14172B]", // Midnight Indigo
      border: "border-[#E0B65C]/20", // Royal Gold, subtle
      accent: "text-[#E0B65C]",
      accentBg: "bg-[#E0B65C]",
      divider: "from-transparent via-[#E0B65C]/30 to-transparent",
      brandGradient: "from-[#E0B65C] via-[#F2A900] to-[#E0B65C] bg-[length:200%_auto] hover:bg-right transition-all duration-500",
      iconHover: "hover:bg-[#E0B65C]/10 hover:border-[#E0B65C]/40 hover:shadow-[0_0_15px_rgba(224,182,92,0.2)] hover:text-[#F2A900]",
      iconColor: "text-[#E0B65C]",
      linkHover: "hover:text-[#F2A900]",
      text: "text-neutral-300",
      heading: "text-white",
      subtext: "text-neutral-400",
      copyright: "text-neutral-500",
    },
    gallery: {
      bg: "bg-[#1A1A1A]", // Warm Charcoal (Matches Gallery Section)
      border: "border-[#8C6A3D]/30", // Dusty Bronze
      accent: "text-[#C9A24D]", // Brushed Gold
      accentBg: "bg-[#C9A24D]",
      divider: "from-transparent via-[#8C6A3D] to-transparent",
      brandGradient: "from-[#C9A24D] to-[#8C6A3D]",
      iconHover: "hover:bg-[#C9A24D]/20 hover:border-[#C9A24D]/50 hover:shadow-[0_0_15px_rgba(201,162,77,0.3)]",
      iconColor: "text-[#8C6A3D]",
      linkHover: "hover:text-[#C9A24D]",
      text: "text-neutral-300",
      heading: "text-white",
      subtext: "text-neutral-400",
      copyright: "text-neutral-500",
    },
    team: {
      bg: "bg-gradient-to-b from-[#EEDFC8] to-[#E6D6BE]", // Seamless Light Gradient
      border: "border-t border-[#1F4D4A]/5 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]", // Soft feather
      accent: "text-[#1F4D4A]",
      accentBg: "bg-[#B89B5E]",
      divider: "from-transparent via-[#1F4D4A]/10 to-transparent",
      brandGradient: "from-[#1F4D4A] via-[#2A1E1A] to-[#1F4D4A] bg-[length:200%_auto] hover:bg-right transition-all duration-500",
      iconHover: "hover:bg-[#B89B5E] hover:text-[#2A1E1A] hover:shadow-[0_0_15px_rgba(184,155,94,0.3)]",
      iconColor: "text-[#1F4D4A]",
      linkHover: "hover:text-[#B89B5E] hover:underline underline-offset-4 decoration-[#B89B5E]",
      text: "text-[#2A1E1A]/80",
      heading: "text-[#2A1E1A]",
      subtext: "text-[#2A1E1A]/70",
      copyright: "text-[#2A1E1A]/50",
    },
  };

  const theme = themes[variant];

  return (
    <footer className={`relative ${theme.bg} text-white pt-6 pb-4 md:pt-10 md:pb-6 border-t ${theme.border} transition-colors duration-300`}>
      <div className="indian-noise" />

      {/* Dynamic Divider */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r ${theme.divider} opacity-40`} />

      {/* Subtle Accent Dot */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-50 ${theme.accentBg} ${theme.accent} shadow-[0_0_8px_currentColor]`} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6 md:gap-8 md:mb-8">
          {/* Brand & Slogan - Always visible, spanning full width on mobile, 4 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-4 space-y-2 md:space-y-3">
            <Link href="/" className="inline-block group">
              <span className={`text-2xl md:text-3xl font-serif tracking-tighter text-transparent bg-clip-text bg-linear-to-r ${theme.brandGradient}`}>
                MILAN &apos;26
              </span>
            </Link>

            <p className={`text-base md:text-lg font-light leading-relaxed max-w-sm ${theme.text}`}>
              #Live the Change
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://www.youtube.com/@DSAEVENTS" icon={<Youtube size={18} />} theme={theme} />
              <SocialLink href="https://www.instagram.com/srmist_dsa" icon={<Instagram size={18} />} theme={theme} />
              <SocialLink href="https://www.instagram.com/srmist_milan" icon={<Instagram size={18} />} theme={theme} />
              <SocialLink href="https://www.facebook.com/SRMUniversityOfficial" icon={<Facebook size={18} />} theme={theme} />
            </div>
          </div>

          {/* Mobile Accordion Sections (< md) */}
          <div className="col-span-1 md:hidden space-y-4">
            {/* Quick Links */}
            <MobileFooterSection title="Quick Links" theme={theme}>
              <ul className={`space-y-2 text-sm ${theme.subtext}`}>
                <FooterLink href="/events" theme={theme}>Events</FooterLink>
                <FooterLink href="/sponsors" theme={theme}>Sponsors</FooterLink>
                <FooterLink href="/gallery" theme={theme}>Gallery</FooterLink>
                <FooterLink href="/team" theme={theme}>Team</FooterLink>
              </ul>
            </MobileFooterSection>

            {/* Legal */}
            <MobileFooterSection title="Legal" theme={theme}>
              <ul className={`space-y-2 text-sm ${theme.subtext}`}>
                <FooterLink href="#" theme={theme}>Privacy Policy</FooterLink>
                <FooterLink href="#" theme={theme}>Terms of Service</FooterLink>
                <FooterLink href="#" theme={theme}>Code of Conduct</FooterLink>
              </ul>
            </MobileFooterSection>

            {/* Contact */}
            <MobileFooterSection title="Contact Us" theme={theme}>
              <ul className={`space-y-2 text-sm ${theme.subtext}`}>
                <li className="flex items-start gap-3">
                  <MapPin className={`${theme.iconColor} shrink-0 mt-0.5`} size={16} />
                  <span>
                    SRM Institute of Science and Technology, <br />
                    Kattankulathur, Chennai, <br />
                    Tamil Nadu - 603203
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className={`${theme.iconColor} shrink-0`} size={16} />
                  <span>techteam.sa@srmist.edu.in</span>
                </li>
              </ul>
            </MobileFooterSection>
          </div>

          {/* Desktop/Tablet Columns (>= md) */}
          {/* Quick Links */}
          <div className="hidden md:block lg:col-span-2 space-y-2 md:space-y-3">
            <h4 className={`text-sm font-semibold uppercase tracking-wider ${theme.heading}`}>Quick Links</h4>
            <ul className={`space-y-2 text-sm ${theme.subtext}`}>
              <FooterLink href="/events" theme={theme}>Events</FooterLink>
              <FooterLink href="/sponsors" theme={theme}>Sponsors</FooterLink>
              <FooterLink href="/gallery" theme={theme}>Gallery</FooterLink>
              <FooterLink href="/team" theme={theme}>Team</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div className="hidden md:block lg:col-span-2 space-y-2 md:space-y-3">
            <h4 className={`text-sm font-semibold uppercase tracking-wider ${theme.heading}`}>Legal</h4>
            <ul className={`space-y-2 text-sm ${theme.subtext}`}>
              <FooterLink href="#" theme={theme}>Privacy Policy</FooterLink>
              <FooterLink href="#" theme={theme}>Terms of Service</FooterLink>
              <FooterLink href="#" theme={theme}>Code of Conduct</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="hidden md:block lg:col-span-4 space-y-2 md:space-y-3">
            <h4 className={`text-sm uppercase tracking-wider ${theme.heading}`}>Contact Us</h4>
            <ul className={`space-y-2 md:space-y-3 text-sm ${theme.subtext}`}>
              <li className="flex items-start gap-3">
                <MapPin className={`${theme.iconColor} shrink-0 mt-0.5`} size={16} />
                <span>
                  SRM Institute of Science and Technology, <br />
                  Kattankulathur, Chennai, <br />
                  Tamil Nadu - 603203
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className={`${theme.iconColor} shrink-0`} size={16} />
                <span>techteam.sa@srmist.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-4 md:pt-6 border-t ${variant === 'team' ? 'border-[#1F4D4A]/5' : 'border-white/5'} flex flex-col items-center justify-center gap-2 text-xs text-center ${theme.copyright}`}>
          <p>© Copyright Directorate of Student Affairs, SRMIST. All rights reserved.</p>
          <p className="font-medium opacity-80">Developed By DSA Tech and Graphic Design Team.</p>
        </div>
      </div >
    </footer >
  );
}

function MobileFooterSection({ title, children, theme }: { title: string; children: React.ReactNode; theme: FooterTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b ${theme.border} last:border-0`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-2 text-left ${theme.heading} font-medium text-sm uppercase tracking-wider focus:outline-none`}
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${theme.iconColor}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3 pt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialLink({ href, icon, theme }: { href: string; icon: React.ReactNode; theme: FooterTheme }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full ${theme.bg === 'bg-[#14172B]' ? 'bg-white/5' : 'bg-black/5'} border ${theme.border} flex items-center justify-center ${theme.subtext} hover:text-white ${theme.iconHover} transition-all duration-300 shadow-[0_0_0_transparent]`}
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children, theme }: { href: string; children: React.ReactNode; theme: FooterTheme }) {
  const hoverClass = theme.linkHover || `hover:${theme.accent}`;
  return (
    <li>
      <Link href={href} className={`${hoverClass} transition-colors duration-300`}>
        {children}
      </Link>
    </li>
  )
}
