# BrainTech EEG Assist — interactive prototype

A responsive React + TypeScript website based on the BrainTech EEG Assist System app-monitoring concept. All EEG data, intention recognition, device state, and robotic arm actions are simulated.

## Run locally

Install Node.js 20+, then:

```bash
npm install
npm run dev
```

Open the localhost address shown by Vite.

## Build for web

```bash
npm run build
```

The production website is generated in `dist/`.

## Turn into an Android / iOS app

This project is compatible with a Capacitor wrapper. From the project directory:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "BrainTech EEG Assist" "org.braintech.eegassist" --web-dir dist
npm install @capacitor/android @capacitor/ios
npm run build
npx cap add android
npx cap sync
npx cap open android
```

For iOS, use macOS with Xcode and `npx cap add ios`, `npx cap sync`, and `npx cap open ios`. Android requires Android Studio.

## Future hardware integration

Replace the simulated waveform and intent generation with a real EEG input service; implement authenticated APIs and explicit user consent for remote family monitoring. Use independently tested hardware-level safety interlocks for any physical robotic arm. The website's Stop button and SOS modal are only simulations and are **not** safety controls or emergency services.

## Features

- Responsive dashboard with animated simulated EEG waveform
- Sample intention selection, confidence display, execution progress and stop
- Calibration walkthrough
- In-session event history and error reporting
- Family monitoring mockup
- Emergency SOS demonstration modal
