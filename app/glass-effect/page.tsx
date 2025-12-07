'use client';

import React, { useState } from 'react';
import GlassSurface from '@/components/GlassSurface';
import { Button } from '@/components/ui/button';

export default function GlassEffectPage() {
  const [selectedPreset, setSelectedPreset] = useState('classic');
  const [interactiveMode, setInteractiveMode] = useState(false);

  const presets = {
    classic: {
      opacity: 0.93,
      blur: 11,
      brightness: 50,
      borderRadius: 20,
      borderWidth: 0.07,
      distortionScale: -180,
      mixBlendMode: 'difference' as const
    },
    subtle: {
      opacity: 0.85,
      blur: 8,
      brightness: 60,
      borderRadius: 15,
      borderWidth: 0.05,
      distortionScale: -120,
      mixBlendMode: 'overlay' as const
    },
    intense: {
      opacity: 0.98,
      blur: 15,
      brightness: 40,
      borderRadius: 30,
      borderWidth: 0.1,
      distortionScale: -250,
      mixBlendMode: 'screen' as const
    },
    minimal: {
      opacity: 0.75,
      blur: 5,
      brightness: 70,
      borderRadius: 10,
      borderWidth: 0.03,
      distortionScale: -80,
      mixBlendMode: 'normal' as const
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Glass Surface Effect Showcase
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the power of advanced glass morphism with dynamic distortion effects
          </p>
        </div>

        {/* Preset Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(presets).map((preset) => (
            <Button
              key={preset}
              onClick={() => setSelectedPreset(preset)}
              variant={selectedPreset === preset ? "default" : "outline"}
              className={`capitalize ${
                selectedPreset === preset
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'border-purple-500 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              {preset}
            </Button>
          ))}
          <Button
            onClick={() => setInteractiveMode(!interactiveMode)}
            variant={interactiveMode ? "default" : "outline"}
            className={`${
              interactiveMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'border-blue-500 text-blue-300 hover:bg-blue-500/20'
            }`}
          >
            {interactiveMode ? 'Exit Interactive' : 'Interactive Mode'}
          </Button>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Event Card */}
          <GlassSurface
            width="100%"
            height={280}
            className="hover:scale-105 transition-transform duration-300"
            {...presets[selectedPreset as keyof typeof presets]}
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Milan Festival</h3>
              <p className="text-gray-300 text-sm mb-4">Experience the ultimate celebration</p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                Get Tickets
              </Button>
            </div>
          </GlassSurface>

          {/* Artist Showcase */}
          <GlassSurface
            width="100%"
            height={280}
            className="hover:scale-105 transition-transform duration-300"
            {...presets[selectedPreset as keyof typeof presets]}
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thaman Live</h3>
              <p className="text-gray-300 text-sm mb-4">Feel the rhythm, live the music</p>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                Book Now
              </Button>
            </div>
          </GlassSurface>

          {/* Pro Show */}
          <GlassSurface
            width="100%"
            height={280}
            className="hover:scale-105 transition-transform duration-300"
            {...presets[selectedPreset as keyof typeof presets]}
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎪</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Triple Threat</h3>
              <p className="text-gray-300 text-sm mb-4">Unforgettable performances</p>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                Reserve Seats
              </Button>
            </div>
          </GlassSurface>
        </div>

        {/* Large Feature Card */}
        <div className="mb-12">
          <GlassSurface
            width="100%"
            height={400}
            className="hover:scale-[1.02] transition-transform duration-500"
            {...presets[selectedPreset as keyof typeof presets]}
          >
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to Milan</h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Where creativity meets celebration. Join us for an unforgettable experience
                filled with music, art, and extraordinary performances that will leave you
                breathless.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3">
                  Explore Events
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3">
                  View Gallery
                </Button>
              </div>
            </div>
          </GlassSurface>
        </div>

        {/* Interactive Controls (shown when interactiveMode is true) */}
        {interactiveMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassSurface
              width="100%"
              height={300}
              opacity={0.9}
              blur={12}
              brightness={55}
              borderRadius={25}
              className="p-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Interactive Demo</h3>
                <p className="text-gray-300 mb-4">
                  Move your mouse around this surface to see the dynamic glass distortion effect.
                  The effect responds to your cursor position with real-time color channel manipulation.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>• Hover to see distortion</p>
                  <p>• Different blend modes</p>
                  <p>• Customizable parameters</p>
                </div>
              </div>
            </GlassSurface>

            <GlassSurface
              width="100%"
              height={300}
              opacity={0.95}
              blur={8}
              brightness={45}
              borderRadius={20}
              mixBlendMode="screen"
              className="p-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Technical Details</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div>
                    <span className="text-purple-400 font-medium">Current Preset:</span>
                    <span className="ml-2 capitalize">{selectedPreset}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Blend Mode:</span>
                    <span className="ml-2">{presets[selectedPreset as keyof typeof presets].mixBlendMode}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-medium">Opacity:</span>
                    <span className="ml-2">{presets[selectedPreset as keyof typeof presets].opacity}</span>
                  </div>
                  <div>
                    <span className="text-orange-400 font-medium">Blur:</span>
                    <span className="ml-2">{presets[selectedPreset as keyof typeof presets].blur}px</span>
                  </div>
                </div>
              </div>
            </GlassSurface>
          </div>
        )}
      </div>
    </div>
  );
}
