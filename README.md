# FlowState — Recorded Best-Run Observer

This repository ships the **same FlowState observer interface** as the main project, preloaded with a safe, read-only recording of the validation-best session. It contains the exact workflow canvas, experiment history, data profile, resources, package view, and autonomy log; it does not include raw data, checkpoints, credentials, test labels, or live training.

## Recorded session

- **Session:** `session-20260831T200541276043Z-936d721c`
- **Selected experiment:** `E3_mmoe_longview_click_bce-a77ffb2b`
- **Validation GAUC:** `0.671071`
- **Validation nDCG@5:** `0.537599`
- **Validation primary:** `0.604335`
- **Change versus reproduced five-seed FM mean:** `+0.002763`
- **Final prediction check:** passed for `170,588` rows

The values come from the selected run's recorded manifest and metric receipt. They are validation results, not hidden-test scores.

## Run locally

Install [Node.js 20 LTS or newer](https://nodejs.org/), then:

```bash
npm ci
npm run dev
```

Open the localhost URL printed by Vite, normally `http://localhost:5173`.

Build the same static site Vercel will serve:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Vite. Keep the defaults: build command `npm run build`, output directory `dist`.
4. Click **Deploy**. No environment variables are required.

`GET /api/session` is a small Vercel mock endpoint for the high-level recorded session summary. The observer itself loads `public/mock-session.json`, which contains the redacted ledger snapshot and 163 recorded events used to render the real observer UI without a live backend.

## Scope

This repository exists only for the hackathon demonstration. The functional autonomous research workflow, local observer, data handling, evaluation, and submission packaging live in the main FlowState repository.
