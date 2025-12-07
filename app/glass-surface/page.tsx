'use client'

import React from 'react'
import GlassSurface from '@/components/GlassSurface'

export default function GlassSurfaceShowcase() {
  // Generate random pattern positions
  const generatePatterns = () => {
    const patterns = []
    for (let i = 0; i < 100; i++) {
      patterns.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 200 + 50,
        rotation: Math.random() * 360,
        color: `hsl(${Math.random() * 360}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 20}%)`,
        shape: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
      })
    }
    return patterns
  }

  const patterns = generatePatterns()

  return (
    <div className="relative min-h-screen overflow-y-auto bg-black">
      {/* Scrollable background with random patterns */}
      <div className="relative">
        {/* Multiple layers of patterns for depth */}
        {patterns.map((pattern, index) => (
          <div
            key={pattern.id}
            className="absolute"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y * 3}vh`, // Multiply by 3 to extend beyond viewport
              transform: `rotate(${pattern.rotation}deg)`,
              zIndex: index % 3,
            }}
          >
            {pattern.shape === 0 && (
              <div
                className="rounded-full opacity-20 animate-pulse"
                style={{
                  width: `${pattern.size}px`,
                  height: `${pattern.size}px`,
                  backgroundColor: pattern.color,
                  filter: 'blur(1px)',
                }}
              />
            )}
            {pattern.shape === 1 && (
              <div
                className="opacity-15 animate-pulse"
                style={{
                  width: `${pattern.size}px`,
                  height: `${pattern.size}px`,
                  backgroundColor: pattern.color,
                  filter: 'blur(1px)',
                }}
              />
            )}
            {pattern.shape === 2 && (
              <div
                className="opacity-20 animate-pulse"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${pattern.size / 2}px solid transparent`,
                  borderRight: `${pattern.size / 2}px solid transparent`,
                  borderBottom: `${pattern.size}px solid ${pattern.color}`,
                  filter: 'blur(1px)',
                }}
              />
            )}
          </div>
        ))}

        {/* Additional gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/20 via-transparent to-yellow-900/20"></div>

        {/* Content sections to make page scrollable */}
        <div className="relative z-10">
          {/* Top spacer */}
          <div className="h-screen"></div>

          {/* Content section 1 */}
          <div className="h-screen flex items-center justify-center">
            <div className="text-center space-y-4 text-white/50">
              <h2 className="text-4xl font-bold">Scroll to see the effect</h2>
              <p className="text-xl">The glass capsule remains fixed while patterns move</p>
            </div>
          </div>

          {/* Content section 2 */}
          <div className="h-screen flex items-center justify-center">
            <div className="text-center space-y-4 text-white/50">
              <h2 className="text-3xl font-bold">Different patterns emerge</h2>
              <p className="text-lg">Each scroll reveals new visual layers</p>
            </div>
          </div>

          {/* Content section 3 */}
          <div className="h-screen flex items-center justify-center">
            <div className="text-center space-y-4 text-white/50">
              <h2 className="text-2xl font-bold">Glassmorphism in action</h2>
              <p className="text-base">Advanced blur and transparency effects</p>
            </div>
          </div>

          {/* Bottom spacer */}
          <div className="h-screen"></div>
        </div>
      </div>

      {/* Fixed Glass Surface Capsule in center */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
        <GlassSurface
          width={500}
          height={300}
          borderRadius={150}
          opacity={0.95}
          blur={15}
          brightness={40}
          distortionScale={-200}
          redOffset={10}
          greenOffset={20}
          blueOffset={30}
          className="pointer-events-auto hover:scale-105 transition-transform duration-500"
        >
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 p-8">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Glass Surface
            </h1>
            <p className="text-lg text-gray-200 max-w-sm">
              Advanced glassmorphism effect with dynamic background patterns.
              Scroll to see how the glass surface interacts with changing visuals.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Hardware-accelerated SVG filters</p>
              <p>• Color channel distortion</p>
              <p>• Real-time background interaction</p>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  )
}
