

// ============================================================
// System Design — Visualization Data
// ============================================================
// Deliberately separate from systemDesignTopics.ts. Update a
// diagram here without touching What/Why/How notes, or vice
// versa. Keyed by topicId (== blockId).

import type { TopicVisualization } from "../Type/systemDesignVisual";

export const systemDesignVisuals: Record<string, TopicVisualization> = {
  "system-design-introduction": {
    topicId: "system-design-introduction",
    type: "stage-flow",
    summary: "Systems become more distributed and add components as requirements and scale increase.",
    stages: [
      {
        title: "Stage 1 — Single Server",
        caption: "Fine for low traffic. One machine, one point of failure.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Application Server"] },
          { boxes: ["Database"] },
        ],
      },
      {
        title: "Stage 2 — Horizontal Scaling",
        caption: "Traffic grows: one server can't keep up, so load gets distributed.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App Server 1", "App Server 2", "App Server 3"] },
          { boxes: ["Database"] },
        ],
      },
      {
        title: "Stage 3 — Add Caching",
        caption: "Read load grows: a cache absorbs repeat reads before they hit the database.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App Server 1", "App Server 2", "App Server 3"] },
          { boxes: ["Cache"] },
          { boxes: ["Database"] },
        ],
      },
      {
        title: "Stage 4 — Distributed System",
        caption: "System grows further: services, messaging, and storage split by responsibility.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer / API Gateway"] },
          { boxes: ["Service A", "Service B", "Service C"] },
          { boxes: ["Cache", "Messaging"] },
          { boxes: ["Database", "Storage"] },
        ],
      },
    ],
  },
  "functional-and-non-functional-requirements": {
    topicId: "functional-and-non-functional-requirements",
    type: "stage-flow",
    summary: "Requirements are gathered and split into FR (what the system does) and NFR (how well it does it) before any architecture decision is made.",
    stages: [
      {
        title: "Requirement → Architecture Pipeline",
        caption: "Every design decision traces back to a requirement, not the other way around.",
        layers: [
          { boxes: ["Requirements"] },
          { boxes: ["Functional Requirements", "Non-Functional Requirements"] },
          { boxes: ["Scale / Constraints / Priorities"] },
          { boxes: ["Architecture"] },
          { boxes: ["Design Decisions"] },
          { boxes: ["Technology Choices"] },
        ],
      },
      {
        title: "FR vs NFR",
        caption: "Two different questions about the same system.",
        layers: [
          { boxes: ["Requirements"] },
          { boxes: ["Functional — WHAT it does", "Non-Functional — HOW WELL it does it"] },
        ],
      },
    ],
  },
};

export const getTopicVisualization = (topicId: string): TopicVisualization | undefined =>
  systemDesignVisuals[topicId];
