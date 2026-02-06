import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-[#0B0B0F] text-white pt-10 pb-6 border-t border-[#C9A24D]/20">
      <div className="indian-noise" />
      <div className="indian-gold-divider absolute top-0 left-0 right-0" />

      {/* Glow removed for seamless transition */}

      {/* Subtle Accent Dot */}
      <div className="im-accent-dot top-0 left-1/2 -translate-x-1/2 opacity-50 bg-[#C9A24D]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24D] to-[#D97706]">
                MILAN &apos;26
              </span>
            </Link>
            <p className="text-lg font-light text-neutral-300 leading-relaxed max-w-sm">
              #Live the Change
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://www.youtube.com/@DSAEVENTS" icon={<Youtube size={18} />} />
              <SocialLink href="https://www.instagram.com/srmist_dsa" icon={<Instagram size={18} />} />
              <SocialLink href="https://www.instagram.com/srmist_milan" icon={<Instagram size={18} />} />
              <SocialLink href="https://www.facebook.com/SRMUniversityOfficial" icon={<Facebook size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/sponsors">Sponsors</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/team">Team</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Code of Conduct</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#C9A24D] shrink-0 mt-0.5" size={16} />
                <span>
                  SRM Institute of Science and Technology, <br />
                  Kattankulathur, Chennai, <br />
                  Tamil Nadu - 603203
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#C9A24D] shrink-0" size={16} />
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
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C9A24D]/20 hover:border-[#C9A24D]/50 transition-all duration-300 shadow-[0_0_0_transparent] hover:shadow-[0_0_15px_rgba(201,162,77,0.3)]"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-[#C9A24D] transition-colors">
        {children}
      </Link>
    </li>
  )
}
