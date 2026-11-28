# FarmGuard AI

FarmGuard AI is a mobile platform that helps farmers report plant and livestock health concerns, receive preliminary AI-assisted assessments, and follow up with agricultural or veterinary experts.

## Day 1 status

The mobile foundation uses Expo, React Native, TypeScript, and Expo Router. The first screen lets a farmer begin either a plant-health or livestock-health report.

## Day 2 status

The app now includes bottom-tab navigation for the farmer dashboard, report history, and profile, plus prototype sign-in and registration screens. Authentication and report data are interface-only until the FastAPI backend is introduced.

## Day 7 assessment workflow

With `EXPO_PUBLIC_API_URL` configured and the backend running, a saved farmer profile can submit a plant report with a leaf photo. The app uploads the image for preliminary tomato-leaf screening, stores the result with the report, and displays the uncertainty and expert-review guidance. The present baseline is deliberately non-diagnostic and does not make disease-specific treatment claims.

## Run locally

1. Install dependencies: `npm install`
2. Start Expo: `npm run android`
3. Open the app in an Android emulator or on an Android device using Expo Go.

## Backend (Day 5)

Run `docker compose up --build` to start PostgreSQL and the FastAPI API at `http://localhost:8000`. The interactive API documentation is available at `/docs`. For a physical phone, set `EXPO_PUBLIC_API_URL` to your computer's LAN address (for example, `http://192.168.1.5:8000`), not `localhost`.

## Initial structure

## Day 8 report tracking

Farmers can filter plant and livestock reports, open an individual report, see its submission-to-resolution timeline, read preliminary assessment guidance, and track status.

- `app/_layout.tsx` configures the root navigation stack.
- `app/index.tsx` contains the initial farmer dashboard.
- `app.json` defines the Expo and Android app configuration.

## Product scope

FarmGuard AI supports both crop and livestock health concerns. AI outputs will be preliminary guidance, with uncertain or urgent cases directed to appropriate experts.
