import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

interface FooterProps {
  variant?: "default" | "events" | "sponsors" | "passes" | "gallery";
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
    },
  };

  const theme = themes[variant];

  return (
    <footer className={`relative ${theme.bg} text-white pt-10 pb-6 border-t ${theme.border} transition-colors duration-300`}>
      <div className="indian-noise" />

      {/* Dynamic Divider */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${theme.divider} opacity-40`} />

      {/* Subtle Accent Dot */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-50 ${theme.accentBg} ${theme.accent} shadow-[0_0_8px_currentColor]`} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="inline-block group">
              <span className={`text-3xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${theme.brandGradient}`}>
                MILAN &apos;26
              </span>
            </Link>
            <p className="text-lg font-light text-neutral-300 leading-relaxed max-w-sm">
              #Live the Change
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://www.youtube.com/@DSAEVENTS" icon={<Youtube size={18} />} theme={theme} />
              <SocialLink href="https://www.instagram.com/srmist_dsa" icon={<Instagram size={18} />} theme={theme} />
              <SocialLink href="https://www.instagram.com/srmist_milan" icon={<Instagram size={18} />} theme={theme} />
              <SocialLink href="https://www.facebook.com/SRMUniversityOfficial" icon={<Facebook size={18} />} theme={theme} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <FooterLink href="/events" theme={theme}>Events</FooterLink>
              <FooterLink href="/sponsors" theme={theme}>Sponsors</FooterLink>
              <FooterLink href="/gallery" theme={theme}>Gallery</FooterLink>
              <FooterLink href="/team" theme={theme}>Team</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <FooterLink href="#" theme={theme}>Privacy Policy</FooterLink>
              <FooterLink href="#" theme={theme}>Terms of Service</FooterLink>
              <FooterLink href="#" theme={theme}>Code of Conduct</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
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
        <div className="pt-6 border-t border-white/5 flex flex-col items-center justify-center gap-2 text-neutral-500 text-xs text-center">
          <p>© Copyright Directorate of Student Affairs, SRMIST. All rights reserved.</p>
          <p className="font-medium text-neutral-400">Developed By DSA Tech and Graphic Design Team.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, theme }: { href: string; icon: React.ReactNode; theme: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white ${theme.iconHover} transition-all duration-300 shadow-[0_0_0_transparent]`}
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children, theme }: { href: string; children: React.ReactNode; theme: any }) {
  const hoverClass = theme.linkHover || `hover:${theme.accent}`;
  return (
    <li>
      <Link href={href} className={`${hoverClass} transition-colors duration-300`}>
        {children}
      </Link>
    </li>
  )
}
