'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlassConfig {
  opacity: number
  blur: number
  brightness: number
  borderRadius: number
  saturation?: number
  distortionScale?: number
  mixBlendMode: React.CSSProperties['mixBlendMode']
}

interface MilanGlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pass' | 'card' | 'hero' | 'interactive'
  festivalAccent?: boolean
  opacity?: number
  blur?: number
  brightness?: number
  saturation?: number
  borderRadius?: number
  distortionScale?: number
}

const variantConfigs: Record<string, GlassConfig> = {
  default: {
    opacity: 0.93,
    blur: 11,
    brightness: 50,
    borderRadius: 20,
    mixBlendMode: 'difference',
  },
  pass: {
    opacity: 0.95,
    blur: 12,
    brightness: 60,
    borderRadius: 24,
    saturation: 1.2,
    mixBlendMode: 'screen',
  },
  card: {
    opacity: 0.9,
    blur: 10,
    brightness: 55,
    borderRadius: 16,
    mixBlendMode: 'normal',
  },
  hero: {
    opacity: 0.97,
    blur: 15,
    brightness: 45,
    borderRadius: 30,
    distortionScale: -180,
    mixBlendMode: 'screen',
  },
  interactive: {
    opacity: 0.92,
    blur: 9,
    brightness: 52,
    borderRadius: 18,
    mixBlendMode: 'overlay',
  },
}

export const MilanGlassSurface: React.FC<MilanGlassSurfaceProps> = ({
  variant = 'default',
  festivalAccent = false,
  className = '',
  children,
  style,
  ...props
}) => {
  const config = variantConfigs[variant] || variantConfigs.default

  const minimalStyle: React.CSSProperties = {
    ...style,
    backdropFilter: `blur(${config.blur}px) brightness(${config.brightness}%) ${config.saturation ? `saturate(${config.saturation})` : ''}`,
    backgroundColor: `rgba(255, 255, 255, ${1 - config.opacity})`, // Approximate inverse opacity for background
    borderRadius: config.borderRadius,
    mixBlendMode: config.mixBlendMode as any,
    background: festivalAccent
      ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(219, 39, 119, 0.1))'
      : undefined,
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={minimalStyle}
      {...props}
    >
      {children}
    </div>
  )
}

export default MilanGlassSurface
