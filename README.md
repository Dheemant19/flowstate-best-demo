# FlowState — Best-Run Demo

A data-free presentation of FlowState's recorded validation-best session. It is intentionally a mock: the page shows the selected model, validation metrics, audit trail, final-package check, and integrity rules, but it does not load data, train a model, expose credentials, or make live model calls.

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

The optional `GET /api/session` Vercel function returns the same recorded session metadata as JSON. The browser UI itself is static and needs no backend connection.

## Scope

This repository exists only for the hackathon demonstration. The functional autonomous research workflow, local observer, data handling, evaluation, and submission packaging live in the main FlowState repository.
