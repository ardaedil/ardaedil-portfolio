# VARLens AI

VARLens AI is an educational soccer clip analysis MVP. It accepts a short uploaded clip, estimates the likely foul sanction and action type, and explains what a referee-style review would inspect while communicating uncertainty.

## What I built
- A Next.js analysis interface connected to a FastAPI service.
- Shared JSON, TypeScript, and Python contracts across the web and API layers.
- VideoMAE-based sanction and action inference with configurable model checkpoints.
- Deterministic development fallbacks and automated contract, API, and model tests.
- Privacy-minded transient clip processing and deletion after inference.

## Technical focus
Next.js, TypeScript, FastAPI, Python, PyTorch, VideoMAE, API contracts, testing, and privacy-aware upload handling.

Repository: https://github.com/ardaedil/varlens-ai
