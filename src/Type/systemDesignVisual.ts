// ============================================================
// System Design — Visualization Types
// ============================================================
// Kept separate from TopicContent on purpose: diagrams can be
// updated independently of What/Why/How notes. A visualization
// is a series of "stages" (e.g. system evolution), each made of
// stacked layers, where a layer can hold one or more parallel
// boxes (e.g. multiple app servers side by side).

export interface DiagramLayer {
  /** One or more boxes rendered side-by-side at this level of the stack */
  boxes: string[];
}

export interface DiagramStage {
  title: string; // e.g. "Stage 1 — Single Server"
  caption?: string; // short note shown under the stage title
  layers: DiagramLayer[]; // top to bottom
}

export interface TopicVisualization {
  /** Matches SystemDesignBlock.id */
  topicId: string;
  type: "stage-flow";
  /** One-line takeaway shown above the diagram */
  summary: string;
  stages: DiagramStage[];
}
