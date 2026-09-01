import type {
  AllowedAction,
  ArtifactResponse,
  ChatTurnDTO,
  JsonRecord,
  RunEventDTO,
  SessionChatResponse,
  SessionListItem,
  SessionSnapshotDTO,
} from "./types";

interface RecordedFixture {
  session: SessionListItem;
  snapshot: SessionSnapshotDTO;
  events: RunEventDTO[];
  package_result: JsonRecord;
}

let fixturePromise: Promise<RecordedFixture> | null = null;

function loadFixture(): Promise<RecordedFixture> {
  fixturePromise ??= fetch("/mock-session.json").then(async (response) => {
    if (!response.ok) throw new Error("Recorded session fixture could not be loaded");
    return response.json() as Promise<RecordedFixture>;
  });
  return fixturePromise;
}

async function recordedSession(sessionId: string): Promise<RecordedFixture> {
  const fixture = await loadFixture();
  if (fixture.session.session_id !== sessionId) throw new Error("This demo only contains the selected recorded session");
  return fixture;
}

const readOnlyMessage = "This hosted observer is a read-only recording of the selected FlowState session.";

export const api = {
  async listSessions(): Promise<SessionListItem[]> {
    return [(await loadFixture()).session];
  },

  async startSession(_challengeConfigPath: string, _budgetConfigPath: string): Promise<{ session_id: string; snapshot_url: string }> {
    throw new Error(readOnlyMessage);
  },

  async deleteSession(_sessionId: string): Promise<void> {
    throw new Error(readOnlyMessage);
  },

  packageFileUrl(_sessionId: string, _filename: "predictions.csv" | "manifest.json"): string {
    return `/api/v1/sessions/${encodeURIComponent(_sessionId)}/package/${_filename}`;
  },

  async getSnapshot(sessionId: string): Promise<SessionSnapshotDTO> {
    return (await recordedSession(sessionId)).snapshot;
  },

  async getReplay(sessionId: string): Promise<{ mode: string; events: RunEventDTO[]; final_snapshot: SessionSnapshotDTO }> {
    const fixture = await recordedSession(sessionId);
    return { mode: "recorded_demo", events: fixture.events, final_snapshot: fixture.snapshot };
  },

  async getExecution(sessionId: string, componentId: string, executionId: string): Promise<{ component_id: string; execution_id: string; attempts: RunEventDTO[] }> {
    const fixture = await recordedSession(sessionId);
    return {
      component_id: componentId,
      execution_id: executionId,
      attempts: fixture.events.filter((event) => event.component_id === componentId && event.execution_id === executionId),
    };
  },

  async getArtifact(artifactId: string): Promise<ArtifactResponse> {
    const fixture = await loadFixture();
    const source = fixture.events.find((event) => event.artifact_ids.includes(artifactId));
    return {
      artifact_id: artifactId,
      path: "Recorded session metadata",
      content_hash: source?.event_hash ?? "not-recorded",
      media_type: "application/json",
      taint: null,
      parent_ids: [],
      row_count: null,
      schema_fingerprint: null,
      source_hashes: {},
      code_hash: null,
      created_at: source?.occurred_at ?? fixture.session.created_at,
      content: source?.payload ?? { detail: "Artifact bytes are intentionally excluded from this public demo." },
    };
  },

  async control(_sessionId: string, action: Extract<AllowedAction, "pause" | "resume" | "cancel">, _expectedSequence: number): Promise<{ accepted: boolean; action: string }> {
    return { accepted: false, action };
  },

  async packageSession(sessionId: string): Promise<JsonRecord> {
    return (await recordedSession(sessionId)).package_result;
  },

  async chatSession(_sessionId: string, _question: string, _history: ChatTurnDTO[]): Promise<SessionChatResponse> {
    return {
      answer: "This is a read-only recording of the selected run. The original session selected E3_mmoe_longview_click_bce-a77ffb2b with validation primary 0.604335 after the organizer evaluator completed.",
      model: "recorded-demo",
      reasoning_effort: "not-applicable",
      usage: { input_tokens: 0, output_tokens: 0, model_id: "recorded-demo" },
    };
  },
};

export function subscribeToEvents(
  sessionId: string,
  afterSequence: number,
  onEvent: (event: RunEventDTO) => void,
  onConnectionChange: (state: "open" | "retrying" | "closed") => void,
): () => void {
  let closed = false;
  window.setTimeout(() => {
    if (closed) return;
    onConnectionChange("open");
    void recordedSession(sessionId).then((fixture) => {
      if (closed) return;
      fixture.events.filter((event) => event.sequence > afterSequence).forEach(onEvent);
    });
  }, 0);
  return () => { closed = true; };
}
