# FarmGuard AI

FarmGuard AI is a mobile platform that helps farmers report plant and livestock health concerns, receive preliminary AI-assisted assessments, and follow up with agricultural or veterinary experts.

## Day 1 status

The mobile foundation uses Expo, React Native, TypeScript, and Expo Router. The first screen lets a farmer begin either a plant-health or livestock-health report.

## Day 2 status

The app now includes bottom-tab navigation for the farmer dashboard, report history, and profile, plus prototype sign-in and registration screens. Authentication and report data are interface-only until the FastAPI backend is introduced.

## Run locally

1. Install dependencies: `npm install`
2. Start Expo: `npm run android`
3. Open the app in an Android emulator or on an Android device using Expo Go.

## Initial structure

- `app/_layout.tsx` configures the root navigation stack.
- `app/index.tsx` contains the initial farmer dashboard.
- `app.json` defines the Expo and Android app configuration.

## Product scope

FarmGuard AI supports both crop and livestock health concerns. AI outputs will be preliminary guidance, with uncertain or urgent cases directed to appropriate experts.
