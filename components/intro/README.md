# Intro System – Milan Website

This folder contains the cinematic intro logic.

Files:
- intro_section.tsx → visual overlay (video, fade, skip)
- intro_fallback.tsx → detection + skip logic

Rules:
- Never block rendering
- Never show loaders
- Skip silently if anything feels slow
- Play once per session
