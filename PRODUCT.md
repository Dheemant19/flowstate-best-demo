# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React, TypeScript, and Vite. Vercel hosts the static presentation and the optional recorded-session endpoint.

## Users

Hackathon judges and technical reviewers who need to understand one completed FlowState session quickly, without local data, credentials, or a GPU.

## Product Purpose

Show what FlowState selected, why it was selected, and what evidence verifies the output. Success is a reviewer understanding the recorded result without confusing this presentation with a live training system.

## Positioning

A compact audit view of a real completed recommender-system research run, rather than a simulated model dashboard or a generic pitch page.

## Operating Context

A Vercel-hosted demo accompanies the main code repository and is used during a hackathon submission or live presentation.

## Capabilities and Constraints

The page may display only recorded metadata from the selected session. It must not include restricted data, model weights, credentials, training controls, test labels, or fabricated performance claims.

## Evidence on Hand

`src/data.ts` and `api/session.mjs` contain the selected session ID, experiment ID, validation metric receipt values, and successful prediction-schema check taken from the supplied manifest and ledger.

## Product Principles

- Lead with measurable evidence.
- Separate a recorded demo from a live workflow.
- Preserve the observer's calm, operational clarity.
- Make integrity boundaries visible.

## Accessibility & Inclusion

Keyboard-operable audit trail controls, strong text contrast, semantic document structure, and reduced-motion support.
