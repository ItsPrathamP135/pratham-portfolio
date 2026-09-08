import type { TopicVisualization } from "../Type/systemDesignVisual";

// ============================================================
// System Design — Visualization Data
// ============================================================
// Deliberately separate from systemDesignTopics.ts. Update a
// diagram here without touching What/Why/How notes, or vice
// versa. Keyed by topicId (== blockId).

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
        title: "Stage 4 — Add Replication",
        caption: "The database becomes a single point of failure: a replica adds redundancy.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App Server 1", "App Server 2", "App Server 3"] },
          { boxes: ["Cache"] },
          { boxes: ["Database"] },
          { boxes: ["Database Replica"] },
        ],
      },
      {
        title: "Stage 5 — Distributed System",
        caption: "System grows further: services, messaging, and storage split by responsibility.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer / API Gateway"] },
          { boxes: ["Service A", "Service B", "Service C"] },
          { boxes: ["Cache", "Messaging"] },
          { boxes: ["Database", "Storage"] },
        ],
      },
      {
        title: "Problem → Solution → Component",
        caption: "Every component in the diagrams above exists because of a specific problem — not by default.",
        layers: [
          { boxes: ["High traffic → Horizontal scaling → Multiple app instances"] },
          { boxes: ["Traffic distribution → Load balancing → Load Balancer"] },
          { boxes: ["Repeated expensive reads → Caching → Cache"] },
          { boxes: ["Database failure → Redundancy → Replication"] },
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
  "scalability": {
    topicId: "scalability",
    type: "stage-flow",
    summary: "Scaling decisions follow a pipeline: understand the workload, find the real bottleneck, then choose a strategy that fits it — never the other way around.",
    stages: [
      {
        title: "Scaling Decision Pipeline",
        caption: "Identify the bottleneck before choosing how to scale — not after.",
        layers: [
          { boxes: ["Increasing Workload"] },
          { boxes: ["Understand Workload"] },
          { boxes: ["Capacity Estimation"] },
          { boxes: ["Identify Bottleneck"] },
          { boxes: ["Choose Scaling Strategy"] },
          { boxes: ["Application", "Database", "Storage / Network"] },
          { boxes: ["Horizontal Scaling + LB", "Cache / Replicas / Sharding*", "Object Storage / CDN / Geo"] },
          { boxes: ["Monitor → Measure → Reassess"] },
        ],
      },
      {
        title: "Vertical vs Horizontal Scaling",
        caption: "Two different levers — bigger machines vs. more machines.",
        layers: [
          { boxes: ["Vertical Scaling", "Horizontal Scaling"] },
          { boxes: ["Scale Up: add CPU/RAM", "Scale Out: add instances"] },
          { boxes: ["Scale Down: reduce CPU/RAM", "Scale In: remove instances"] },
        ],
      },
      {
        title: "Load Balancer in Horizontal Scaling",
        caption: "A common entry point that spreads traffic across instances.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App 1", "App 2", "App 3"] },
        ],
      },
    ],
  },
  "load-balancer": {
    topicId: "load-balancer",
    type: "stage-flow",
    summary: "A Load Balancer is the common entry point that picks a healthy backend and forwards each request — the algorithm and health checks are what make that reliable.",
    stages: [
      {
        title: "Request Path",
        caption: "Client → DNS → Load Balancer → backend instances → Cache → Database.",
        layers: [
          { boxes: ["Clients"] },
          { boxes: ["DNS"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App 1", "App 2", "App 3"] },
          { boxes: ["Cache"] },
          { boxes: ["Database"] },
        ],
      },
      {
        title: "Round Robin",
        caption: "Sequential distribution — doesn't consider current server load.",
        layers: [
          { boxes: ["Round Robin"] },
          { boxes: ["Request 1 → App1", "Request 2 → App2", "Request 3 → App3", "Request 4 → App1"] },
        ],
      },
      {
        title: "Least Connections",
        caption: "Routes to whichever backend currently has the fewest active connections.",
        layers: [
          { boxes: ["App1 = 100 conn", "App2 = 30 conn", "App3 = 50 conn"] },
          { boxes: ["New request → App2"] },
        ],
      },
      {
        title: "L4 vs L7",
        caption: "Different information available at each layer.",
        layers: [
          { boxes: ["L4 — TCP / UDP / IP / Port"] },
          { boxes: ["L7 — HTTP path / header / cookie / host"] },
        ],
      },
      {
        title: "Stateful vs Stateless",
        caption: "Statelessness is what makes routing to any instance safe.",
        layers: [
          { boxes: ["Stateful", "Stateless"] },
          { boxes: ["App1 stores session locally", "Any instance can serve any request"] },
          { boxes: ["Next request → App2 → session missing", "Request 1→App1, 2→App3, 3→App2 — all succeed"] },
        ],
      },
      {
        title: "Redundant Load Balancer",
        caption: "The Load Balancer itself needs redundancy, or it becomes the new SPOF.",
        layers: [
          { boxes: ["Clients"] },
          { boxes: ["LB 1", "LB 2"] },
          { boxes: ["App Pool"] },
        ],
      },
    ],
  },
};

export const getTopicVisualization = (topicId: string): TopicVisualization | undefined =>
  systemDesignVisuals[topicId];