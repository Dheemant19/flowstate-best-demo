export type Metric = {
  label: string;
  baseline: number;
  value: number;
  delta: number;
  precision: number;
};

export type Stage = {
  title: string;
  time: string;
  detail: string;
  status: "complete" | "selected";
};

export const bestRun = {
  sessionId: "session-20260831T200541276043Z-936d721c",
  experimentId: "E3_mmoe_longview_click_bce-a77ffb2b",
  recordedAt: "September 1, 2026 · 4:05 AM UTC+8",
  candidate: "Compact MMoE · long_view + is_click",
  headline: "Validation-best artifact selected",
  summary:
    "A compact two-task mixture-of-experts model used click feedback only while training, then scored long-view ranking from the permitted categorical inputs.",
  metrics: [
    { label: "GAUC", baseline: 0.6674, value: 0.671071, delta: 0.003671, precision: 6 },
    { label: "nDCG@5", baseline: 0.535744, value: 0.537599, delta: 0.001855, precision: 6 },
    { label: "Primary score", baseline: 0.601572, value: 0.604335, delta: 0.002763, precision: 6 },
  ] satisfies Metric[],
  stages: [
    {
      title: "Lock the challenge rules",
      time: "04:05",
      detail: "KuaiRand-Pure split rules and the organizer evaluator were loaded before any experiment ran.",
      status: "complete",
    },
    {
      title: "Reproduce the FM baseline",
      time: "04:07",
      detail: "Five fixed validation seeds established a primary-score reference of 0.601572.",
      status: "complete",
    },
    {
      title: "Choose one bounded hypothesis",
      time: "04:27",
      detail: "Click and long_view were strongly correlated, so the run tested a compact two-task MMoE without changing the data split or evaluator.",
      status: "complete",
    },
    {
      title: "Train and validate",
      time: "04:32",
      detail: "The long_view head improved primary validation score by 0.002763 over the reproduced FM mean.",
      status: "selected",
    },
    {
      title: "Freeze the final package",
      time: "05:00",
      detail: "The selected checkpoint produced one test prediction file; schema and row alignment passed for 170,588 rows.",
      status: "complete",
    },
  ] satisfies Stage[],
  evidence: {
    validationRows: "124,909",
    validationUsers: "22,377",
    predictionRows: "170,588",
    predictionPasses: "1",
    schemaStatus: "Passed",
    eventChain: "Valid",
    manualInterventions: "0",
  },
  integrity: [
    "Test labels were never used to select the model.",
    "is_click was a training-only auxiliary target, never an inference feature.",
    "The official GAUC and nDCG@5 evaluator produced the recorded validation scores.",
    "The final prediction package was checked once against the organizer schema.",
  ],
  artifacts: [
    ["Checkpoint", "checkpoint.pt", "SHA-256 7b4b…e2df13b"],
    ["Prediction file", "predictions.csv", "Schema check passed"],
    ["Run manifest", "manifest.json", "Event chain valid"],
  ],
} as const;
