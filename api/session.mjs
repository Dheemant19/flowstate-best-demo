const session = {
  mode: "recorded_demo",
  session_id: "session-20260831T200541276043Z-936d721c",
  experiment_id: "E3_mmoe_longview_click_bce-a77ffb2b",
  status: "succeeded",
  validation_best: "run-20260831T202719617387Z-a77ffb2b",
  metrics: {
    gauc: 0.6710712215442631,
    ndcg_at_5: 0.5375992112887427,
    primary: 0.6043352164165029,
    delta_vs_reproduced_fm: 0.002763162588288348,
  },
  submission_check: {
    status: "passed",
    rows: 170588,
  },
};

export default function handler(_request, response) {
  response.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  response.status(200).json(session);
}
