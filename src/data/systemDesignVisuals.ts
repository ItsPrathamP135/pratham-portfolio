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
    summary:
      "Systems become more distributed and add components as requirements and scale increase.",
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
        caption:
          "Traffic grows: one server can't keep up, so load gets distributed.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App Server 1", "App Server 2", "App Server 3"] },
          { boxes: ["Database"] },
        ],
      },
      {
        title: "Stage 3 — Add Caching",
        caption:
          "Read load grows: a cache absorbs repeat reads before they hit the database.",
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
        caption:
          "The database becomes a single point of failure: a replica adds redundancy.",
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
        caption:
          "System grows further: services, messaging, and storage split by responsibility.",
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
        caption:
          "Every component in the diagrams above exists because of a specific problem — not by default.",
        layers: [
          {
            boxes: [
              "High traffic → Horizontal scaling → Multiple app instances",
            ],
          },
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
    summary:
      "Requirements are gathered and split into FR (what the system does) and NFR (how well it does it) before any architecture decision is made.",
    stages: [
      {
        title: "Requirement → Architecture Pipeline",
        caption:
          "Every design decision traces back to a requirement, not the other way around.",
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
          {
            boxes: [
              "Functional — WHAT it does",
              "Non-Functional — HOW WELL it does it",
            ],
          },
        ],
      },
    ],
  },
  scalability: {
    topicId: "scalability",
    type: "stage-flow",
    summary:
      "Scaling decisions follow a pipeline: understand the workload, find the real bottleneck, then choose a strategy that fits it — never the other way around.",
    stages: [
      {
        title: "Scaling Decision Pipeline",
        caption:
          "Identify the bottleneck before choosing how to scale — not after.",
        layers: [
          { boxes: ["Increasing Workload"] },
          { boxes: ["Understand Workload"] },
          { boxes: ["Capacity Estimation"] },
          { boxes: ["Identify Bottleneck"] },
          { boxes: ["Choose Scaling Strategy"] },
          { boxes: ["Application", "Database", "Storage / Network"] },
          {
            boxes: [
              "Horizontal Scaling + LB",
              "Cache / Replicas / Sharding*",
              "Object Storage / CDN / Geo",
            ],
          },
          { boxes: ["Monitor → Measure → Reassess"] },
        ],
      },
      {
        title: "Vertical vs Horizontal Scaling",
        caption: "Two different levers — bigger machines vs. more machines.",
        layers: [
          { boxes: ["Vertical Scaling", "Horizontal Scaling"] },
          { boxes: ["Scale Up: add CPU/RAM", "Scale Out: add instances"] },
          {
            boxes: ["Scale Down: reduce CPU/RAM", "Scale In: remove instances"],
          },
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
    summary:
      "A Load Balancer is the common entry point that picks a healthy backend and forwards each request — the algorithm and health checks are what make that reliable.",
    stages: [
      {
        title: "Request Path",
        caption:
          "Client → DNS → Load Balancer → backend instances → Cache → Database.",
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
        caption:
          "Sequential distribution — doesn't consider current server load.",
        layers: [
          { boxes: ["Round Robin"] },
          {
            boxes: [
              "Request 1 → App1",
              "Request 2 → App2",
              "Request 3 → App3",
              "Request 4 → App1",
            ],
          },
        ],
      },
      {
        title: "Least Connections",
        caption:
          "Routes to whichever backend currently has the fewest active connections.",
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
          {
            boxes: [
              "App1 stores session locally",
              "Any instance can serve any request",
            ],
          },
          {
            boxes: [
              "Next request → App2 → session missing",
              "Request 1→App1, 2→App3, 3→App2 — all succeed",
            ],
          },
        ],
      },
      {
        title: "Redundant Load Balancer",
        caption:
          "The Load Balancer itself needs redundancy, or it becomes the new SPOF.",
        layers: [
          { boxes: ["Clients"] },
          { boxes: ["LB 1", "LB 2"] },
          { boxes: ["App Pool"] },
        ],
      },
    ],
  },
  cdn: {
    topicId: "cdn",
    type: "stage-flow",
    summary:
      "A CDN serves cacheable content from an edge location near the user, only reaching the origin when the edge doesn't already have it.",
    stages: [
      {
        title: "Cache Hit",
        caption: "Origin is not contacted — the edge already has the content.",
        layers: [
          { boxes: ["User"] },
          { boxes: ["DNS / CDN Routing"] },
          { boxes: ["CDN Edge / PoP"] },
          { boxes: ["Cache HIT"] },
          { boxes: ["Response → User"] },
        ],
      },
      {
        title: "Cache Miss",
        caption:
          "The edge fetches from origin once, then serves future requests from cache.",
        layers: [
          { boxes: ["User"] },
          { boxes: ["CDN Edge / PoP"] },
          { boxes: ["Cache MISS"] },
          { boxes: ["Origin"] },
          { boxes: ["CDN Cache stores content"] },
          { boxes: ["Response → User"] },
        ],
      },
      {
        title: "CDN + Load Balancer",
        caption:
          "They coexist — CDN handles cacheable content, LB distributes what reaches the backend.",
        layers: [
          { boxes: ["User"] },
          { boxes: ["CDN"] },
          { boxes: ["Cache Miss ↓"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["App 1", "App 2", "App 3"] },
        ],
      },
      {
        title: "CDN + Object Storage",
        caption:
          "Object storage holds the files; the CDN delivers them efficiently.",
        layers: [
          { boxes: ["User"] },
          { boxes: ["CDN"] },
          { boxes: ["Cache Miss ↓"] },
          { boxes: ["Object Storage"] },
          { boxes: ["CDN caches it"] },
          { boxes: ["User"] },
        ],
      },
      {
        title: "Cache Stampede",
        caption:
          "A popular object expiring at the wrong moment can flood the origin all at once.",
        layers: [
          { boxes: ["Popular object expires"] },
          { boxes: ["10,000 users request it simultaneously"] },
          { boxes: ["All requests miss cache"] },
          { boxes: ["10,000 requests hit origin at once"] },
        ],
      },
    ],
  },
  hashing: {
    topicId: "hashing",
    type: "stage-flow",
    summary:
      "Plain modulo hashing breaks when the node count changes — consistent hashing (with virtual nodes) fixes that by minimizing how much remaps.",
    stages: [
      {
        title: "Basic Hashing",
        caption:
          "The same input always deterministically maps to the same hash value.",
        layers: [
          { boxes: ["User ID = 101"] },
          { boxes: ["hash(101)"] },
          { boxes: ["Hash Value"] },
          { boxes: ["Bucket / Server"] },
        ],
      },
      {
        title: "Collision",
        caption:
          "Different keys can land in the same bucket — this is normal, not a bug.",
        layers: [
          { boxes: ["Key A → hash() → Bucket 3", "Key B → hash() → Bucket 3"] },
        ],
      },
      {
        title: "Collision Handling",
        caption:
          "Chaining stores multiple entries per bucket; open addressing finds the next free slot.",
        layers: [
          { boxes: ["Chaining: Bucket 3 → Key A → Key B → Key C"] },
          {
            boxes: [
              "Open Addressing: Bucket 3 full → try Bucket 4 → try Bucket 5",
            ],
          },
        ],
      },
      {
        title: "Modulo Hashing",
        caption: "serverIndex = hash(key) % N.",
        layers: [
          { boxes: ["ID = 10, N = 3"] },
          { boxes: ["10 % 3 = 1"] },
          { boxes: ["ID 10 → Server 1"] },
        ],
      },
      {
        title: "The Scaling Problem",
        caption:
          "Changing N reshuffles most keys, not just ones tied to the change.",
        layers: [
          { boxes: ["Before: N=3 — KeyA→S0, KeyB→S1, KeyC→S2"] },
          { boxes: ["After: N=4 — many keys now map to a different server"] },
          {
            boxes: [
              "Cache misses · Data migration · Rebalancing · Instability",
            ],
          },
        ],
      },
      {
        title: "Consistent Hashing Ring",
        caption:
          "Keys and nodes share a ring; a key is owned by the next node clockwise.",
        layers: [
          { boxes: ["Ring: S1=15, S2=40, S3=65, S4=90"] },
          { boxes: ["Key = 50 (between S2 and S3)"] },
          { boxes: ["Clockwise next → S3"] },
          { boxes: ["Key 50 → S3"] },
        ],
      },
      {
        title: "Wrap-Around",
        caption:
          "The ring loops back to the start — nothing falls off the end.",
        layers: [
          { boxes: ["Key near 95"] },
          { boxes: ["No server after it on the ring"] },
          { boxes: ["Continue from position 0"] },
          { boxes: ["First server encountered owns it"] },
        ],
      },
      {
        title: "Adding a Node",
        caption: "Only the affected range remaps — not the whole ring.",
        layers: [
          { boxes: ["Before: S1, S2, S3, S4"] },
          { boxes: ["Add S5 = 55"] },
          { boxes: ["Only keys in S5's new range move to it"] },
        ],
      },
      {
        title: "Removing a Node",
        caption: "Its keys move to the next node clockwise.",
        layers: [
          { boxes: ["S3 removed"] },
          { boxes: ["S3's keys reassigned to next node clockwise"] },
        ],
      },
      {
        title: "Uneven Distribution",
        caption:
          "One ring position per physical node can divide the ring unevenly.",
        layers: [
          {
            boxes: [
              "S1 owns a very large section",
              "S2 owns a small section",
              "S3 owns a small section",
            ],
          },
          { boxes: ["Hotspots · Uneven CPU/memory/request load"] },
        ],
      },
      {
        title: "Virtual Nodes",
        caption:
          "Each physical server gets multiple ring positions, smoothing distribution.",
        layers: [
          { boxes: ["Physical S1 → V1, V2, V3, V4"] },
          { boxes: ["Physical S2 → V5, V6, V7, V8"] },
        ],
      },
      {
        title: "Virtual Node Failure & Cascading Failure",
        caption:
          "Spreading a node's ranges reduces concentrated impact when it fails.",
        layers: [
          { boxes: ["S1 (V1, V2, V3) fails"] },
          { boxes: ["Ranges distributed across multiple surviving servers"] },
          {
            boxes: [
              "vs. no virtual nodes: S1 fails → S2 overloaded → S2 fails → S3 overloaded",
            ],
          },
        ],
      },
      {
        title: "Real System Use Cases",
        caption:
          "The same idea shows up across caching, sharding, and routing.",
        layers: [
          { boxes: ["Hashing"] },
          { boxes: ["Cache", "Sharding", "Routing"] },
          { boxes: ["Redis", "Database", "Services"] },
        ],
      },
    ],
  },
  "stateful-vs-stateless": {
    topicId: "stateful-vs-stateless",
    type: "stage-flow",
    summary:
      "A stateful server remembers you by keeping session data in its own memory; a stateless one doesn't — the state travels in a token or lives in a shared store instead.",
    stages: [
      {
        title: "What Is State",
        caption: "Information the server must remember between requests.",
        layers: [
          { boxes: ["Request 1: POST /login"] },
          {
            boxes: [
              "Server creates: User=Pratham, SessionID=ABC123, LoggedIn=true",
            ],
          },
          { boxes: ["Request 2: GET /profile (SessionID=ABC123)"] },
          { boxes: ["Server must know what ABC123 means"] },
        ],
      },
      {
        title: "Stateful Architecture",
        caption:
          "The server depends on state remembered from a previous request.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Server A"] },
          { boxes: ["Local Session"] },
        ],
      },
      {
        title: "Stateless Architecture",
        caption:
          "Any healthy server can process the request — no dependency on local memory.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["Server A (this request)", "Server B (next request)"] },
        ],
      },
      {
        title: "Local Session + Multiple Servers Problem",
        caption:
          "A session created on one instance is invisible to the others.",
        layers: [
          { boxes: ["Load Balancer"] },
          {
            boxes: [
              "Server A (Session X created)",
              "Server B (Session X unavailable)",
            ],
          },
        ],
      },
      {
        title: "Sticky Sessions",
        caption:
          "The load balancer keeps routing the same user to the same server.",
        layers: [
          { boxes: ["User A"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["Server A (every request)"] },
        ],
      },
      {
        title: "Sticky Session Server Failure",
        caption:
          "Sticky routing doesn't protect the session if that server dies.",
        layers: [
          { boxes: ["User → Server A → Local Session"] },
          { boxes: ["Server A ❌"] },
          { boxes: ["User routed to Server B"] },
          { boxes: ["Session unavailable (only existed on A)"] },
        ],
      },
      {
        title: "Shared Redis Session Store",
        caption: "Any instance can reach the same session data.",
        layers: [
          { boxes: ["Load Balancer"] },
          { boxes: ["Server A", "Server B"] },
          { boxes: ["Redis (shared session store)"] },
        ],
      },
      {
        title: "Stateless JWT Authentication",
        caption: "The proof of identity travels with the request itself.",
        layers: [
          { boxes: ["Client (holds JWT)"] },
          { boxes: ["Authorization: Bearer <token>"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["Any application server validates the token"] },
        ],
      },
      {
        title: "Stateful vs Stateless API",
        caption: "Does the next request depend on server-created context?",
        layers: [
          {
            boxes: [
              "Stateful: POST /checkout → server creates checkout state → GET /checkout/status needs it",
            ],
          },
          {
            boxes: [
              "Stateless: GET /users/101 + JWT → any server can answer independently",
            ],
          },
        ],
      },
      {
        title: "Horizontal Scaling",
        caption:
          "Stateless instances absorb new capacity freely; local state doesn't.",
        layers: [
          { boxes: ["Load Balancer"] },
          { boxes: ["A", "B", "C"] },
          { boxes: ["+ D, + E (new instances, no state to migrate)"] },
        ],
      },
      {
        title: "Failure Handling — Three Cases",
        caption:
          "The blast radius of a server failure depends entirely on where state lives.",
        layers: [
          {
            boxes: ["Stateful local session: Server A ❌ → local session lost"],
          },
          {
            boxes: [
              "Stateless: Server A ❌ → LB → Server B → request processed",
            ],
          },
          {
            boxes: [
              "Stateless + external session: Server A ❌ → Server B → Redis → session retrieved",
            ],
          },
        ],
      },
      {
        title: "Session Replication",
        caption:
          "Copying session data across instances — a different trade-off from centralizing it.",
        layers: [
          { boxes: ["Server A has session"] },
          { boxes: ["Session replicated to Server B"] },
          { boxes: ["A fails → B still has a copy"] },
        ],
      },
      {
        title: "Architecture Comparison",
        caption:
          "Three ways to handle the same problem, in increasing scalability.",
        layers: [
          {
            boxes: [
              "A. Stateful local: Client → LB → Server A → Local Session",
            ],
          },
          {
            boxes: [
              "B. Stateful + shared session: Client → LB → A/B/C → Redis Session Store",
            ],
          },
          {
            boxes: [
              "C. Stateless + JWT: Client (JWT) → LB → A/B/C, no shared session needed",
            ],
          },
        ],
      },
    ],
  },
  "availability-zones": {
    topicId: "availability-zones",
    type: "stage-flow",
    summary:
      "AZs are isolated failure domains within a Region — spreading servers across them protects against facility-level failure, not just individual server failure.",
    stages: [
      {
        title: "Region → AZ Hierarchy",
        caption: "A Region contains multiple isolated AZs.",
        layers: [{ boxes: ["Region"] }, { boxes: ["AZ-1", "AZ-2", "AZ-3"] }],
      },
      {
        title: "Single-AZ Architecture",
        caption:
          "Everything shares one failure domain — losing it loses everything.",
        layers: [{ boxes: ["AZ-1"] }, { boxes: ["App A", "App B", "App C"] }],
      },
      {
        title: "Multi-AZ Application Architecture",
        caption: "Losing one AZ only removes part of total capacity.",
        layers: [
          { boxes: ["AZ-1: App A, App B"] },
          { boxes: ["AZ-2: App C, App D"] },
        ],
      },
      {
        title: "Load Balancer + Multi-AZ",
        caption: "The LB health-checks instances across every AZ.",
        layers: [
          { boxes: ["Client"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["AZ-1 instances", "AZ-2 instances"] },
        ],
      },
      {
        title: "Database Primary + Standby Across AZs",
        caption: "The standby can be promoted if the primary's AZ fails.",
        layers: [
          { boxes: ["AZ-1: Primary DB"] },
          { boxes: ["Replication"] },
          { boxes: ["AZ-2: Standby DB"] },
        ],
      },
      {
        title: "Synchronous Replication",
        caption: "Write is acknowledged only after the standby has it too.",
        layers: [
          { boxes: ["Write → Primary"] },
          { boxes: ["Primary → Standby (must confirm)"] },
          { boxes: ["Acknowledged to client"] },
        ],
      },
      {
        title: "Asynchronous Replication",
        caption:
          "Write is acknowledged immediately; the standby catches up after.",
        layers: [
          { boxes: ["Write → Primary"] },
          { boxes: ["Acknowledged to client immediately"] },
          { boxes: ["Primary → Standby (afterward, may lag)"] },
        ],
      },
      {
        title: "AZ Failure and Failover",
        caption: "Traffic and the database role both shift to AZ-2.",
        layers: [
          { boxes: ["AZ-1 ❌"] },
          { boxes: ["LB detects unhealthy resources"] },
          { boxes: ["Traffic → AZ-2"] },
          { boxes: ["Standby DB promoted to primary"] },
        ],
      },
      {
        title: "Stateless Spring Boot + Redis + MySQL Across AZs",
        caption: "A realistic production layout.",
        layers: [
          { boxes: ["Users"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["AZ-1: Spring Boot A, A2", "AZ-2: Spring Boot B, B2"] },
          { boxes: ["Redis (cross-AZ replicas)"] },
          { boxes: ["MySQL HA (primary/standby across AZs)"] },
        ],
      },
      {
        title: "Multi-AZ vs Multi-Region",
        caption: "Different failure scopes — facility-level vs region-wide.",
        layers: [
          { boxes: ["Multi-AZ: AZ-1, AZ-2, AZ-3 within one Region"] },
          {
            boxes: [
              "Multi-Region: Region A, Region B — geographically separate",
            ],
          },
        ],
      },
      {
        title: "Active-Active vs Active-Standby",
        caption: "Both sides serving traffic, vs. one side ready as backup.",
        layers: [
          { boxes: ["Active-Active: AZ-1 (serving) + AZ-2 (serving)"] },
          { boxes: ["Active-Standby: AZ-1 (serving) + AZ-2 (standby, ready)"] },
        ],
      },
      {
        title: "Kafka Brokers Distributed Across AZs",
        caption:
          "Replicas need to actually land in different AZs, not just exist.",
        layers: [
          { boxes: ["AZ-1: Broker 1 (Partition Leader)"] },
          { boxes: ["AZ-2: Broker 2 (Replica)", "AZ-3: Broker 3 (Replica)"] },
        ],
      },
    ],
  },
  reliability: {
    topicId: "reliability",
    type: "stage-flow",
    summary:
      "Build reliable systems by identifying failures, detecting them quickly, isolating their impact, recovering safely, protecting data and correctness, and continuously learning from failures.",

    stages: [
      {
        title: "1. Unreliable vs Reliable Architecture",
        caption:
          "A reliable system continues providing correct behavior even when individual components fail.",
        layers: [
          {
            boxes: [
              "Single Application Server",
              "Single Database",
              "No Health Checks",
              "No Timeout",
              "No Failure Handling",
            ],
          },
          {
            boxes: [
              "Redundant Servers",
              "Database Replication",
              "Health Checks",
              "Timeouts",
              "Failure Recovery",
            ],
          },
        ],
      },

      {
        title: "2. Identify What Can Fail",
        caption:
          "Reliability starts by identifying failure points across the complete architecture.",
        layers: [
          {
            boxes: [
              "Application",
              "Server",
              "Network",
              "Database",
              "Cache",
              "Message Broker",
              "External API",
              "Storage",
            ],
          },
        ],
      },

      {
        title: "3. Remove Single Points of Failure",
        caption:
          "Redundancy prevents one component failure from bringing down the entire system.",
        layers: [
          {
            boxes: [
              "Application Server A",
              "Application Server B",
              "Database Primary",
              "Database Replica",
            ],
          },
          {
            boxes: [
              "Load Balancer",
              "Multi-AZ Deployment",
              "Failover",
              "Redundant Dependencies",
            ],
          },
        ],
      },

      {
        title: "4. Detect Failure",
        caption:
          "The system must detect unhealthy components before routing more traffic to them.",
        layers: [
          {
            boxes: ["Health Checks", "Liveness Check", "Readiness Check"],
          },
          {
            boxes: ["Load Balancer", "Service Discovery", "Orchestrator"],
          },
        ],
      },

      {
        title: "5. Timeout Prevents Cascading Failure",
        caption:
          "A timeout prevents a request from waiting indefinitely for a slow or failed dependency.",
        layers: [
          {
            boxes: ["Service A", "Timeout", "Service B"],
          },
          {
            boxes: [
              "Without Timeout → Threads Wait → Resources Exhausted",
              "With Timeout → Fail Fast → Resources Released",
            ],
          },
        ],
      },

      {
        title: "6. Retry Transient Failures",
        caption:
          "Retries can recover temporary failures, but uncontrolled retries can create retry storms.",
        layers: [
          {
            boxes: ["Request", "Temporary Failure", "Retry", "Success"],
          },
          {
            boxes: [
              "Exponential Backoff",
              "Jitter",
              "Maximum Retry Limit",
              "Idempotency",
            ],
          },
        ],
      },

      {
        title: "7. Circuit Breaker Stops Cascading Failures",
        caption:
          "Circuit breakers stop repeatedly calling an unhealthy dependency.",
        layers: [
          {
            boxes: ["CLOSED", "Requests Flow Normally"],
          },
          {
            boxes: ["Failures Increase", "OPEN", "Requests Fail Fast"],
          },
          {
            boxes: [
              "Recovery Check",
              "HALF-OPEN",
              "Healthy → CLOSED",
              "Failure → OPEN",
            ],
          },
        ],
      },

      {
        title: "8. Bulkhead Resource Isolation",
        caption:
          "Bulkheads isolate resources so failure or overload in one area does not consume everything.",
        layers: [
          {
            boxes: ["Service A", "Thread Pool A", "Connection Pool A"],
          },
          {
            boxes: ["Service B", "Thread Pool B", "Connection Pool B"],
          },
          {
            boxes: ["Service C", "Thread Pool C", "Connection Pool C"],
          },
        ],
      },

      {
        title: "9. Rate Limiting + Load Shedding",
        caption:
          "Protect system capacity by controlling incoming traffic and rejecting excess work when necessary.",
        layers: [
          {
            boxes: ["Incoming Traffic", "Rate Limiter", "Allowed Requests"],
          },
          {
            boxes: [
              "Excess Traffic",
              "Reject / Load Shed",
              "Protect Healthy Capacity",
            ],
          },
        ],
      },

      {
        title: "10. Graceful Degradation",
        caption:
          "When a non-critical dependency fails, continue serving the core user experience.",
        layers: [
          {
            boxes: ["Request", "Primary Service"],
          },
          {
            boxes: [
              "Recommendation Service",
              "Notification Service",
              "Analytics Service",
            ],
          },
          {
            boxes: [
              "Dependency Failure",
              "Fallback",
              "Core Function Continues",
            ],
          },
        ],
      },

      {
        title: "11. Protect Data with Replication",
        caption:
          "Replication provides additional copies of data and supports failover.",
        layers: [
          {
            boxes: ["Primary Database"],
          },
          {
            boxes: ["Replica 1", "Replica 2"],
          },
          {
            boxes: ["Failover", "Promote Healthy Replica"],
          },
        ],
      },

      {
        title: "12. Replication vs Backup",
        caption:
          "Replication improves availability; backups protect against data loss and logical corruption.",
        layers: [
          {
            boxes: ["Replication", "Fast Failover", "High Availability"],
          },
          {
            boxes: ["Backup", "Point-in-Time Recovery", "Data Recovery"],
          },
        ],
      },

      {
        title: "13. RPO vs RTO",
        caption:
          "Reliability planning must define how much data loss and downtime the business can tolerate.",
        layers: [
          {
            boxes: ["RPO", "Maximum Acceptable Data Loss"],
          },
          {
            boxes: ["RTO", "Maximum Acceptable Recovery Time"],
          },
        ],
      },

      {
        title: "14. Preserve Correctness with Idempotency",
        caption:
          "Retries must not create duplicate side effects, especially for payments and other critical operations.",
        layers: [
          {
            boxes: ["Client Request", "Idempotency Key", "Payment Service"],
          },
          {
            boxes: [
              "First Request → Charge",
              "Retry → Same Key",
              "Return Existing Result",
            ],
          },
        ],
      },

      {
        title: "15. Reliable Payment Architecture",
        caption:
          "A payment can succeed even when the response is lost, so correctness requires durable state, idempotency and reconciliation.",
        layers: [
          {
            boxes: ["Client", "Payment API", "Payment Provider"],
          },
          {
            boxes: [
              "Idempotency Key",
              "Durable Payment State",
              "Retry",
              "Reconciliation",
            ],
          },
        ],
      },

      {
        title: "16. Ambiguous Payment Outcome",
        caption: "A timeout does not necessarily mean the payment failed.",
        layers: [
          {
            boxes: ["Payment Request", "Provider Processes Payment"],
          },
          {
            boxes: [
              "Response Lost",
              "Client Sees Timeout",
              "Payment Status = Unknown",
            ],
          },
          {
            boxes: [
              "Retry Same Idempotency Key",
              "Check Existing Result",
              "Avoid Duplicate Charge",
            ],
          },
        ],
      },

      {
        title: "17. Protect the Message Layer",
        caption:
          "Reliable messaging requires durable messages, replication, correct acknowledgement and consumer failure handling.",
        layers: [
          {
            boxes: ["Producer", "Message Broker", "Consumer"],
          },
          {
            boxes: [
              "Replication",
              "Acknowledgement",
              "Consumer Retry",
              "Offset Management",
              "DLQ",
            ],
          },
        ],
      },

      {
        title: "18. End-to-End Reliable Microservices",
        caption:
          "Reliability requires protection at every layer rather than relying on a single mechanism.",
        layers: [
          {
            boxes: ["Client", "API Gateway", "Load Balancer"],
          },
          {
            boxes: ["Service A", "Service B", "Service C"],
          },
          {
            boxes: ["Timeout", "Retry", "Circuit Breaker", "Bulkhead"],
          },
          {
            boxes: ["Database", "Cache", "Message Broker"],
          },
        ],
      },

      {
        title: "19. Cascading Failure Prevention",
        caption:
          "Combine multiple reliability mechanisms to prevent local failures from becoming system-wide failures.",
        layers: [
          {
            boxes: ["Traffic Control", "Rate Limiting", "Load Shedding"],
          },
          {
            boxes: ["Timeout", "Retry + Backoff", "Circuit Breaker"],
          },
          {
            boxes: ["Bulkhead", "Graceful Degradation", "Redundancy"],
          },
        ],
      },

      {
        title: "20. Observe Reliability",
        caption:
          "A system cannot be reliably operated without visibility into failures and system behavior.",
        layers: [
          {
            boxes: ["Metrics", "Logs", "Traces"],
          },
          {
            boxes: ["Error Rate", "Latency", "Throughput", "Availability"],
          },
          {
            boxes: ["Alerts", "Incident Detection", "Root Cause Analysis"],
          },
        ],
      },

      {
        title: "21. Recover and Learn",
        caption:
          "Recovery is followed by analysis, prevention and continuous improvement.",
        layers: [
          {
            boxes: ["Detect Failure", "Recover", "Restore Service"],
          },
          {
            boxes: ["Incident Analysis", "Root Cause", "Corrective Action"],
          },
          {
            boxes: ["Improve Architecture", "Improve Monitoring", "Test Again"],
          },
        ],
      },

      {
        title: "22. Complete Reliability Loop",
        caption:
          "The complete reliability mindset: identify → detect → isolate → protect → recover → learn → prevent.",
        layers: [
          {
            boxes: ["IDENTIFY", "What Can Fail?"],
          },
          {
            boxes: ["DETECT", "Is Something Failing?"],
          },
          {
            boxes: ["ISOLATE", "Contain the Failure"],
          },
          {
            boxes: ["PROTECT", "Prevent Cascading Failure"],
          },
          {
            boxes: ["RECOVER", "Restore Service"],
          },
          {
            boxes: ["LEARN", "Analyze the Failure"],
          },
          {
            boxes: ["PREVENT", "Improve the System"],
          },
        ],
      },
    ],
  },
  "database-replication": {
    topicId: "database-replication",
    type: "stage-flow",

    summary:
      "Database replication maintains additional copies of database state across separate database instances to improve availability, read scalability, and failover capability.",

    stages: [
      {
        title: "Basic Database Replication",
        caption:
          "The primary handles writes and continuously replicates changes to one or more replicas.",

        layers: [
          { boxes: ["Application"] },
          { boxes: ["Primary Database"] },
          { boxes: ["Replication"] },
          { boxes: ["Replica 1", "Replica 2"] },
        ],
      },

      {
        title: "Primary → Replica Flow",
        caption:
          "A write is processed by the primary, recorded through the replication mechanism, and applied by replicas.",

        layers: [
          { boxes: ["Client → Write Request"] },
          { boxes: ["Primary Database"] },
          { boxes: ["Replication Log / Stream"] },
          { boxes: ["Replica 1", "Replica 2"] },
        ],
      },

      {
        title: "Synchronous Replication",
        caption:
          "The write acknowledgement depends on the configured replica acknowledgement semantics.",

        layers: [
          { boxes: ["Client → Write"] },
          { boxes: ["Primary Database"] },
          { boxes: ["Replica → Confirm / Acknowledge"] },
          { boxes: ["Write Acknowledged"] },
        ],
      },

      {
        title: "Asynchronous Replication",
        caption:
          "The primary can acknowledge the write before replicas have caught up.",

        layers: [
          { boxes: ["Client → Write"] },
          { boxes: ["Primary Database → Acknowledge"] },
          { boxes: ["Replication continues"] },
          { boxes: ["Replica → Applies Later"] },
        ],
      },

      {
        title: "Replication Lag",
        caption:
          "The replica may temporarily be behind the primary, causing stale reads.",

        layers: [
          { boxes: ["Primary: Order = CONFIRMED"] },
          { boxes: ["Replication Lag"] },
          { boxes: ["Replica: Order = PROCESSING"] },
          { boxes: ["Read → Stale Result"] },
        ],
      },

      {
        title: "Read-After-Write Consistency",
        caption:
          "A write goes to the primary, but a following read from a lagging replica may not immediately see it.",

        layers: [
          { boxes: ["Client → UPDATE Profile"] },
          { boxes: ["Primary → Write Successful"] },
          { boxes: ["Client → GET Profile"] },
          { boxes: ["Lagging Replica → Old Data"] },
        ],
      },

      {
        title: "Read Routing",
        caption:
          "Reads can be distributed across replicas when their consistency and freshness are acceptable.",

        layers: [
          { boxes: ["Application"] },
          { boxes: ["Write → Primary"] },
          { boxes: ["Read → Replica 1", "Read → Replica 2"] },
          { boxes: ["Replica Read Capacity"] },
        ],
      },

      {
        title: "Primary Failure + Failover",
        caption:
          "When the primary fails, a suitable healthy replica can be promoted and write traffic redirected.",

        layers: [
          { boxes: ["Primary Database ❌"] },
          { boxes: ["Failure Detection"] },
          { boxes: ["Select Healthy Replica"] },
          { boxes: ["Promote Replica → New Primary"] },
          { boxes: ["Redirect Application Writes"] },
        ],
      },

      {
        title: "Asynchronous Failover Data-Loss Window",
        caption:
          "If the primary fails before recent writes reach the replica, those writes may not be available after failover.",

        layers: [
          {
            boxes: ["Primary: Write A", "Primary: Write B", "Primary: Write C"],
          },
          { boxes: ["Replication Lag"] },
          { boxes: ["Replica: A ✓", "Replica: B ✓", "Replica: C ❌"] },
          { boxes: ["Primary Failure"] },
          { boxes: ["Possible Loss of Recent Write C"] },
        ],
      },

      {
        title: "Replication vs Sharding",
        caption:
          "Replication creates copies; sharding partitions the dataset across nodes.",

        layers: [
          { boxes: ["Replication"] },
          { boxes: ["DB Copy A", "DB Copy A"] },
          { boxes: ["Sharding"] },
          { boxes: ["Shard 1", "Shard 2", "Shard 3"] },
        ],
      },

      {
        title: "Replication + Sharding",
        caption:
          "Large systems can combine sharding for scale with replication for redundancy.",

        layers: [
          { boxes: ["Application"] },
          { boxes: ["Shard 1", "Shard 2", "Shard 3"] },
          { boxes: ["Shard 1 Primary + Replicas"] },
          { boxes: ["Shard 2 Primary + Replicas"] },
          { boxes: ["Shard 3 Primary + Replicas"] },
        ],
      },

      {
        title: "Replication vs Backup",
        caption:
          "Replication provides current copies for availability; backups provide historical recovery.",

        layers: [
          { boxes: ["Production Database"] },
          { boxes: ["Replication → Current Replica"] },
          { boxes: ["Backup → Historical Recovery Point"] },
          { boxes: ["Point-in-Time Recovery"] },
        ],
      },

      {
        title: "RPO vs RTO",
        caption:
          "RPO determines acceptable data loss; RTO determines acceptable recovery time.",

        layers: [
          { boxes: ["Failure"] },
          { boxes: ["RPO → How much data can be lost?"] },
          { boxes: ["RTO → How quickly must service recover?"] },
          { boxes: ["Replication + Failover + Backup Strategy"] },
        ],
      },

      {
        title: "Multi-AZ Database Replication",
        caption:
          "Database redundancy is distributed across independent Availability Zones.",

        layers: [
          { boxes: ["Region"] },
          { boxes: ["AZ-1: Primary Database"] },
          { boxes: ["Replication"] },
          { boxes: ["AZ-2: Standby / Replica"] },
          { boxes: ["AZ-3: Additional Replica"] },
        ],
      },

      {
        title: "Multi-Region Replication",
        caption:
          "Database copies can be distributed across geographic Regions for regional resilience.",

        layers: [
          { boxes: ["Region A: Primary"] },
          { boxes: ["Cross-Region Replication"] },
          { boxes: ["Region B: Replica"] },
          { boxes: ["Region C: Replica / DR"] },
        ],
      },

      {
        title: "Single-Primary vs Multi-Primary",
        caption:
          "Single-primary has one write authority; multi-primary allows multiple write locations with greater coordination complexity.",

        layers: [
          { boxes: ["Single-Primary"] },
          { boxes: ["Primary → Writes"] },
          { boxes: ["Replicas → Reads / Standby"] },

          { boxes: ["Multi-Primary"] },
          { boxes: ["Primary A ↔ Primary B ↔ Primary C"] },
        ],
      },

      {
        title: "Database Replication + Cache",
        caption:
          "Caching and replication solve different problems and can work together.",

        layers: [
          { boxes: ["Application"] },
          { boxes: ["Redis Cache"] },
          { boxes: ["Cache Miss"] },
          { boxes: ["Primary + Read Replicas"] },
        ],
      },

      {
        title: "Read-Heavy Architecture",
        caption:
          "Read replicas distribute database read traffic while the primary continues handling writes.",

        layers: [
          { boxes: ["Clients"] },
          { boxes: ["Load Balancer / Application"] },
          { boxes: ["Writes → Primary"] },
          {
            boxes: [
              "Reads → Replica 1",
              "Reads → Replica 2",
              "Reads → Replica 3",
            ],
          },
        ],
      },

      {
        title: "Reporting Replica",
        caption:
          "Heavy reporting workloads can be isolated from the transactional primary.",

        layers: [
          { boxes: ["Application"] },
          { boxes: ["Primary DB → OLTP"] },
          { boxes: ["Replication"] },
          { boxes: ["Reporting Replica → Analytics Queries"] },
        ],
      },

      {
        title: "Complete Database Replication Architecture",
        caption:
          "A production-oriented architecture combining application scaling, caching, replication, and failover.",

        layers: [
          { boxes: ["Users"] },
          { boxes: ["Load Balancer"] },
          { boxes: ["Stateless Spring Boot Instances"] },
          { boxes: ["Redis Cache"] },
          { boxes: ["Primary Database"] },
          { boxes: ["Replication"] },
          { boxes: ["Read Replica 1", "Read Replica 2"] },
          { boxes: ["Backup / Point-in-Time Recovery"] },
        ],
      },
    ],
  },
  "database-sharding": {
  topicId: "database-sharding",
  type: "stage-flow",
  summary:
    "Database sharding distributes a large logical dataset across multiple database shards using a shard key, while routing, query locality, hotspot handling, replication, failure recovery, and rebalancing determine whether the architecture remains scalable and reliable.",

  stages: [
    {
      title: "1. Identify the Database Bottleneck",
      caption: "Sharding should solve a real database scaling problem.",
      layers: [
        {
          boxes: [
            "Single Database",
            "CPU / Memory Limit",
            "Storage Limit",
            "Write Throughput Limit",
            "Connection Limit",
            "Latency / Load Bottleneck"
          ]
        },
        {
          boxes: [
            "Measure Workload",
            "Identify Bottleneck",
            "Optimize First"
          ]
        }
      ]
    },

    {
      title: "2. Try Simpler Scaling First",
      caption: "Sharding is powerful but adds significant complexity.",
      layers: [
        {
          boxes: [
            "Query Optimization",
            "Indexes",
            "Vertical Scaling"
          ]
        },
        {
          boxes: [
            "Caching",
            "Read Replicas",
            "Connection Pool Tuning"
          ]
        },
        {
          boxes: [
            "Still Limited?",
            "Consider Sharding"
          ]
        }
      ]
    },

    {
      title: "3. Choose the Shard Key",
      caption: "The shard key determines where each record lives.",
      layers: [
        {
          boxes: [
            "User ID",
            "Tenant ID",
            "Order ID",
            "Region ID"
          ]
        },
        {
          boxes: [
            "High Cardinality",
            "Even Distribution",
            "Stable Value",
            "Query Locality",
            "Low Hotspot Risk"
          ]
        },
        {
          boxes: [
            "Shard Key",
            "→",
            "Shard Ownership"
          ]
        }
      ]
    },

    {
      title: "4. Choose the Sharding Strategy",
      caption: "Different strategies optimize different workloads.",
      layers: [
        {
          boxes: [
            "Range Sharding",
            "Hash Sharding",
            "Consistent Hashing",
            "Directory Sharding"
          ]
        },
        {
          boxes: [
            "Range → Query Locality",
            "Hash → Distribution",
            "Consistent Hash → Limited Remapping",
            "Directory → Flexible Mapping"
          ]
        }
      ]
    },

    {
      title: "5. Shard Router",
      caption: "The router determines which database owns the requested key.",
      layers: [
        {
          boxes: [
            "Client Request",
            "Application",
            "Shard Router"
          ]
        },
        {
          boxes: [
            "Extract Shard Key",
            "Calculate / Lookup Shard",
            "Route Request"
          ]
        },
        {
          boxes: [
            "Shard 1",
            "Shard 2",
            "Shard 3",
            "Shard N"
          ]
        }
      ]
    },

    {
      title: "6. Targeted Query",
      caption: "A good shard key allows the request to reach one shard.",
      layers: [
        {
          boxes: [
            "Query + Shard Key"
          ]
        },
        {
          boxes: [
            "Shard Router"
          ]
        },
        {
          boxes: [
            "Target Shard"
          ]
        },
        {
          boxes: [
            "Fast",
            "Low Fan-Out",
            "Efficient"
          ]
        }
      ]
    },

    {
      title: "7. Scatter-Gather Query",
      caption: "Queries without a usable shard key may need to contact many shards.",
      layers: [
        {
          boxes: [
            "Query Without Shard Key"
          ]
        },
        {
          boxes: [
            "Shard Router"
          ]
        },
        {
          boxes: [
            "Shard 1",
            "Shard 2",
            "Shard 3",
            "Shard N"
          ]
        },
        {
          boxes: [
            "Gather Results",
            "Merge / Aggregate"
          ]
        },
        {
          boxes: [
            "More Network Traffic",
            "Higher Fan-Out",
            "Higher Tail Latency"
          ]
        }
      ]
    },

    {
      title: "8. Cross-Shard Joins & Transactions",
      caption: "Distributed data makes relational operations harder.",
      layers: [
        {
          boxes: [
            "Cross-Shard Join",
            "Cross-Shard Transaction"
          ]
        },
        {
          boxes: [
            "Network Coordination",
            "Distributed Commit",
            "Failure Handling"
          ]
        },
        {
          boxes: [
            "Prefer Data Co-Location",
            "Denormalization",
            "Application-Level Coordination"
          ]
        }
      ]
    },

    {
      title: "9. Data Co-Location",
      caption: "Related data should ideally live on the same shard.",
      layers: [
        {
          boxes: [
            "Customer",
            "Orders",
            "Payments"
          ]
        },
        {
          boxes: [
            "Same Tenant / Customer Key"
          ]
        },
        {
          boxes: [
            "Same Shard",
            "→",
            "Simpler Queries",
            "Fewer Cross-Shard Operations"
          ]
        }
      ]
    },

    {
      title: "10. Hot Shard & Hot Key",
      caption: "Evenly distributed shards can still suffer from concentrated traffic.",
      layers: [
        {
          boxes: [
            "Uneven Data Distribution",
            "Uneven Traffic Distribution"
          ]
        },
        {
          boxes: [
            "Hot Shard"
          ]
        },
        {
          boxes: [
            "Hot Key",
            "Single Popular User",
            "Popular Product",
            "Popular Resource"
          ]
        },
        {
          boxes: [
            "Cache",
            "Replication",
            "Key Splitting",
            "Better Shard Key",
            "Rebalancing"
          ]
        }
      ]
    },

    {
      title: "11. Consistent Hashing + Virtual Nodes",
      caption: "Consistent hashing reduces large-scale remapping when shard membership changes.",
      layers: [
        {
          boxes: [
            "Hash Ring"
          ]
        },
        {
          boxes: [
            "Shard 1",
            "Shard 2",
            "Shard 3",
            "Shard 4"
          ]
        },
        {
          boxes: [
            "Key → Hash Position"
          ]
        },
        {
          boxes: [
            "Next Shard Clockwise"
          ]
        },
        {
          boxes: [
            "Virtual Nodes",
            "Better Distribution",
            "Smoother Rebalancing"
          ]
        }
      ]
    },

    {
      title: "12. Sharding + Replication",
      caption: "Sharding provides partitioning; replication provides redundancy.",
      layers: [
        {
          boxes: [
            "Logical Database"
          ]
        },
        {
          boxes: [
            "Shard 1",
            "Shard 2",
            "Shard 3"
          ]
        },
        {
          boxes: [
            "Primary + Replica",
            "Primary + Replica",
            "Primary + Replica"
          ]
        },
        {
          boxes: [
            "Scale Storage / Writes",
            "Improve Availability",
            "Read Scaling"
          ]
        }
      ]
    },

    {
      title: "13. Shard Failure",
      caption: "A failed shard should not unnecessarily bring down the entire system.",
      layers: [
        {
          boxes: [
            "Shard Failure"
          ]
        },
        {
          boxes: [
            "Detect Failure",
            "Health Check",
            "Failover"
          ]
        },
        {
          boxes: [
            "Promote Replica",
            "Restore Service",
            "Recover Failed Shard"
          ]
        },
        {
          boxes: [
            "Replication",
            "Backups",
            "Monitoring"
          ]
        }
      ]
    },

    {
      title: "14. Rebalancing",
      caption: "As data grows, shard distribution may become uneven.",
      layers: [
        {
          boxes: [
            "Shard 1",
            "Shard 2",
            "Shard 3"
          ]
        },
        {
          boxes: [
            "Uneven Data",
            "Uneven Traffic",
            "Storage Growth"
          ]
        },
        {
          boxes: [
            "Move Data",
            "Redistribute Keys",
            "Balance Shards"
          ]
        },
        {
          boxes: [
            "Minimize Downtime",
            "Control Migration Load",
            "Verify Data"
          ]
        }
      ]
    },

    {
      title: "15. Adding a New Shard",
      caption: "New capacity requires controlled data redistribution.",
      layers: [
        {
          boxes: [
            "Existing Shards"
          ]
        },
        {
          boxes: [
            "Add New Shard"
          ]
        },
        {
          boxes: [
            "Update Routing",
            "Move Selected Data"
          ]
        },
        {
          boxes: [
            "Verify Distribution",
            "Monitor Load"
          ]
        },
        {
          boxes: [
            "Balanced Shard Cluster"
          ]
        }
      ]
    },

    {
      title: "16. Tenant-Based Sharding",
      caption: "Tenant ID can provide strong locality for multi-tenant systems.",
      layers: [
        {
          boxes: [
            "Tenant A",
            "Tenant B",
            "Tenant C"
          ]
        },
        {
          boxes: [
            "Tenant ID → Shard"
          ]
        },
        {
          boxes: [
            "Tenant A → Shard 1",
            "Tenant B → Shard 2",
            "Tenant C → Shard 3"
          ]
        },
        {
          boxes: [
            "Data Locality",
            "Tenant Isolation",
            "Simpler Queries"
          ]
        },
        {
          boxes: [
            "Large Tenant → Potential Hotspot"
          ]
        }
      ]
    },

    {
      title: "17. Monitor Every Shard",
      caption: "Sharding requires per-shard visibility.",
      layers: [
        {
          boxes: [
            "CPU",
            "Memory",
            "Storage",
            "Connections"
          ]
        },
        {
          boxes: [
            "Latency",
            "Throughput",
            "Errors",
            "Query Load"
          ]
        },
        {
          boxes: [
            "Data Distribution",
            "Hot Shards",
            "Replication Lag",
            "Cross-Shard Queries"
          ]
        },
        {
          boxes: [
            "Alert",
            "Investigate",
            "Rebalance"
          ]
        }
      ]
    },

    {
      title: "18. Complete Database Sharding Architecture",
      caption: "A production-ready design combines routing, partitioning, replication, caching, monitoring, and failure handling.",
      layers: [
        {
          boxes: [
            "Client"
          ]
        },
        {
          boxes: [
            "Load Balancer",
            "Application Servers"
          ]
        },
        {
          boxes: [
            "Shard Router"
          ]
        },
        {
          boxes: [
            "Shard 1",
            "Shard 2",
            "Shard 3",
            "Shard N"
          ]
        },
        {
          boxes: [
            "Primary + Replica",
            "Primary + Replica",
            "Primary + Replica",
            "Primary + Replica"
          ]
        },
        {
          boxes: [
            "Cache",
            "Monitoring",
            "Backup",
            "Failover"
          ]
        },
        {
          boxes: [
            "Scalable",
            "Available",
            "Observable",
            "Rebalanceable"
          ]
        }
      ]
    },

    {
      title: "19. Final Sharding Decision",
      caption: "Use sharding when simpler scaling approaches are insufficient and database capacity remains the bottleneck.",
      layers: [
        {
          boxes: [
            "Is Database the Bottleneck?"
          ]
        },
        {
          boxes: [
            "Optimize?",
            "Vertical Scale?",
            "Cache?",
            "Read Replicas?"
          ]
        },
        {
          boxes: [
            "Still Limited?"
          ]
        },
        {
          boxes: [
            "Choose Shard Key"
          ]
        },
        {
          boxes: [
            "Choose Strategy"
          ]
        },
        {
          boxes: [
            "Design Routing",
            "Query Locality",
            "Hotspot Handling"
          ]
        },
        {
          boxes: [
            "Replication",
            "Failure Handling",
            "Rebalancing",
            "Monitoring"
          ]
        },
        {
          boxes: [
            "Production-Ready Sharded Database"
          ]
        }
      ]
    }
  ]
},
"cap-theorem": {
  topicId: "cap-theorem",
  type: "stage-flow",
  summary:
    "CAP Theorem explains the trade-off a distributed system faces when a network partition occurs: it cannot simultaneously guarantee strong consistency and availability while also tolerating that partition.",

  stages: [
    {
      title: "1. Distributed System Before Partition",
      caption:
        "Multiple nodes communicate over a network and maintain distributed data.",
      layers: [
        {
          boxes: ["Client"],
        },
        {
          boxes: ["Node A", "Node B", "Node C"],
        },
        {
          boxes: ["Network"],
        },
      ],
    },

    {
      title: "2. The Three CAP Properties",
      caption:
        "CAP describes three properties: Consistency, Availability, and Partition Tolerance.",
      layers: [
        {
          boxes: [
            "Consistency (C)",
            "Availability (A)",
            "Partition Tolerance (P)",
          ],
        },
        {
          boxes: [
            "Same logical view of data",
            "Every request receives a response",
            "System continues despite network partition",
          ],
        },
      ],
    },

    {
      title: "3. Network Partition Occurs",
      caption:
        "The critical CAP scenario occurs when nodes can no longer reliably communicate with each other.",
      layers: [
        {
          boxes: ["Node A", "Node B"],
        },
        {
          boxes: ["❌ Network Partition"],
        },
        {
          boxes: ["Node C", "Node D"],
        },
      ],
    },

    {
      title: "4. Partition Forces a Choice",
      caption:
        "During a partition, the system must decide whether to reject some operations to preserve consistency or continue serving requests while allowing divergent state.",
      layers: [
        {
          boxes: ["Network Partition"],
        },
        {
          boxes: [
            "Preserve Consistency → Reject / delay some requests",
            "Preserve Availability → Continue responding",
          ],
        },
        {
          boxes: [
            "CP Behavior",
            "AP Behavior",
          ],
        },
      ],
    },

    {
      title: "5. CP System",
      caption:
        "A CP-oriented system preserves consistency during a partition by sacrificing availability for some operations.",
      layers: [
        {
          boxes: ["Client"],
        },
        {
          boxes: ["Node A", "Node B"],
        },
        {
          boxes: ["❌ Network Partition"],
        },
        {
          boxes: ["Node C", "Node D"],
        },
        {
          boxes: [
            "Consistency Preserved",
            "Some Requests Rejected / Delayed",
          ],
        },
      ],
    },

    {
      title: "6. AP System",
      caption:
        "An AP-oriented system continues accepting requests during a partition, accepting that different nodes may temporarily have different views of data.",
      layers: [
        {
          boxes: ["Client"],
        },
        {
          boxes: ["Node A", "Node B"],
        },
        {
          boxes: ["❌ Network Partition"],
        },
        {
          boxes: ["Node C", "Node D"],
        },
        {
          boxes: [
            "Requests Continue",
            "Temporary Data Divergence",
          ],
        },
      ],
    },

    {
      title: "7. CAP Is About Behavior During Partition",
      caption:
        "The key interview point is that the trade-off matters when a partition occurs, not simply during normal operation.",
      layers: [
        {
          boxes: [
            "Normal Operation",
            "Nodes Communicate",
            "CAP Trade-off Not Forced",
          ],
        },
        {
          boxes: [
            "Network Partition",
            "Communication Breaks",
          ],
        },
        {
          boxes: [
            "Consistency Priority → CP",
            "Availability Priority → AP",
          ],
        },
      ],
    },

    {
      title: "8. CAP vs ACID Consistency",
      caption:
        "CAP consistency and ACID consistency are related to data correctness but describe different concepts.",
      layers: [
        {
          boxes: ["CAP Consistency (Distributed-system consistency)"],
        },
        {
          boxes: ["ACID Consistency (Database transaction invariants)"],
        },
        {
          boxes: [
            "Do Not Treat Them as the Same Concept",
          ],
        },
      ],
    },

    {
      title: "9. CAP vs Eventual Consistency",
      caption:
        "Eventual consistency is one possible consistency model; it is not synonymous with AP.",
      layers: [
        {
          boxes: ["CAP Theorem"],
        },
        {
          boxes: [
            "Consistency",
            "Availability",
            "Partition Tolerance",
          ],
        },
        {
          boxes: [
            "Eventual Consistency",
            "One Possible Consistency Model",
          ],
        },
      ],
    },

    {
      title: "10. CAP Decision Framework",
      caption:
        "Start with the failure assumption, then decide which behavior is required during a partition.",
      layers: [
        {
          boxes: ["Can a Network Partition Occur?"],
        },
        {
          boxes: ["Yes → Partition Tolerance Matters"],
        },
        {
          boxes: ["What Must Happen During Partition?"],
        },
        {
          boxes: [
            "Correct / Consistent Result Required → CP",
            "Request Must Continue → AP",
          ],
        },
      ],
    },

    {
      title: "11. Real-World Examples",
      caption:
        "Different systems make different consistency and availability trade-offs depending on business requirements.",
      layers: [
        {
          boxes: [
            "Banking / Payment State",
            "Strong Correctness Requirement",
          ],
        },
        {
          boxes: [
            "Social Feed",
            "Availability + Low Latency",
          ],
        },
        {
          boxes: [
            "Inventory / Booking",
            "Consistency Often Critical",
          ],
        },
      ],
    },

    {
      title: "12. CAP Mental Model",
      caption:
        "The interview-ready mental model is simple: assume partitions can happen, then explain the required behavior.",
      layers: [
        {
          boxes: ["Distributed System"],
        },
        {
          boxes: ["Network Partition"],
        },
        {
          boxes: ["Choose Required Behavior"],
        },
        {
          boxes: [
            "Consistency Priority",
            "Availability Priority",
          ],
        },
        {
          boxes: [
            "CP",
            "AP",
          ],
        },
      ],
    },
  ],
},
"eventual-consistency": {
  topicId: "eventual-consistency",
  type: "stage-flow",
  summary:
    "Eventual consistency allows replicas to temporarily diverge while updates propagate asynchronously, with the expectation that replicas eventually converge.",

  stages: [
    {
      title: "1. Strong vs Eventual Consistency",
      caption:
        "The fundamental difference is whether temporary stale reads are allowed.",
      layers: [
        {
          boxes: [
            "Strong Consistency → Latest value according to guarantee",
            "Eventual Consistency → Temporary stale value allowed",
          ],
        },
        {
          boxes: [
            "Strong → More coordination",
            "Eventual → Less immediate coordination",
          ],
        },
      ],
    },

    {
      title: "2. Write Reaches Primary",
      caption:
        "The authoritative write path accepts the new value.",
      layers: [
        {
          boxes: ["Client", "Write Request"],
        },
        {
          boxes: ["Primary / Leader"],
        },
        {
          boxes: ["NEW VALUE → Rohit"],
        },
      ],
    },

    {
      title: "3. Replicas Have Not Caught Up",
      caption:
        "Asynchronous propagation creates a temporary period where replicas can contain older data.",
      layers: [
        {
          boxes: ["Primary → Rohit"],
        },
        {
          boxes: [
            "Replica A → Rohit",
            "Replica B → Rahul",
            "Replica C → Rahul",
          ],
        },
        {
          boxes: ["Replication Lag"],
        },
      ],
    },

    {
      title: "4. Stale Read",
      caption:
        "A request routed to a lagging replica can temporarily return an older valid value.",
      layers: [
        {
          boxes: ["User"],
        },
        {
          boxes: ["Load Balancer / Read Router"],
        },
        {
          boxes: ["Replica B"],
        },
        {
          boxes: ["OLD VALUE → Rahul"],
        },
      ],
    },

    {
      title: "5. Asynchronous Propagation",
      caption:
        "The new value is propagated to replicas without requiring every replica to be immediately synchronized.",
      layers: [
        {
          boxes: ["Primary → Rohit"],
        },
        {
          boxes: ["Async Replication"],
        },
        {
          boxes: [
            "Replica A → Update",
            "Replica B → Update",
            "Replica C → Update",
          ],
        },
      ],
    },

    {
      title: "6. Replicas Converge",
      caption:
        "Once replication catches up, the replicas represent the same logical state.",
      layers: [
        {
          boxes: ["Primary → Rohit"],
        },
        {
          boxes: [
            "Replica A → Rohit",
            "Replica B → Rohit",
            "Replica C → Rohit",
          ],
        },
        {
          boxes: ["CONVERGENCE"],
        },
      ],
    },

    {
      title: "7. Read-After-Write Problem",
      caption:
        "A user can write to the primary and immediately read from a stale replica.",
      layers: [
        {
          boxes: ["WRITE → Primary → Rohit"],
        },
        {
          boxes: ["READ → Lagging Replica → Rahul"],
        },
        {
          boxes: ["Problem → User sees old value"],
        },
      ],
    },

    {
      title: "8. Read-After-Write Solutions",
      caption:
        "Critical user workflows can use stronger guarantees without making every read globally strong.",
      layers: [
        {
          boxes: [
            "Read From Primary",
            "Session-Aware Routing",
            "Version-Aware Routing",
          ],
        },
        {
          boxes: [
            "Track Required Version",
            "Use Stronger Consistency",
          ],
        },
      ],
    },

    {
      title: "9. Read Your Writes + Monotonic Reads",
      caption:
        "Useful consistency guarantees can provide a more predictable user experience.",
      layers: [
        {
          boxes: [
            "Read Your Writes → See your successful update",
            "Monotonic Reads → Never move backward to an older version",
          ],
        },
        {
          boxes: [
            "Write → Version 10",
            "Read → Version 10",
            "Next Read → Version 10 or newer",
          ],
        },
      ],
    },

    {
      title: "10. Concurrent Writes Create Conflicts",
      caption:
        "Multiple replicas accepting writes independently can temporarily produce conflicting states.",
      layers: [
        {
          boxes: ["Replica A → Address = Pune"],
        },
        {
          boxes: ["Replica B → Address = Mumbai"],
        },
        {
          boxes: ["Conflict → Divergent State"],
        },
      ],
    },

    {
      title: "11. Conflict Resolution",
      caption:
        "The system needs a defined way to reconcile concurrent updates.",
      layers: [
        {
          boxes: [
            "Version Numbers",
            "Last Write Wins",
            "Application-Level Merge",
            "CRDTs",
          ],
        },
        {
          boxes: ["Resolve Conflict → Final Logical State"],
        },
      ],
    },

    {
      title: "12. Multi-Region Eventual Consistency",
      caption:
        "Geographically distributed replicas can reduce latency while allowing temporary regional divergence.",
      layers: [
        {
          boxes: ["Users"],
        },
        {
          boxes: ["Region A", "Region B", "Region C"],
        },
        {
          boxes: [
            "Local Database A",
            "Local Database B",
            "Local Database C",
          ],
        },
        {
          boxes: ["Asynchronous Cross-Region Replication"],
        },
      ],
    },

    {
      title: "13. Search Index Example",
      caption:
        "The source database and derived search index may temporarily contain different information.",
      layers: [
        {
          boxes: ["Product Created"],
        },
        {
          boxes: ["Database → Product Exists"],
        },
        {
          boxes: ["Event / Async Pipeline"],
        },
        {
          boxes: ["Search Index → Not Yet Updated"],
        },
        {
          boxes: ["Eventually → Product Appears in Search"],
        },
      ],
    },

    {
      title: "14. Cache Staleness",
      caption:
        "A cache may temporarily contain an older representation of the source data.",
      layers: [
        {
          boxes: ["Database → Price = ₹120"],
        },
        {
          boxes: ["Cache → Price = ₹100"],
        },
        {
          boxes: ["TTL / Invalidation / Refresh"],
        },
        {
          boxes: ["Cache → Price = ₹120"],
        },
      ],
    },

    {
      title: "15. Hybrid Consistency",
      caption:
        "Real systems can choose different consistency guarantees for different components.",
      layers: [
        {
          boxes: [
            "Payment → Stronger Consistency",
            "Inventory Reservation → Stronger Consistency",
          ],
        },
        {
          boxes: [
            "Search → Eventual Consistency",
            "Analytics → Eventual Consistency",
            "Recommendations → Eventual Consistency",
          ],
        },
      ],
    },

    {
      title: "16. When Eventual Consistency Fits",
      caption:
        "Use it when temporary staleness is acceptable and scalability or latency benefits matter.",
      layers: [
        {
          boxes: [
            "Search",
            "Analytics",
            "Recommendations",
            "Social Feeds",
            "Counters",
          ],
        },
        {
          boxes: [
            "Temporary Staleness Acceptable",
            "Low Latency Important",
            "Distributed / Multi-Region",
          ],
        },
      ],
    },

    {
      title: "17. When Stronger Consistency Is Needed",
      caption:
        "Critical business state may require stronger correctness guarantees.",
      layers: [
        {
          boxes: [
            "Payment State",
            "Authoritative Balance",
            "Inventory Reservation",
            "Critical Security State",
          ],
        },
        {
          boxes: [
            "Stronger Consistency",
            "Concurrency Control",
            "Idempotency",
          ],
        },
      ],
    },

    {
      title: "18. Eventual Consistency Mental Model",
      caption:
        "The complete flow to remember for interviews.",
      layers: [
        {
          boxes: ["WRITE"],
        },
        {
          boxes: ["Primary / Authoritative State"],
        },
        {
          boxes: ["Temporary Divergence"],
        },
        {
          boxes: ["Replication / Propagation"],
        },
        {
          boxes: ["Possible Stale Reads"],
        },
        {
          boxes: ["Conflict Resolution if Required"],
        },
        {
          boxes: ["CONVERGENCE"],
        },
      ],
    },

    {
      title: "19. Final Decision Framework",
      caption:
        "Choose consistency based on the business requirement, not simply the technology.",
      layers: [
        {
          boxes: ["Can Stale Data Be Tolerated?"],
        },
        {
          boxes: [
            "YES → Eventual Consistency May Fit",
            "NO → Stronger Guarantee Required",
          ],
        },
        {
          boxes: [
            "How Much Staleness Is Acceptable?",
            "What Happens During Partition?",
            "Can Conflicts Be Resolved?",
            "What Does Each Operation Require?",
          ],
        },
      ],
    },
  ],
},
//
//
//
//
//
//

//
//
//
//
//
//
//

//

//
//


"loose-coupling-and-high-cohesion": {
  topicId: "loose-coupling-high-cohesion",
  type: "stage-flow",
  summary:
    "Design focused classes with related responsibilities, then connect them through intentional and stable dependencies.",

  stages: [
    {
      title: "1. Understand the Two Dimensions",
      caption:
        "Evaluate the internal focus of a class and its external dependencies separately.",
      layers: [
        {
          boxes: [
            "COHESION — Inside a class",
            "Are its responsibilities related?",
            "COUPLING — Between classes",
            "How much does each class depend on others?"
          ]
        }
      ]
    },
    {
      title: "2. Identify Low Cohesion",
      caption:
        "One class is responsible for unrelated business and technical tasks.",
      layers: [
        {
          boxes: [
            "OrderService",
            "Validate orders",
            "Calculate totals",
            "Process payments",
            "Send emails",
            "Generate reports"
          ]
        }
      ]
    },
    {
      title: "3. Group Related Responsibilities",
      caption:
        "Extract meaningful responsibilities into focused components.",
      layers: [
        {
          boxes: [
            "OrderService — Order business rules",
            "PaymentService — Payment processing",
            "NotificationService — Message delivery",
            "ReportService — Report generation"
          ]
        }
      ]
    },
    {
      title: "4. Identify Tight Coupling",
      caption:
        "A consumer creates and directly relies on a particular implementation.",
      layers: [
        {
          boxes: [
            "OrderService",
            "new StripePaymentGateway()",
            "Stripe-specific operations",
            "Provider change may require consumer changes"
          ]
        }
      ]
    },
    {
      title: "5. Introduce a Meaningful Contract",
      caption:
        "Define the operations the consumer needs without exposing provider details.",
      layers: [
        {
          boxes: [
            "PaymentGateway — Interface",
            "authorizePayment()",
            "capturePayment()",
            "refundPayment()"
          ]
        }
      ]
    },
    {
      title: "6. Provide Implementations",
      caption:
        "Different providers implement the contract while the consumer uses the same abstraction.",
      layers: [
        {
          boxes: [
            "PaymentGateway",
            "StripePaymentGateway",
            "RazorpayPaymentGateway",
            "Alternative compatible implementation"
          ]
        }
      ]
    },
    {
      title: "7. Inject the Dependency",
      caption:
        "Supply the required collaborator instead of constructing it inside the business class.",
      layers: [
        {
          boxes: [
            "Application configuration / Spring container",
            "Provides PaymentGateway implementation",
            "OrderService receives PaymentGateway",
            "OrderService invokes the contract"
          ]
        }
      ]
    },
    {
      title: "8. Test Responsibilities Independently",
      caption:
        "Focused classes and controlled collaborators make unit tests easier.",
      layers: [
        {
          boxes: [
            "OrderService unit test",
            "Fake or mock PaymentGateway",
            "Verify order behavior",
            "No real payment-provider call required"
          ]
        }
      ]
    },
    {
      title: "9. Apply SRP",
      caption:
        "Use a focused responsibility as a guide when deciding whether a class needs refactoring.",
      layers: [
        {
          boxes: [
            "One cohesive responsibility",
            "One primary reason to change",
            "Related data and operations together",
            "Not one method per class"
          ]
        }
      ]
    },
    {
      title: "10. Avoid Overengineering",
      caption:
        "Do not confuse the number of abstractions with design quality.",
      layers: [
        {
          boxes: [
            "Keep natural dependencies",
            "Add abstractions where they provide value",
            "Avoid unnecessary wrappers and factories",
            "Prefer clarity over needless indirection"
          ]
        }
      ]
    },
    {
      title: "11. Final Design Checklist",
      caption:
        "Evaluate both principles together before considering the design complete.",
      layers: [
        {
          boxes: [
            "Are class responsibilities cohesive?",
            "Are dependencies intentional?",
            "Can changing a provider remain localized?",
            "Can business logic be tested in isolation?",
            "Is the design simpler without unnecessary layers?"
          ]
        }
      ]
    }
  ]
},
"solid-principles": {
  topicId: "solid-principles",
  type: "stage-flow",

  summary:
    "SOLID is a set of five connected object-oriented design principles that help control responsibility, extension, substitution, interfaces, and dependency direction.",

  stages: [
    {
      title: "1. Why SOLID Exists",
      caption:
        "As software grows, unrelated responsibilities and tight dependencies make change increasingly risky.",

      layers: [
        {
          boxes: [
            "New Features",
            "Changing Requirements",
            "New Implementations",
            "Changing Integrations",
          ],
        },
        {
          boxes: [
            "Large Classes",
            "Tight Coupling",
            "Large Interfaces",
            "Fragile Inheritance",
          ],
        },
        {
          boxes: [
            "Harder Testing",
            "Higher Regression Risk",
            "Harder Maintenance",
          ],
        },
      ],
    },

    {
      title: "2. SOLID",
      caption:
        "Five principles address different problems in object-oriented design.",

      layers: [
        {
          boxes: [
            "S — Single Responsibility",
            "O — Open / Closed",
            "L — Liskov Substitution",
            "I — Interface Segregation",
            "D — Dependency Inversion",
          ],
        },
      ],
    },

    {
      title: "3. What Each Principle Solves",
      caption:
        "Think of SOLID as five design questions.",

      layers: [
        {
          boxes: [
            "SRP → Is responsibility focused?",
            "OCP → Can behavior be extended safely?",
            "LSP → Can implementations be substituted?",
            "ISP → Do clients depend only on what they need?",
            "DIP → Does business logic depend on abstractions?",
          ],
        },
      ],
    },

    {
      title: "4. SRP — Responsibility",
      caption:
        "Keep related behavior together and separate unrelated reasons to change.",

      layers: [
        {
          boxes: [
            "Business Logic",
            "Persistence",
            "Reporting",
            "Notifications",
          ],
        },
        {
          boxes: [
            "Focused Responsibilities",
            "Localized Changes",
            "Higher Cohesion",
          ],
        },
      ],
    },

    {
      title: "5. OCP — Extension",
      caption:
        "New variations should be added through appropriate extension points rather than repeatedly modifying stable logic.",

      layers: [
        {
          boxes: ["PaymentService"],
        },
        {
          boxes: ["PaymentProcessor"],
        },
        {
          boxes: [
            "Card",
            "UPI",
            "PayPal",
            "Future Payment Type",
          ],
        },
      ],
    },

    {
      title: "6. LSP — Substitution",
      caption:
        "Every subtype or implementation must preserve the behavioral expectations of its abstraction.",

      layers: [
        {
          boxes: ["Base Abstraction"],
        },
        {
          boxes: [
            "Implementation A",
            "Implementation B",
            "Implementation C",
          ],
        },
        {
          boxes: [
            "Same Contract",
            "Expected Behavior",
            "Safe Substitution",
          ],
        },
      ],
    },

    {
      title: "7. ISP — Focused Interfaces",
      caption:
        "Clients should not be forced to depend on operations they do not need.",

      layers: [
        {
          boxes: ["Large Interface"],
        },
        {
          boxes: [
            "Work",
            "Eat",
            "Sleep",
            "Other Unrelated Operations",
          ],
        },
        {
          boxes: [
            "Focused Client Interfaces",
            "Only Required Operations",
          ],
        },
      ],
    },

    {
      title: "8. DIP — Dependency Direction",
      caption:
        "High-level business logic should not be tightly coupled to low-level implementation details.",

      layers: [
        {
          boxes: ["OrderService"],
        },
        {
          boxes: ["OrderRepository"],
        },
        {
          boxes: [
            "MySQL Repository",
            "Mongo Repository",
            "Mock Repository",
          ],
        },
      ],
    },

    {
      title: "9. DIP vs Dependency Injection",
      caption:
        "DIP is the principle; Dependency Injection is a technique used to provide dependencies.",

      layers: [
        {
          boxes: ["DIP → Depend on Abstractions"],
        },
        {
          boxes: [
            "Dependency Injection",
            "Constructor Injection",
            "Spring Container",
          ],
        },
        {
          boxes: ["Concrete Implementation"],
        },
      ],
    },

    {
      title: "10. SOLID Working Together",
      caption:
        "The five principles reinforce each other rather than operating as isolated rules.",

      layers: [
        {
          boxes: [
            "SRP",
            "OCP",
            "LSP",
            "ISP",
            "DIP",
          ],
        },
        {
          boxes: [
            "High Cohesion",
            "Loose Coupling",
            "Extensibility",
            "Testability",
          ],
        },
      ],
    },

    {
      title: "11. SOLID in Java / Spring Boot",
      caption:
        "Java interfaces, polymorphism, composition, and Spring dependency injection commonly support SOLID-oriented designs.",

      layers: [
        {
          boxes: ["Controller"],
        },
        {
          boxes: ["Service"],
        },
        {
          boxes: ["Interface / Abstraction"],
        },
        {
          boxes: ["Concrete Implementation"],
        },
        {
          boxes: [
            "Constructor Injection",
            "Loose Coupling",
            "Testable Components",
          ],
        },
      ],
    },

    {
      title: "12. Avoid Overengineering",
      caption:
        "SOLID does not mean maximum abstraction or maximum number of classes.",

      layers: [
        {
          boxes: [
            "Real Design Problem",
            "Expected Variation",
            "Meaningful Boundary",
          ],
        },
        {
          boxes: [
            "Apply Appropriate Principle",
          ],
        },
        {
          boxes: [
            "Avoid Unnecessary Interfaces",
            "Avoid Unnecessary Indirection",
            "Keep Simple Things Simple",
          ],
        },
      ],
    },

    {
      title: "13. Final SOLID Mental Model",
      caption:
        "SOLID helps make change safer while keeping object-oriented design understandable.",

      layers: [
        {
          boxes: [
            "SRP → Responsibility",
            "OCP → Extension",
            "LSP → Substitution",
            "ISP → Interfaces",
            "DIP → Dependencies",
          ],
        },
        {
          boxes: [
            "High Cohesion",
            "Loose Coupling",
            "Maintainability",
            "Extensibility",
            "Testability",
          ],
        },
      ],
    },
  ],
},
"single-responsibility-principle": {
  topicId: "single-responsibility-principle",
  type: "stage-flow",

  summary:
    "SRP keeps a class focused on one cohesive responsibility and one primary reason to change, improving cohesion and localizing change.",

  stages: [
    {
      title: "1. The SRP Problem",
      caption:
        "A class becomes difficult to maintain when unrelated responsibilities accumulate inside it.",

      layers: [
        {
          boxes: [
            "Business Logic",
            "Database",
            "Email",
            "Reporting",
          ],
        },
        {
          boxes: [
            "One Large Class",
          ],
        },
        {
          boxes: [
            "Multiple Reasons to Change",
            "Higher Coupling",
            "Harder Testing",
          ],
        },
      ],
    },

    {
      title: "2. What SRP Means",
      caption:
        "The class should represent one cohesive responsibility and one primary reason to change.",

      layers: [
        {
          boxes: [
            "One Cohesive Responsibility",
          ],
        },
        {
          boxes: [
            "Related Behavior",
            "Related Data",
            "Related Rules",
          ],
        },
        {
          boxes: [
            "Focused Reason to Change",
          ],
        },
      ],
    },

    {
      title: "3. Responsibility",
      caption:
        "Responsibility is a meaningful area of behavior, not simply a single operation.",

      layers: [
        {
          boxes: [
            "Tax Calculation",
            "Order Persistence",
            "Notification",
            "Reporting",
          ],
        },
        {
          boxes: [
            "Different Concerns",
          ],
        },
      ],
    },

    {
      title: "4. Reason to Change",
      caption:
        "Ask whether different requirements could independently force the class to change.",

      layers: [
        {
          boxes: [
            "Tax Rules Change",
            "Email Format Changes",
            "Database Changes",
            "Report Format Changes",
          ],
        },
        {
          boxes: [
            "Independent Reasons to Change",
          ],
        },
        {
          boxes: [
            "Potential SRP Violation",
          ],
        },
      ],
    },

    {
      title: "5. Before SRP",
      caption:
        "Unrelated responsibilities are combined inside one component.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "Calculate Price",
            "Save Order",
            "Send Email",
            "Generate PDF",
          ],
        },
        {
          boxes: [
            "Pricing",
            "Persistence",
            "Notification",
            "Reporting",
          ],
        },
      ],
    },

    {
      title: "6. Apply SRP",
      caption:
        "Separate the concerns into meaningful cohesive components.",

      layers: [
        {
          boxes: [
            "OrderService",
            "PricingService",
            "OrderRepository",
            "NotificationService",
            "ReportService",
          ],
        },
        {
          boxes: [
            "Orchestration",
            "Pricing",
            "Persistence",
            "Notification",
            "Reporting",
          ],
        },
      ],
    },

    {
      title: "7. Keep the Workflow",
      caption:
        "Separating responsibilities does not mean losing the overall business workflow.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "PricingService",
            "InventoryService",
            "PaymentService",
            "NotificationService",
          ],
        },
        {
          boxes: [
            "Focused Components",
          ],
        },
      ],
    },

    {
      title: "8. High Cohesion",
      caption:
        "Related behavior stays together around a focused concern.",

      layers: [
        {
          boxes: [
            "TaxCalculator",
          ],
        },
        {
          boxes: [
            "Calculate Tax",
            "Calculate Regional Tax",
            "Calculate Tax Discount",
          ],
        },
        {
          boxes: [
            "One Tax-Related Responsibility",
          ],
        },
      ],
    },

    {
      title: "9. Low Cohesion",
      caption:
        "Unrelated behavior inside one class makes responsibility boundaries unclear.",

      layers: [
        {
          boxes: [
            "UserService",
          ],
        },
        {
          boxes: [
            "Validate User",
            "Save User",
            "Send Email",
            "Generate CSV",
            "Create Audit File",
          ],
        },
        {
          boxes: [
            "Multiple Unrelated Concerns",
          ],
        },
      ],
    },

    {
      title: "10. God Class",
      caption:
        "A God Class accumulates excessive behavior and knowledge.",

      layers: [
        {
          boxes: [
            "OrderManager",
          ],
        },
        {
          boxes: [
            "Pricing",
            "Inventory",
            "Payment",
            "Database",
            "Email",
            "PDF",
            "Logging",
          ],
        },
        {
          boxes: [
            "High Complexity",
            "Many Dependencies",
            "Many Reasons to Change",
          ],
        },
      ],
    },

    {
      title: "11. SRP and Testing",
      caption:
        "Focused responsibilities make tests more targeted and reduce unrelated setup.",

      layers: [
        {
          boxes: [
            "TaxCalculator",
          ],
        },
        {
          boxes: [
            "Tax Test Cases",
          ],
        },
        {
          boxes: [
            "No Email Server",
            "No Database",
            "No PDF Infrastructure",
          ],
        },
      ],
    },

    {
      title: "12. SRP Does Not Mean One Method",
      caption:
        "Multiple methods are valid when they collectively implement one cohesive responsibility.",

      layers: [
        {
          boxes: [
            "TaxCalculator",
          ],
        },
        {
          boxes: [
            "calculateTax()",
            "calculateRegionalTax()",
            "calculateDiscountTax()",
          ],
        },
        {
          boxes: [
            "One Cohesive Responsibility",
          ],
        },
      ],
    },

    {
      title: "13. Avoid Over-Splitting",
      caption:
        "SRP should create meaningful boundaries, not one class for every tiny operation.",

      layers: [
        {
          boxes: [
            "One Tiny Method",
          ],
        },
        {
          boxes: [
            "Unnecessary Class",
            "Unnecessary Interface",
            "Unnecessary Indirection",
          ],
        },
        {
          boxes: [
            "Overengineering",
          ],
        },
      ],
    },

    {
      title: "14. SRP in Spring Boot",
      caption:
        "Spring applications commonly use focused services, repositories, and integration components.",

      layers: [
        {
          boxes: [
            "Controller",
          ],
        },
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "OrderRepository",
            "NotificationService",
            "PaymentService",
          ],
        },
        {
          boxes: [
            "Focused Responsibilities",
          ],
        },
      ],
    },

    {
      title: "15. Change Localization",
      caption:
        "The main benefit of SRP is reducing the blast radius of changes.",

      layers: [
        {
          boxes: [
            "Pricing Rules Change",
          ],
        },
        {
          boxes: [
            "PricingService",
          ],
        },
        {
          boxes: [
            "Order Persistence Unchanged",
            "Notification Unchanged",
            "Reporting Unchanged",
          ],
        },
      ],
    },

    {
      title: "16. SRP Decision Framework",
      caption:
        "Use these questions before splitting a class.",

      layers: [
        {
          boxes: [
            "What responsibility does this class own?",
            "What are its reasons to change?",
          ],
        },
        {
          boxes: [
            "Are the reasons related?",
            "Are the behaviors cohesive?",
          ],
        },
        {
          boxes: [
            "Separate only if the boundary is meaningful",
          ],
        },
      ],
    },

    {
      title: "17. Final SRP Mental Model",
      caption:
        "Think responsibility first, then reason for change, then cohesion.",

      layers: [
        {
          boxes: [
            "One Cohesive Responsibility",
          ],
        },
        {
          boxes: [
            "One Primary Reason to Change",
          ],
        },
        {
          boxes: [
            "High Cohesion",
            "Localized Changes",
            "Better Testability",
          ],
        },
      ],
    },
  ],
},
"open-closed-principle": {
  topicId: "open-closed-principle",
  type: "stage-flow",

  summary:
    "OCP protects stable code from unnecessary modification by allowing new behavior to be introduced through meaningful extension points.",

  stages: [
    {
      title: "1. The OCP Problem",
      caption:
        "A stable component becomes a modification hotspot when every new variation requires changing the same code.",

      layers: [
        {
          boxes: [
            "Existing Behavior",
            "New Variation",
            "Another Variation",
            "Future Variation",
          ],
        },
        {
          boxes: [
            "One Large Class",
          ],
        },
        {
          boxes: [
            "Repeated Modification",
            "Regression Risk",
            "Growing Complexity",
          ],
        },
      ],
    },

    {
      title: "2. What OCP Means",
      caption:
        "Open for extension, closed for unnecessary modification.",

      layers: [
        {
          boxes: [
            "Open for Extension",
          ],
        },
        {
          boxes: [
            "New Behavior",
            "New Implementations",
            "New Strategies",
          ],
        },
        {
          boxes: [
            "Closed for Unnecessary Modification",
          ],
        },
      ],
    },

    {
      title: "3. Before OCP",
      caption:
        "Every new payment type modifies the same payment service.",

      layers: [
        {
          boxes: [
            "PaymentService",
          ],
        },
        {
          boxes: [
            "CARD",
            "UPI",
            "WALLET",
            "NET_BANKING",
          ],
        },
        {
          boxes: [
            "Growing if / else",
            "Growing switch",
          ],
        },
      ],
    },

    {
      title: "4. OCP with Abstraction",
      caption:
        "Move varying behavior behind a stable contract.",

      layers: [
        {
          boxes: [
            "PaymentService",
          ],
        },
        {
          boxes: [
            "PaymentProcessor",
          ],
        },
        {
          boxes: [
            "CardPayment",
            "UPIPayment",
            "WalletPayment",
            "NetBankingPayment",
          ],
        },
      ],
    },

    {
      title: "5. Extension",
      caption:
        "A new implementation can be added without modifying the stable payment workflow.",

      layers: [
        {
          boxes: [
            "Existing PaymentService",
          ],
        },
        {
          boxes: [
            "Existing PaymentProcessor Contract",
          ],
        },
        {
          boxes: [
            "New Payment Implementation",
          ],
        },
      ],
    },

    {
      title: "6. Abstraction",
      caption:
        "The abstraction defines the behavior that clients need while hiding implementation-specific details.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "PaymentProcessor",
          ],
        },
        {
          boxes: [
            "Card",
            "UPI",
            "Wallet",
          ],
        },
      ],
    },

    {
      title: "7. Polymorphism",
      caption:
        "The client calls the abstraction while the concrete implementation provides the actual behavior.",

      layers: [
        {
          boxes: [
            "paymentProcessor.process()",
          ],
        },
        {
          boxes: [
            "CardPayment.process()",
            "UPIPayment.process()",
            "WalletPayment.process()",
          ],
        },
        {
          boxes: [
            "Different Behavior",
          ],
        },
      ],
    },

    {
      title: "8. Conditional Explosion",
      caption:
        "A growing type-based conditional is a signal to investigate whether the variation belongs behind an abstraction.",

      layers: [
        {
          boxes: [
            "if CARD",
            "else if UPI",
            "else if WALLET",
            "else if NEW_TYPE",
          ],
        },
        {
          boxes: [
            "Every New Type",
          ],
        },
        {
          boxes: [
            "Modify Core Logic",
          ],
        },
      ],
    },

    {
      title: "9. Strategy Pattern",
      caption:
        "Strategy is a common mechanism for applying OCP to interchangeable behavior.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "DiscountStrategy",
          ],
        },
        {
          boxes: [
            "PercentageDiscount",
            "FlatDiscount",
            "FestivalDiscount",
          ],
        },
      ],
    },

    {
      title: "10. Composition",
      caption:
        "OCP does not require inheritance. Behavior can be extended through composition.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "DiscountStrategy",
            "PaymentProcessor",
            "NotificationChannel",
          ],
        },
        {
          boxes: [
            "Composable Behavior",
          ],
        },
      ],
    },

    {
      title: "11. Factory",
      caption:
        "Factory can separate object creation from business behavior, but it does not automatically guarantee OCP.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "PaymentFactory",
          ],
        },
        {
          boxes: [
            "CardPayment",
            "UPIPayment",
            "WalletPayment",
          ],
        },
        {
          boxes: [
            "Creation Logic",
          ],
        },
      ],
    },

    {
      title: "12. DIP + OCP",
      caption:
        "DIP provides dependency direction while OCP allows implementations to vary behind the abstraction.",

      layers: [
        {
          boxes: [
            "High-Level Service",
          ],
        },
        {
          boxes: [
            "PaymentProcessor",
          ],
        },
        {
          boxes: [
            "CardPayment",
            "UPIPayment",
            "WalletPayment",
          ],
        },
        {
          boxes: [
            "Abstraction Boundary",
          ],
        },
      ],
    },

    {
      title: "13. Spring Boot Example",
      caption:
        "Spring dependency injection can provide different implementations of an abstraction.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "DiscountStrategy",
          ],
        },
        {
          boxes: [
            "FestivalDiscount",
            "LoyaltyDiscount",
            "BulkDiscount",
          ],
        },
        {
          boxes: [
            "Spring Dependency Injection",
          ],
        },
      ],
    },

    {
      title: "14. OCP and Testing",
      caption:
        "Stable client logic can remain unchanged while new implementations receive their own tests.",

      layers: [
        {
          boxes: [
            "Existing Client Tests",
          ],
        },
        {
          boxes: [
            "Stable Core",
          ],
        },
        {
          boxes: [
            "New Implementation Tests",
          ],
        },
        {
          boxes: [
            "Smaller Modification Surface",
          ],
        },
      ],
    },

    {
      title: "15. Avoid Speculative Abstraction",
      caption:
        "Do not create extension points for every hypothetical future requirement.",

      layers: [
        {
          boxes: [
            "Real Variation",
            "Expected Change",
            "Meaningful Contract",
          ],
        },
        {
          boxes: [
            "Appropriate Abstraction",
          ],
        },
        {
          boxes: [
            "Avoid Unnecessary Interfaces",
            "Avoid Excessive Factories",
            "Avoid Unnecessary Indirection",
          ],
        },
      ],
    },

    {
      title: "16. OCP Decision Framework",
      caption:
        "Before introducing an abstraction, identify whether the variation is real and worth protecting.",

      layers: [
        {
          boxes: [
            "What is likely to vary?",
          ],
        },
        {
          boxes: [
            "Does it change repeatedly?",
            "Is the variation meaningful?",
          ],
        },
        {
          boxes: [
            "Can a stable abstraction isolate it?",
          ],
        },
        {
          boxes: [
            "Will the abstraction reduce future change cost?",
          ],
        },
      ],
    },

    {
      title: "17. Final OCP Mental Model",
      caption:
        "Protect stable behavior and place predictable variation behind meaningful extension points.",

      layers: [
        {
          boxes: [
            "Stable Core",
          ],
        },
        {
          boxes: [
            "Abstraction / Extension Point",
          ],
        },
        {
          boxes: [
            "New Implementations",
            "New Strategies",
            "New Behavior",
          ],
        },
        {
          boxes: [
            "Less Core Modification",
            "Lower Change Impact",
            "Reduced Regression Risk",
          ],
        },
      ],
    },
  ],
},
"liskov-substitution-principle": {
  topicId: "liskov-substitution-principle",
  type: "stage-flow",

  summary:
    "LSP ensures that subtypes and implementations preserve the behavioral contract of their abstractions so clients can safely substitute them.",

  stages: [
    {
      title: "1. The LSP Problem",
      caption:
        "Inheritance can look correct structurally while still being wrong behaviorally.",

      layers: [
        {
          boxes: [
            "Base Class",
            "Child Class",
          ],
        },
        {
          boxes: [
            "Same Methods",
            "Different Behavior",
          ],
        },
        {
          boxes: [
            "Client Breaks",
            "Unexpected Exceptions",
            "Special Cases",
          ],
        },
      ],
    },

    {
      title: "2. What LSP Means",
      caption:
        "A subtype should be safely usable wherever the base abstraction is expected.",

      layers: [
        {
          boxes: [
            "Base Abstraction",
          ],
        },
        {
          boxes: [
            "Subtype A",
            "Subtype B",
            "Subtype C",
          ],
        },
        {
          boxes: [
            "Safe Substitution",
            "Expected Behavior",
          ],
        },
      ],
    },

    {
      title: "3. Structural vs Behavioral",
      caption:
        "Having the same methods is not enough. The behavior must also satisfy the contract.",

      layers: [
        {
          boxes: [
            "Same Method Signature",
          ],
        },
        {
          boxes: [
            "Expected Inputs",
            "Expected Outputs",
            "Expected State",
            "Expected Exceptions",
          ],
        },
        {
          boxes: [
            "Behavioral Compatibility",
          ],
        },
      ],
    },

    {
      title: "4. The Contract",
      caption:
        "The abstraction defines what client code is allowed to expect.",

      layers: [
        {
          boxes: [
            "Valid Inputs",
            "Expected Outputs",
            "State Guarantees",
            "Side Effects",
            "Exception Behavior",
          ],
        },
        {
          boxes: [
            "Base Abstraction Contract",
          ],
        },
        {
          boxes: [
            "Subtype Must Honor Contract",
          ],
        },
      ],
    },

    {
      title: "5. Preconditions",
      caption:
        "A subtype should not require callers to satisfy stronger conditions.",

      layers: [
        {
          boxes: [
            "Base",
            "Accepts Valid Input",
          ],
        },
        {
          boxes: [
            "Subtype",
            "Requires Extra Condition",
          ],
        },
        {
          boxes: [
            "Stronger Precondition",
            "Potential LSP Violation",
          ],
        },
      ],
    },

    {
      title: "6. Postconditions",
      caption:
        "A subtype should preserve or strengthen the guarantees promised by the abstraction.",

      layers: [
        {
          boxes: [
            "Base Contract",
            "Guarantee X",
          ],
        },
        {
          boxes: [
            "Subtype",
            "Guarantee X",
            "Additional Guarantee",
          ],
        },
        {
          boxes: [
            "Compatible",
          ],
        },
      ],
    },

    {
      title: "7. Invariants",
      caption:
        "Important state rules established by the abstraction should remain valid.",

      layers: [
        {
          boxes: [
            "Object State",
          ],
        },
        {
          boxes: [
            "Base Invariant",
          ],
        },
        {
          boxes: [
            "Subtype Preserves Invariant",
          ],
        },
      ],
    },

    {
      title: "8. Exception Behavior",
      caption:
        "Unexpected rejection of promised behavior can break substitutability.",

      layers: [
        {
          boxes: [
            "Base Contract",
            "Operation Supported",
          ],
        },
        {
          boxes: [
            "Subtype",
            "UnsupportedOperationException",
          ],
        },
        {
          boxes: [
            "Client Expectation Broken",
          ],
        },
      ],
    },

    {
      title: "9. Bird and Penguin",
      caption:
        "A broad abstraction should not promise behavior that some subtypes cannot support.",

      layers: [
        {
          boxes: [
            "Bird",
            "fly()",
          ],
        },
        {
          boxes: [
            "Eagle",
            "Penguin",
          ],
        },
        {
          boxes: [
            "Eagle → Can Fly",
            "Penguin → Cannot Fly",
          ],
        },
        {
          boxes: [
            "LSP Problem",
          ],
        },
      ],
    },

    {
      title: "10. Better Bird Design",
      caption:
        "Model optional capabilities separately instead of forcing them into the broad abstraction.",

      layers: [
        {
          boxes: [
            "Bird",
          ],
        },
        {
          boxes: [
            "Flyable",
          ],
        },
        {
          boxes: [
            "Eagle → Flyable",
            "Penguin → Bird",
          ],
        },
        {
          boxes: [
            "Focused Capability",
            "Safe Substitution",
          ],
        },
      ],
    },

    {
      title: "11. Rectangle and Square",
      caption:
        "A real-world or mathematical relationship does not automatically create a valid behavioral subtype relationship.",

      layers: [
        {
          boxes: [
            "Rectangle",
            "setWidth()",
            "setHeight()",
          ],
        },
        {
          boxes: [
            "Square",
            "Width = Height",
          ],
        },
        {
          boxes: [
            "Independent Dimension Assumption Breaks",
          ],
        },
      ],
    },

    {
      title: "12. Interface Implementations",
      caption:
        "LSP applies to interfaces as well as class inheritance.",

      layers: [
        {
          boxes: [
            "PaymentProcessor",
          ],
        },
        {
          boxes: [
            "CardPayment",
            "UPIPayment",
            "WalletPayment",
          ],
        },
        {
          boxes: [
            "Every Implementation Honors Contract",
          ],
        },
      ],
    },

    {
      title: "13. LSP and Polymorphism",
      caption:
        "Polymorphism is safe when each implementation can replace the abstraction without special handling.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "Abstraction",
          ],
        },
        {
          boxes: [
            "Implementation A",
            "Implementation B",
            "Implementation C",
          ],
        },
        {
          boxes: [
            "Same Expected Contract",
          ],
        },
      ],
    },

    {
      title: "14. LSP and OCP",
      caption:
        "OCP allows new implementations to be added; LSP ensures those implementations remain valid substitutions.",

      layers: [
        {
          boxes: [
            "Stable Abstraction",
          ],
        },
        {
          boxes: [
            "Existing Implementation",
          ],
        },
        {
          boxes: [
            "New Implementation",
          ],
        },
        {
          boxes: [
            "Extension",
            "Behavioral Substitutability",
          ],
        },
      ],
    },

    {
      title: "15. Inheritance vs Composition",
      caption:
        "When inheritance cannot preserve the contract, composition can represent the relationship more safely.",

      layers: [
        {
          boxes: [
            "Problematic Parent Contract",
          ],
        },
        {
          boxes: [
            "Subtype Cannot Support Behavior",
          ],
        },
        {
          boxes: [
            "Composition",
            "Focused Interfaces",
            "Independent Capabilities",
          ],
        },
      ],
    },

    {
      title: "16. Detecting LSP Violations",
      caption:
        "Look for runtime special cases that exist because one implementation behaves differently from the abstraction.",

      layers: [
        {
          boxes: [
            "instanceof",
            "Type Checks",
            "Special Cases",
          ],
        },
        {
          boxes: [
            "UnsupportedOperationException",
            "Unexpected Exceptions",
            "Extra Input Restrictions",
          ],
        },
        {
          boxes: [
            "Investigate Abstraction",
          ],
        },
      ],
    },

    {
      title: "17. LSP Decision Framework",
      caption:
        "Before using inheritance, verify the behavioral relationship.",

      layers: [
        {
          boxes: [
            "Can subtype honor the contract?",
          ],
        },
        {
          boxes: [
            "Can it accept valid inputs?",
            "Can it preserve guarantees?",
            "Can it preserve invariants?",
          ],
        },
        {
          boxes: [
            "Can clients substitute it safely?",
          ],
        },
        {
          boxes: [
            "If No → Redesign",
          ],
        },
      ],
    },

    {
      title: "18. Final LSP Mental Model",
      caption:
        "The key question is not 'is this an inheritance relationship?' but 'can this subtype safely replace the abstraction?'",

      layers: [
        {
          boxes: [
            "Abstraction Contract",
          ],
        },
        {
          boxes: [
            "Valid Inputs",
            "Expected Outputs",
            "Behavior",
            "State",
            "Exceptions",
          ],
        },
        {
          boxes: [
            "Subtype Preserves Contract",
          ],
        },
        {
          boxes: [
            "Safe Substitution",
            "Safe Polymorphism",
          ],
        },
      ],
    },
  ],
},
"interface-segregation-principle": {
  topicId: "interface-segregation-principle",
  type: "stage-flow",

  summary:
    "ISP creates focused interfaces so clients depend only on the capabilities and operations they actually need.",

  stages: [
    {
      title: "1. The ISP Problem",
      caption:
        "A large interface can force unrelated clients and implementations to depend on operations they do not need.",

      layers: [
        {
          boxes: [
            "Large Interface",
          ],
        },
        {
          boxes: [
            "Client A",
            "Client B",
            "Client C",
          ],
        },
        {
          boxes: [
            "Unused Methods",
            "Unnecessary Coupling",
            "Unsupported Operations",
          ],
        },
      ],
    },

    {
      title: "2. What ISP Means",
      caption:
        "Clients should depend only on the interface operations relevant to them.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "Focused Interface",
          ],
        },
        {
          boxes: [
            "Required Operations Only",
          ],
        },
      ],
    },

    {
      title: "3. Fat Interface",
      caption:
        "A broad contract combines multiple capabilities that different clients may not need.",

      layers: [
        {
          boxes: [
            "MultiFunctionDevice",
          ],
        },
        {
          boxes: [
            "print()",
            "scan()",
            "fax()",
            "staple()",
            "bind()",
          ],
        },
        {
          boxes: [
            "Different Clients Need Different Subsets",
          ],
        },
      ],
    },

    {
      title: "4. Client Dependency",
      caption:
        "The problem is not simply interface size; it is unnecessary dependency on irrelevant operations.",

      layers: [
        {
          boxes: [
            "Printing Client",
          ],
        },
        {
          boxes: [
            "print()",
            "scan()",
            "fax()",
          ],
        },
        {
          boxes: [
            "Client Depends on Unused Methods",
          ],
        },
      ],
    },

    {
      title: "5. Segregate Capabilities",
      caption:
        "Split the broad contract into meaningful capability interfaces.",

      layers: [
        {
          boxes: [
            "Printable",
            "Scannable",
            "Faxable",
          ],
        },
        {
          boxes: [
            "print()",
            "scan()",
            "fax()",
          ],
        },
      ],
    },

    {
      title: "6. Focused Client Dependency",
      caption:
        "Each client now depends only on the capability it actually requires.",

      layers: [
        {
          boxes: [
            "Printing Client",
          ],
        },
        {
          boxes: [
            "Printable",
          ],
        },
        {
          boxes: [
            "print()",
          ],
        },
      ],
    },

    {
      title: "7. One Implementation, Multiple Capabilities",
      caption:
        "A concrete class can implement multiple focused interfaces when it genuinely supports those capabilities.",

      layers: [
        {
          boxes: [
            "MultiFunctionPrinter",
          ],
        },
        {
          boxes: [
            "Printable",
            "Scannable",
            "Faxable",
          ],
        },
        {
          boxes: [
            "print()",
            "scan()",
            "fax()",
          ],
        },
      ],
    },

    {
      title: "8. Worker Example",
      caption:
        "Do not force every Worker to support every human-specific capability.",

      layers: [
        {
          boxes: [
            "Worker",
          ],
        },
        {
          boxes: [
            "work()",
            "eat()",
            "sleep()",
          ],
        },
        {
          boxes: [
            "Human",
            "Robot",
          ],
        },
      ],
    },

    {
      title: "9. Better Worker Design",
      caption:
        "Represent capabilities independently so each implementation depends only on behavior it supports.",

      layers: [
        {
          boxes: [
            "Workable",
            "Eatable",
            "Sleepable",
          ],
        },
        {
          boxes: [
            "Human",
            "Robot",
          ],
        },
        {
          boxes: [
            "Human → All Required Capabilities",
            "Robot → Workable",
          ],
        },
      ],
    },

    {
      title: "10. UnsupportedOperationException",
      caption:
        "Unsupported operations can reveal that an interface is forcing an implementation to provide irrelevant behavior.",

      layers: [
        {
          boxes: [
            "Large Interface",
          ],
        },
        {
          boxes: [
            "Implementation",
          ],
        },
        {
          boxes: [
            "UnsupportedOperationException",
            "Empty Method",
            "Dummy Implementation",
          ],
        },
        {
          boxes: [
            "Investigate ISP",
          ],
        },
      ],
    },

    {
      title: "11. ISP vs SRP",
      caption:
        "SRP separates responsibilities; ISP separates client-facing contracts.",

      layers: [
        {
          boxes: [
            "SRP",
            "Cohesive Responsibility",
          ],
        },
        {
          boxes: [
            "ISP",
            "Focused Client Contract",
          ],
        },
        {
          boxes: [
            "High Cohesion",
            "Lower Unnecessary Coupling",
          ],
        },
      ],
    },

    {
      title: "12. ISP and Loose Coupling",
      caption:
        "Focused interfaces limit the number of unrelated operations a client depends on.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "Required Capability",
          ],
        },
        {
          boxes: [
            "Unrelated Capabilities Hidden",
          ],
        },
        {
          boxes: [
            "Reduced Unnecessary Coupling",
          ],
        },
      ],
    },

    {
      title: "13. ISP and DIP",
      caption:
        "DIP says depend on abstractions; ISP helps ensure those abstractions are appropriately focused.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "Focused Abstraction",
          ],
        },
        {
          boxes: [
            "Implementation",
          ],
        },
        {
          boxes: [
            "Dependency on Relevant Contract",
          ],
        },
      ],
    },

    {
      title: "14. ISP and LSP",
      caption:
        "Each implementation must still honor the behavioral contract of the focused interface it implements.",

      layers: [
        {
          boxes: [
            "Focused Interface",
          ],
        },
        {
          boxes: [
            "Implementation A",
            "Implementation B",
          ],
        },
        {
          boxes: [
            "Contract Preserved",
            "Safe Substitution",
          ],
        },
      ],
    },

    {
      title: "15. Spring Boot Example",
      caption:
        "Spring services can expose focused contracts to different consumers.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "PaymentProcessor",
            "PaymentAdminOperations",
          ],
        },
        {
          boxes: [
            "Payment Implementation",
          ],
        },
        {
          boxes: [
            "Consumer Gets Relevant Contract",
          ],
        },
      ],
    },

    {
      title: "16. Avoid Over-Segregation",
      caption:
        "ISP does not mean creating one interface for every method.",

      layers: [
        {
          boxes: [
            "One Method",
          ],
        },
        {
          boxes: [
            "Interface A",
            "Interface B",
            "Interface C",
            "Interface D",
          ],
        },
        {
          boxes: [
            "Excessive Fragmentation",
            "More Complexity",
          ],
        },
      ],
    },

    {
      title: "17. ISP Decision Framework",
      caption:
        "Segregate interfaces based on meaningful client needs and capabilities.",

      layers: [
        {
          boxes: [
            "Which clients use this interface?",
          ],
        },
        {
          boxes: [
            "Which methods does each client need?",
          ],
        },
        {
          boxes: [
            "Are unrelated capabilities mixed?",
          ],
        },
        {
          boxes: [
            "Create Meaningful Focused Interfaces",
          ],
        },
      ],
    },

    {
      title: "18. Final ISP Mental Model",
      caption:
        "The goal is not small interfaces; the goal is relevant interfaces.",

      layers: [
        {
          boxes: [
            "Client",
          ],
        },
        {
          boxes: [
            "Focused Capability Interface",
          ],
        },
        {
          boxes: [
            "Relevant Operations",
          ],
        },
        {
          boxes: [
            "Less Unnecessary Coupling",
            "Better Maintainability",
            "Better Testability",
          ],
        },
      ],
    },
  ],
},
"dependency-inversion-principle": {
  topicId: "dependency-inversion-principle",
  type: "stage-flow",

  summary:
    "DIP changes dependency direction so high-level modules depend on abstractions while low-level implementation details depend on those abstractions.",

  stages: [
    {
      title: "1. The DIP Problem",
      caption:
        "A high-level module becomes tightly coupled when it directly depends on a concrete low-level implementation.",

      layers: [
        {
          boxes: [
            "High-Level Module",
          ],
        },
        {
          boxes: [
            "Concrete Low-Level Module",
          ],
        },
        {
          boxes: [
            "Tight Coupling",
            "Hard to Replace",
            "Harder to Test",
          ],
        },
      ],
    },

    {
      title: "2. What DIP Means",
      caption:
        "High-level modules should not directly depend on low-level modules. Both should depend on abstractions.",

      layers: [
        {
          boxes: [
            "High-Level Module",
          ],
        },
        {
          boxes: [
            "Abstraction",
          ],
        },
        {
          boxes: [
            "Low-Level Module",
          ],
        },
      ],
    },

    {
      title: "3. High-Level Module",
      caption:
        "High-level modules contain business rules and application policies.",

      layers: [
        {
          boxes: [
            "OrderService",
            "PaymentService",
            "CheckoutService",
          ],
        },
        {
          boxes: [
            "Business Rules",
            "Application Policy",
          ],
        },
      ],
    },

    {
      title: "4. Low-Level Module",
      caption:
        "Low-level modules contain technical implementation details.",

      layers: [
        {
          boxes: [
            "MySqlOrderRepository",
            "StripePaymentGateway",
            "EmailNotifier",
          ],
        },
        {
          boxes: [
            "Database",
            "External API",
            "Notification Provider",
          ],
        },
      ],
    },

    {
      title: "5. Direct Concrete Dependency",
      caption:
        "Without DIP, business logic directly knows and depends on a specific implementation.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "MySqlOrderRepository",
          ],
        },
        {
          boxes: [
            "Direct Dependency",
            "Tight Coupling",
          ],
        },
      ],
    },

    {
      title: "6. Identify the Required Behavior",
      caption:
        "First identify what the high-level module actually needs from the low-level implementation.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "Save Order",
            "Find Order",
            "Delete Order",
          ],
        },
        {
          boxes: [
            "Required Business Capability",
          ],
        },
      ],
    },

    {
      title: "7. Introduce an Abstraction",
      caption:
        "Create a contract around the behavior required by the high-level module.",

      layers: [
        {
          boxes: [
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "save()",
            "findById()",
            "delete()",
          ],
        },
        {
          boxes: [
            "Persistence Abstraction",
          ],
        },
      ],
    },

    {
      title: "8. Invert the Dependency",
      caption:
        "The high-level module now depends on the abstraction instead of the concrete implementation.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "MySqlOrderRepository",
          ],
        },
      ],
    },

    {
      title: "9. The Core DIP Structure",
      caption:
        "Both high-level and low-level modules depend on the abstraction.",

      layers: [
        {
          boxes: [
            "High-Level Policy",
          ],
        },
        {
          boxes: [
            "Abstraction",
          ],
        },
        {
          boxes: [
            "Low-Level Detail",
          ],
        },
      ],
    },

    {
      title: "10. Dependency Direction",
      caption:
        "The dependency direction is inverted around the abstraction.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "MySqlOrderRepository",
          ],
        },
        {
          boxes: [
            "Business Logic → Abstraction ← Implementation",
          ],
        },
      ],
    },

    {
      title: "11. Payment Gateway Example",
      caption:
        "Payment business logic should depend on a payment abstraction rather than directly on a specific provider.",

      layers: [
        {
          boxes: [
            "PaymentService",
          ],
        },
        {
          boxes: [
            "PaymentGateway",
          ],
        },
        {
          boxes: [
            "StripePaymentGateway",
            "RazorpayPaymentGateway",
          ],
        },
      ],
    },

    {
      title: "12. Notification Example",
      caption:
        "Business logic can remain independent of the notification delivery mechanism.",

      layers: [
        {
          boxes: [
            "NotificationService",
          ],
        },
        {
          boxes: [
            "Notifier",
          ],
        },
        {
          boxes: [
            "EmailNotifier",
            "SmsNotifier",
            "PushNotifier",
          ],
        },
      ],
    },

    {
      title: "13. Dependency Injection",
      caption:
        "Dependency Injection supplies the concrete implementation from outside the high-level module.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "MySqlOrderRepository",
          ],
        },
        {
          boxes: [
            "Injected Dependency",
          ],
        },
      ],
    },

    {
      title: "14. Constructor Injection",
      caption:
        "Required dependencies become explicit through the constructor.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "OrderService(OrderRepository repository)",
          ],
        },
        {
          boxes: [
            "OrderRepository",
          ],
        },
      ],
    },

    {
      title: "15. Spring Boot Example",
      caption:
        "Spring's IoC container can create and wire the concrete implementation into the high-level service.",

      layers: [
        {
          boxes: [
            "Spring IoC Container",
          ],
        },
        {
          boxes: [
            "OrderService",
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "MySqlOrderRepository",
          ],
        },
        {
          boxes: [
            "Dependency Wiring",
          ],
        },
      ],
    },

    {
      title: "16. DIP and Testability",
      caption:
        "The real infrastructure can be replaced with a test implementation behind the same abstraction.",

      layers: [
        {
          boxes: [
            "OrderService",
          ],
        },
        {
          boxes: [
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "MockOrderRepository",
            "FakeOrderRepository",
          ],
        },
        {
          boxes: [
            "Isolated Unit Test",
          ],
        },
      ],
    },

    {
      title: "17. DIP vs Dependency Injection",
      caption:
        "DIP is the design principle; Dependency Injection is a technique used to supply dependencies.",

      layers: [
        {
          boxes: [
            "DIP",
          ],
        },
        {
          boxes: [
            "Dependency Direction",
          ],
        },
        {
          boxes: [
            "Dependency Injection",
          ],
        },
        {
          boxes: [
            "Dependency Supply Technique",
          ],
        },
      ],
    },

    {
      title: "18. DIP vs IoC",
      caption:
        "IoC is broader than Dependency Injection and DIP.",

      layers: [
        {
          boxes: [
            "DIP",
            "DI",
            "IoC",
          ],
        },
        {
          boxes: [
            "Design Principle",
            "Dependency Technique",
            "Control Transfer",
          ],
        },
      ],
    },

    {
      title: "19. Good Abstraction",
      caption:
        "A good abstraction represents the behavior required by the business rather than exposing infrastructure-specific details.",

      layers: [
        {
          boxes: [
            "PaymentGateway",
          ],
        },
        {
          boxes: [
            "charge()",
            "refund()",
          ],
        },
        {
          boxes: [
            "Business Payment Behavior",
          ],
        },
      ],
    },

    {
      title: "20. Leaky Abstraction",
      caption:
        "An abstraction becomes weak when it exposes unnecessary implementation-specific details.",

      layers: [
        {
          boxes: [
            "PaymentGateway",
          ],
        },
        {
          boxes: [
            "Stripe-Specific Methods",
            "Provider-Specific Configuration",
          ],
        },
        {
          boxes: [
            "Implementation Details Leak",
            "Higher Coupling",
          ],
        },
      ],
    },

    {
      title: "21. DIP Does Not Mean Interfaces Everywhere",
      caption:
        "DIP does not require an abstraction for every class or dependency.",

      layers: [
        {
          boxes: [
            "Useful Abstraction",
          ],
        },
        {
          boxes: [
            "Replaceability",
            "Testing",
            "Architectural Boundary",
          ],
        },
        {
          boxes: [
            "Unnecessary Abstraction",
            "Extra Indirection",
            "More Complexity",
          ],
        },
      ],
    },

    {
      title: "22. DIP Decision Framework",
      caption:
        "Apply DIP when a high-level policy is unnecessarily coupled to a replaceable implementation detail.",

      layers: [
        {
          boxes: [
            "Identify High-Level Policy",
          ],
        },
        {
          boxes: [
            "Identify Low-Level Detail",
          ],
        },
        {
          boxes: [
            "Find Direct Coupling",
          ],
        },
        {
          boxes: [
            "Create Meaningful Abstraction",
          ],
        },
        {
          boxes: [
            "Invert Dependency",
          ],
        },
        {
          boxes: [
            "Inject Implementation",
          ],
        },
      ],
    },

    {
      title: "23. Final DIP Mental Model",
      caption:
        "The goal is not interfaces everywhere; the goal is correct dependency direction.",

      layers: [
        {
          boxes: [
            "High-Level Policy",
          ],
        },
        {
          boxes: [
            "Abstraction",
          ],
        },
        {
          boxes: [
            "Low-Level Implementation",
          ],
        },
        {
          boxes: [
            "Lower Coupling",
            "Better Testability",
            "Better Replaceability",
            "Better Maintainability",
          ],
        },
      ],
    },
  ],
},
"solid-real-world-examples": {
  topicId: "solid-real-world-examples",
  type: "stage-flow",
  summary:
    "Apply all five SOLID principles to real backend workflows. Identify responsibility boundaries, introduce appropriate extension points, preserve behavioral contracts, keep interfaces focused, and invert dependencies without unnecessary abstraction.",
  stages: [
    {
      title: "1. The Real-World Problem",
      caption:
        "A growing application often starts with one class doing everything. New requirements make that class increasingly difficult to change and test.",
      layers: [
        {
          boxes: [
            "CheckoutManager",
            "Calculate Order Total",
            "Save Order to Database",
            "Charge Payment",
            "Generate Invoice",
            "Send Email and SMS",
          ],
        },
        {
          boxes: [
            "Too Many Responsibilities",
            "Tight Coupling",
            "Large Conditional Statements",
            "Difficult Unit Testing",
            "Higher Regression Risk",
          ],
        },
      ],
    },
    {
      title: "2. The Five SOLID Principles",
      caption:
        "Each principle addresses a different design concern. A single refactoring may help several principles, but one does not automatically guarantee the others.",
      layers: [
        {
          boxes: [
            "S — Single Responsibility",
            "O — Open/Closed",
            "L — Liskov Substitution",
            "I — Interface Segregation",
            "D — Dependency Inversion",
          ],
        },
      ],
    },
    {
      title: "3. SRP — Separate Responsibilities",
      caption:
        "Keep each class focused on one cohesive responsibility and one primary reason to change.",
      layers: [
        {
          boxes: [
            "CheckoutService — Coordinates Checkout",
            "PricingService — Calculates Prices",
            "OrderRepository — Persists Orders",
            "PaymentService — Coordinates Payment",
            "InvoiceGenerator — Creates Invoices",
            "NotificationService — Sends Notifications",
          ],
        },
        {
          boxes: [
            "Cohesive Responsibilities",
            "Clear Ownership",
            "Focused Tests",
            "Smaller Change Impact",
          ],
        },
      ],
    },
    {
      title: "4. OCP — Extend Payment Methods",
      caption:
        "Adding a supported payment method should not require repeatedly changing the stable checkout workflow.",
      layers: [
        {
          boxes: [
            "CheckoutService",
            "PaymentGateway Contract",
            "CardPaymentGateway",
            "UpiPaymentGateway",
            "WalletPaymentGateway — New Extension",
          ],
        },
        {
          boxes: [
            "New Behavior Through Implementations",
            "Minimal Changes to Stable Workflow",
            "Appropriate Provider Selection",
          ],
        },
      ],
    },
    {
      title: "5. LSP — Preserve the Contract",
      caption:
        "Every payment implementation must honor the behavior that clients expect from PaymentGateway.",
      layers: [
        {
          boxes: [
            "PaymentGateway.charge(amount)",
            "Card Gateway Honors the Contract",
            "UPI Gateway Honors the Contract",
            "Wallet Gateway Honors the Contract",
          ],
        },
        {
          boxes: [
            "Expected Outcomes",
            "Documented Failure Behavior",
            "No Misleading Success",
            "No Unexpected Contract Violations",
          ],
        },
      ],
    },
    {
      title: "6. ISP — Focused Interfaces",
      caption:
        "Clients should depend only on the capabilities they actually use.",
      layers: [
        {
          boxes: [
            "EmailSender — sendEmail()",
            "SmsSender — sendSms()",
            "PushNotifier — sendPush()",
          ],
        },
        {
          boxes: [
            "Email Implementation Uses Email Capability",
            "SMS Implementation Uses SMS Capability",
            "Implementations Need Not Support Irrelevant Methods",
          ],
        },
      ],
    },
    {
      title: "7. DIP — Depend on Abstractions",
      caption:
        "High-level business logic should not directly depend on concrete infrastructure details when a useful abstraction is appropriate.",
      layers: [
        {
          boxes: [
            "OrderService",
            "OrderRepository Contract",
            "JpaOrderRepository Implementation",
            "Database Infrastructure",
          ],
        },
        {
          boxes: [
            "Business Logic Depends on Contract",
            "Infrastructure Implements Contract",
            "Implementation Supplied Externally",
          ],
        },
      ],
    },
    {
      title: "8. Putting the Principles Together",
      caption:
        "The checkout service coordinates the use case while specialized collaborators own their responsibilities and infrastructure details remain behind suitable contracts.",
      layers: [
        {
          boxes: [
            "CheckoutService",
            "PricingService",
            "PaymentGateway",
            "OrderRepository",
            "NotificationService",
          ],
        },
        {
          boxes: [
            "SRP — Responsibilities Are Cohesive",
            "OCP — Payment Providers Can Be Extended",
            "LSP — Providers Honor Their Contract",
            "ISP — Contracts Match Client Capabilities",
            "DIP — High-Level Logic Uses Abstractions",
          ],
        },
      ],
    },
    {
      title: "9. Java — Payment Abstraction",
      caption:
        "A focused interface provides the contract. Each implementation supplies provider-specific behavior.",
      layers: [
        {
          boxes: [
            "interface PaymentGateway",
            "PaymentResult charge(BigDecimal amount)",
            "CardPaymentGateway implements PaymentGateway",
            "UpiPaymentGateway implements PaymentGateway",
          ],
        },
        {
          boxes: [
            "CheckoutService Uses PaymentGateway",
            "Provider Details Stay in Implementations",
            "Each Implementation Honors the Contract",
          ],
        },
      ],
    },
    {
      title: "10. Java — Constructor Injection",
      caption:
        "Inject dependencies rather than constructing infrastructure implementations inside the business workflow.",
      layers: [
        {
          boxes: [
            "CheckoutService(PaymentGateway gateway)",
            "private final PaymentGateway gateway",
            "gateway.charge(amount)",
          ],
        },
        {
          boxes: [
            "Dependency Supplied by the Caller or Container",
            "Business Logic Is Easier to Isolate",
            "No Need to Construct a Concrete Gateway Inside the Service",
          ],
        },
      ],
    },
    {
      title: "11. Spring Boot — Wiring Implementations",
      caption:
        "Spring can assemble collaborators using dependency injection. The application design must still define sensible abstractions and responsibilities.",
      layers: [
        {
          boxes: [
            "@Service CheckoutService",
            "@Component CardPaymentGateway",
            "PaymentGateway Constructor Parameter",
            "Spring Dependency Injection",
          ],
        },
        {
          boxes: [
            "Container Supplies a Compatible Bean",
            "Multiple Candidates May Need Explicit Selection",
            "Spring Does Not Automatically Guarantee SOLID",
          ],
        },
      ],
    },
    {
      title: "12. Testing the Business Workflow",
      caption:
        "Abstraction boundaries allow the checkout workflow to be tested without contacting a real payment provider or database.",
      layers: [
        {
          boxes: [
            "CheckoutService Unit Test",
            "Mock or Fake PaymentGateway",
            "Controlled OrderRepository",
            "Execute Checkout Scenario",
          ],
        },
        {
          boxes: [
            "Verify Correct Payment Amount",
            "Verify Order Handling",
            "Verify Failure Behavior",
            "Avoid Unnecessary External Calls",
          ],
        },
      ],
    },
    {
      title: "13. Storage Provider Example",
      caption:
        "The same principles apply when an application supports multiple cloud storage providers.",
      layers: [
        {
          boxes: [
            "PhotoService",
            "StorageProvider Contract",
            "GoogleDriveProvider",
            "ProtonDriveProvider",
            "PCloudProvider",
          ],
        },
        {
          boxes: [
            "Photo Workflow Is Separate from Provider Details",
            "New Providers Can Be Added Where the Contract Fits",
            "Provider Implementations Honor Shared Behavior",
            "Optional Capabilities Can Use Focused Contracts",
          ],
        },
      ],
    },
    {
      title: "14. Refactoring a God Class",
      caption:
        "Refactor incrementally around real responsibilities while preserving existing behavior.",
      layers: [
        {
          boxes: [
            "Identify Responsibilities",
            "Map Dependencies",
            "Add Characterization Tests",
            "Extract One Cohesive Component",
            "Verify Existing Behavior",
            "Repeat Where Valuable",
          ],
        },
        {
          boxes: [
            "Avoid Large Unverified Rewrites",
            "Avoid Classes That Only Forward Calls",
            "Preserve Useful Simplicity",
          ],
        },
      ],
    },
    {
      title: "15. Recognizing the Right Principle",
      caption:
        "Diagnose the actual design problem before choosing a refactoring.",
      layers: [
        {
          boxes: [
            "Unrelated Reasons to Change → SRP",
            "Repeated Changes for New Variants → OCP",
            "Implementation Breaks Expectations → LSP",
            "Unused Methods Forced on Clients → ISP",
            "Business Logic Coupled to Infrastructure → DIP",
          ],
        },
      ],
    },
    {
      title: "16. Common Overengineering Trap",
      caption:
        "More interfaces and classes do not automatically mean better design.",
      layers: [
        {
          boxes: [
            "Avoid Interfaces Without a Useful Purpose",
            "Avoid One Class per Method",
            "Avoid Speculative Extension Frameworks",
            "Avoid Unnecessary Indirection",
          ],
        },
        {
          boxes: [
            "Prefer Cohesion",
            "Prefer Clear Contracts",
            "Prefer Useful Boundaries",
            "Keep Complexity Proportionate to Requirements",
          ],
        },
      ],
    },
    {
      title: "17. Final Decision Framework",
      caption:
        "Use SOLID as a practical review framework when designing or refactoring application code.",
      layers: [
        {
          boxes: [
            "1. What Is Changing?",
            "2. Which Responsibility Owns It?",
            "3. Is the Variation Worth an Extension Point?",
            "4. Do Implementations Honor Their Contracts?",
            "5. Are Clients Forced to Depend on Unused Methods?",
            "6. Does Business Logic Depend on Suitable Abstractions?",
            "7. Does the Added Complexity Provide Real Value?",
          ],
        },
      ],
    },
    {
      title: "18. Final Mental Model",
      caption:
        "SOLID is about controlling change and dependencies while keeping object-oriented designs understandable.",
      layers: [
        {
          boxes: [
            "SRP — Separate Responsibilities",
            "OCP — Extend with Minimal Stable-Code Changes",
            "LSP — Preserve Behavioral Substitutability",
            "ISP — Keep Interfaces Focused",
            "DIP — Invert Dependency Direction",
          ],
        },
        {
          boxes: [
            "Understand Requirements",
            "Choose Cohesive Boundaries",
            "Use Appropriate Abstractions",
            "Test Important Behavior",
            "Avoid Unnecessary Complexity",
          ],
        },
      ],
    },
  ],
},
"refactoring-examples": {
  topicId: "refactoring-examples",
  type: "stage-flow",
  summary:
    "Refactoring improves the internal structure of existing code while preserving externally observable behavior. Identify a code smell, establish a safety net, apply the smallest useful transformation, verify behavior, and reassess the design.",
  stages: [
    {
      title: "1. Identify the Problem",
      caption:
        "Start with a concrete design problem rather than choosing a pattern first.",
      layers: [
        {
          boxes: [
            "God Class",
            "Long Method",
            "Duplicated Business Logic",
            "Large Conditional",
            "Tight Concrete Dependency",
            "Fat Interface",
          ],
        },
        {
          boxes: [
            "Difficult Maintenance",
            "Poor Testability",
            "Repeated Changes",
            "Regression Risk",
          ],
        },
      ],
    },
    {
      title: "2. Understand Existing Behavior",
      caption:
        "Trace the current implementation before changing its internal structure.",
      layers: [
        {
          boxes: [
            "Inputs and Outputs",
            "Business Rules",
            "Exception Handling",
            "Database Writes",
            "External API Calls",
            "Transaction Boundaries",
          ],
        },
        {
          boxes: [
            "Identify Observable Behavior",
            "Identify Edge Cases",
            "Identify Side Effects",
          ],
        },
      ],
    },
    {
      title: "3. Establish a Safety Net",
      caption:
        "Tests provide evidence that existing behavior remains correct after structural changes.",
      layers: [
        {
          boxes: [
            "Inspect Existing Tests",
            "Add Characterization Tests",
            "Cover Important Edge Cases",
            "Capture Important Side Effects",
          ],
        },
        {
          boxes: [
            "Baseline Behavior Recorded",
            "Regression Checks Available",
          ],
        },
      ],
    },
    {
      title: "4. Extract Method",
      caption:
        "Move a coherent block of logic into a clearly named method.",
      layers: [
        {
          boxes: [
            "Before: Long placeOrder() Method",
            "Validate Order",
            "Calculate Total",
            "Persist Order",
            "After: Named Cohesive Operations",
          ],
        },
        {
          boxes: [
            "Improved Readability",
            "Clearer Intent",
            "Easier Local Reasoning",
          ],
        },
      ],
    },
    {
      title: "5. Extract Class",
      caption:
        "Separate responsibilities that have distinct reasons to change.",
      layers: [
        {
          boxes: [
            "Before: OrderService Does Everything",
            "Order Workflow",
            "Invoice Generation",
            "Notification Delivery",
            "After: Focused Collaborators",
          ],
        },
        {
          boxes: [
            "OrderService",
            "InvoiceGenerator",
            "NotificationService",
          ],
        },
      ],
    },
    {
      title: "6. Replace Conditional with Polymorphism",
      caption:
        "Use interchangeable implementations when branches represent meaningful variants.",
      layers: [
        {
          boxes: [
            "Before: switch(paymentType)",
            "Card Payment Branch",
            "UPI Payment Branch",
            "Wallet Payment Branch",
          ],
        },
        {
          boxes: [
            "PaymentGateway Contract",
            "CardPaymentGateway",
            "UpiPaymentGateway",
            "WalletPaymentGateway",
          ],
        },
        {
          boxes: [
            "New Variants Can Be Added",
            "Stable Workflow Changes Less Often",
          ],
        },
      ],
    },
    {
      title: "7. Remove Duplicated Business Logic",
      caption:
        "Centralize a rule when its copies represent the same concept and should evolve together.",
      layers: [
        {
          boxes: [
            "Checkout Path A: Eligibility Check",
            "Checkout Path B: Duplicate Eligibility Check",
            "Checkout Path C: Duplicate Eligibility Check",
          ],
        },
        {
          boxes: [
            "Shared OrderEligibilityPolicy",
            "Consistent Rule Application",
            "One Place to Change the Rule",
          ],
        },
        {
          boxes: [
            "Do Not Merge Rules with Different Business Meanings",
          ],
        },
      ],
    },
    {
      title: "8. Introduce an Abstraction",
      caption:
        "Separate business logic from a concrete implementation when a useful boundary is needed.",
      layers: [
        {
          boxes: [
            "Before: OrderService Constructs MySqlOrderRepository",
            "Direct Infrastructure Dependency",
          ],
        },
        {
          boxes: [
            "OrderRepository Contract",
            "JpaOrderRepository Implementation",
            "OrderService Depends on Contract",
          ],
        },
        {
          boxes: [
            "Replaceable Implementation",
            "Improved Testing Boundary",
          ],
        },
      ],
    },
    {
      title: "9. Refactor Toward Dependency Inversion",
      caption:
        "High-level policy depends on a suitable abstraction instead of constructing a concrete external client.",
      layers: [
        {
          boxes: [
            "Before: CheckoutService Creates StripePaymentClient",
            "Business Logic Tied to Provider",
          ],
        },
        {
          boxes: [
            "PaymentGateway Contract",
            "StripePaymentGateway Adapter",
            "Constructor Injection",
          ],
        },
        {
          boxes: [
            "Business Logic Isolatable",
            "Alternative Implementations Can Be Supplied",
          ],
        },
      ],
    },
    {
      title: "10. Apply SRP During Refactoring",
      caption:
        "Separate cohesive responsibilities without mechanically creating a class for every method.",
      layers: [
        {
          boxes: [
            "Identify Reasons to Change",
            "Identify Cohesive Behavior",
            "Define Responsibility Ownership",
            "Extract Only Where Valuable",
          ],
        },
        {
          boxes: [
            "Focused Classes",
            "Clear Collaborations",
            "Fewer Unrelated Changes",
          ],
        },
      ],
    },
    {
      title: "11. Apply OCP During Refactoring",
      caption:
        "Protect stable workflow logic from anticipated variations where an extension point is justified.",
      layers: [
        {
          boxes: [
            "Identify Likely Variations",
            "Define Stable Contract",
            "Move Variant Behavior into Implementations",
            "Keep Selection Logic Understandable",
          ],
        },
        {
          boxes: [
            "Extension Without Repeated Central Changes",
            "Avoid Speculative Frameworks",
          ],
        },
      ],
    },
    {
      title: "12. Apply LSP During Refactoring",
      caption:
        "Every implementation must preserve the expected behavior of its abstraction.",
      layers: [
        {
          boxes: [
            "Define Contract Expectations",
            "Check Valid Inputs",
            "Check Expected Outcomes",
            "Check Error Behavior",
          ],
        },
        {
          boxes: [
            "Implementations Remain Substitutable",
            "No Misleading Success",
            "No Unexpected Contract Violations",
          ],
        },
      ],
    },
    {
      title: "13. Apply ISP During Refactoring",
      caption:
        "Split a broad interface when clients or implementations need independently varying capabilities.",
      layers: [
        {
          boxes: [
            "Before: Email + SMS + Push + Fax Interface",
            "Email-Only Implementation",
            "SMS-Only Implementation",
          ],
        },
        {
          boxes: [
            "EmailSender",
            "SmsSender",
            "PushNotifier",
          ],
        },
        {
          boxes: [
            "Clients Depend on Required Capabilities",
            "Avoid Unused Methods",
          ],
        },
      ],
    },
    {
      title: "14. Apply DIP During Refactoring",
      caption:
        "Separate high-level business logic from replaceable infrastructure details.",
      layers: [
        {
          boxes: [
            "Identify Direct Concrete Dependencies",
            "Define a Useful Contract",
            "Implement the Contract",
            "Inject the Dependency",
          ],
        },
        {
          boxes: [
            "Business Logic Depends on Abstraction",
            "Infrastructure Implements Abstraction",
            "Tests Can Supply Controlled Implementations",
          ],
        },
      ],
    },
    {
      title: "15. Run Focused Tests",
      caption:
        "Verify the component immediately after each meaningful structural change.",
      layers: [
        {
          boxes: [
            "Compile the Code",
            "Run Unit Tests",
            "Check Error Paths",
            "Check Edge Cases",
          ],
        },
        {
          boxes: [
            "Fix Differences Before Continuing",
            "Keep Changes Small and Reviewable",
          ],
        },
      ],
    },
    {
      title: "16. Run Regression Tests",
      caption:
        "A locally passing unit test does not guarantee that the complete workflow remains correct.",
      layers: [
        {
          boxes: [
            "Integration Tests",
            "Database Behavior",
            "Transaction Behavior",
            "External Service Interactions",
            "API Compatibility",
          ],
        },
        {
          boxes: [
            "Existing Workflows Still Behave Correctly",
            "Side Effects Remain Correct",
          ],
        },
      ],
    },
    {
      title: "17. Review the Result",
      caption:
        "Evaluate whether the refactoring genuinely improves the design.",
      layers: [
        {
          boxes: [
            "Are Responsibilities Clearer?",
            "Are Dependencies More Appropriate?",
            "Are Contracts Easier to Understand?",
            "Are Tests More Focused?",
            "Is the Complexity Justified?",
          ],
        },
        {
          boxes: [
            "Keep Useful Abstractions",
            "Remove Unnecessary Indirection",
          ],
        },
      ],
    },
    {
      title: "18. Refactoring vs Feature vs Rewrite",
      caption:
        "Keep the purpose and risk of each type of change clear.",
      layers: [
        {
          boxes: [
            "Refactoring — Improve Internal Structure",
            "Feature — Change or Add Functionality",
            "Rewrite — Replace a Larger Implementation",
          ],
        },
        {
          boxes: [
            "Separate Behavior Changes Where Practical",
            "Plan Migration for Rewrites",
            "Verify Existing Behavior During Refactoring",
          ],
        },
      ],
    },
    {
      title: "19. Common Refactoring Mistakes",
      caption:
        "A refactoring is not successful merely because the code is shorter or contains more classes.",
      layers: [
        {
          boxes: [
            "Splitting Classes by Line Count Alone",
            "Turning Every Conditional into Polymorphism",
            "Merging Unrelated Business Rules",
            "Adding Interfaces Without Purpose",
            "Testing Only the Happy Path",
            "Rewriting Without a Safety Net",
          ],
        },
        {
          boxes: [
            "Choose the Smallest Useful Change",
            "Preserve Behavior",
            "Validate the Result",
          ],
        },
      ],
    },
    {
      title: "20. Final Refactoring Workflow",
      caption:
        "Follow a repeatable process from identifying a smell to verifying the improved design.",
      layers: [
        {
          boxes: [
            "1. Identify the Problem",
            "2. Understand Existing Behavior",
            "3. Establish Tests",
            "4. Select the Refactoring",
            "5. Make a Small Change",
            "6. Run Focused Tests",
            "7. Run Regression Tests",
            "8. Review and Repeat",
          ],
        },
      ],
    },
    {
      title: "21. Final Mental Model",
      caption:
        "Refactoring is controlled structural improvement supported by evidence that existing behavior remains correct.",
      layers: [
        {
          boxes: [
            "Understand Before Changing",
            "Improve Structure Incrementally",
            "Use SOLID Where It Helps",
            "Test Observable Behavior",
            "Avoid Unnecessary Complexity",
          ],
        },
        {
          boxes: [
            "Clearer Code",
            "Better Responsibility Boundaries",
            "Safer Future Changes",
          ],
        },
      ],
    },
  ],
},
"uml-diagrams": {
  topicId: "uml-diagrams",
  type: "stage-flow",
  summary:
    "Read UML systematically: identify the diagram type, decode notation, interpret relationships and multiplicity, trace behavior where relevant, and translate the model into Java without assuming unspecified implementation details.",
  stages: [
    {
      title: "1. What Is UML?",
      caption:
        "UML provides standardized notation for communicating software structure and behavior.",
      layers: [
        {
          boxes: [
            "Unified Modeling Language",
            "Standardized Visual Notation",
            "Model Structure",
            "Model Behavior",
            "Communicate Design Decisions",
          ],
        },
      ],
    },
    {
      title: "2. Structural vs Behavioral",
      caption:
        "Select the diagram based on the question you need to answer.",
      layers: [
        {
          boxes: [
            "Structural: What Exists?",
            "Class Diagram",
            "Object Diagram",
            "Component Diagram",
            "Deployment Diagram",
          ],
        },
        {
          boxes: [
            "Behavioral: What Happens?",
            "Sequence Diagram",
            "Activity Diagram",
            "State Machine Diagram",
            "Use-Case Diagram",
          ],
        },
      ],
    },
    {
      title: "3. Class Diagram Anatomy",
      caption:
        "A class box commonly contains the name, attributes, and operations.",
      layers: [
        {
          boxes: [
            "Order",
            "-orderId: Long",
            "-status: OrderStatus",
            "+calculateTotal(): BigDecimal",
          ],
        },
        {
          boxes: [
            "Name",
            "Attributes",
            "Operations",
            "Visibility",
          ],
        },
      ],
    },
    {
      title: "4. Visibility Symbols",
      caption:
        "Visibility notation communicates access to attributes and operations.",
      layers: [
        {
          boxes: [
            "+ Public",
            "- Private",
            "# Protected",
            "~ Package Visibility",
          ],
        },
        {
          boxes: [
            "Encapsulation",
            "Access Control",
            "Java Member Mapping",
          ],
        },
      ],
    },
    {
      title: "5. Association",
      caption:
        "Association represents a structural relationship between classifiers.",
      layers: [
        {
          boxes: [
            "Customer",
            "Customer — Order",
            "One Customer Can Have Many Orders",
          ],
        },
        {
          boxes: [
            "Structural Link",
            "Multiplicity",
            "Optional Navigability",
            "Ownership Not Implied Automatically",
          ],
        },
      ],
    },
    {
      title: "6. Multiplicity",
      caption:
        "Read multiplicity at the association end it constrains.",
      layers: [
        {
          boxes: [
            "1 — Exactly One",
            "0..1 — Zero or One",
            "0..* — Zero or Many",
            "1..* — One or More",
            "2..5 — Bounded Range",
          ],
        },
        {
          boxes: [
            "Single Reference",
            "Optional Reference",
            "Collection",
            "Domain Constraint",
          ],
        },
      ],
    },
    {
      title: "7. Navigability",
      caption:
        "An association does not automatically require references in both directions.",
      layers: [
        {
          boxes: [
            "Order Holds Customer Reference",
            "Customer Need Not Hold Orders Collection",
          ],
        },
        {
          boxes: [
            "One-Way Navigation",
            "Two-Way Navigation",
            "Choose Fields Based on Requirements",
          ],
        },
      ],
    },
    {
      title: "8. Dependency",
      caption:
        "A dependency indicates usage or reliance, commonly drawn as a dashed arrow.",
      layers: [
        {
          boxes: [
            "ReportService",
            "Uses PdfGenerator",
            "Dashed Arrow Toward Supplier",
          ],
        },
        {
          boxes: [
            "Usage Relationship",
            "Changes May Affect Client",
            "Persistent Field Not Required in Every Case",
          ],
        },
      ],
    },
    {
      title: "9. Generalization",
      caption:
        "A solid line with a hollow triangle points toward the general classifier.",
      layers: [
        {
          boxes: [
            "SavingsAccount",
            "CurrentAccount",
            "Account",
          ],
        },
        {
          boxes: [
            "Solid Line",
            "Hollow Triangle at Parent",
            "Java: extends",
          ],
        },
      ],
    },
    {
      title: "10. Realization",
      caption:
        "A dashed line with a hollow triangle points toward the interface or specification.",
      layers: [
        {
          boxes: [
            "CardPaymentGateway",
            "PaymentGateway",
          ],
        },
        {
          boxes: [
            "Dashed Line",
            "Hollow Triangle at Interface",
            "Java: implements",
            "Contract Fulfillment",
          ],
        },
      ],
    },
    {
      title: "11. Aggregation vs Composition",
      caption:
        "Both model whole-part relationships, but composition expresses stronger ownership.",
      layers: [
        {
          boxes: [
            "Aggregation: Hollow Diamond",
            "Parts Can Exist Independently",
          ],
        },
        {
          boxes: [
            "Composition: Filled Diamond",
            "Strong Whole-Part Ownership",
            "Lifecycle Constraints",
          ],
        },
        {
          boxes: [
            "Diamond at Whole End",
            "Model Domain Semantics",
            "Not Automatic Java Object Deletion",
          ],
        },
      ],
    },
    {
      title: "12. Relationship Quick Reference",
      caption:
        "Decode the line and arrowhead before interpreting the design.",
      layers: [
        {
          boxes: [
            "Association: Solid Line",
            "Dependency: Dashed Arrow",
            "Generalization: Solid Line + Hollow Triangle",
            "Realization: Dashed Line + Hollow Triangle",
            "Aggregation: Hollow Diamond",
            "Composition: Filled Diamond",
          ],
        },
      ],
    },
    {
      title: "13. Sequence Diagram",
      caption:
        "Sequence diagrams show participants and messages in time order.",
      layers: [
        {
          boxes: [
            "Customer",
            "CheckoutController",
            "CheckoutService",
            "PaymentGateway",
            "OrderRepository",
          ],
        },
        {
          boxes: [
            "Participants",
            "Lifelines",
            "Activation Bars",
            "Messages",
            "Return Messages",
          ],
        },
      ],
    },
    {
      title: "14. Sequence Fragment Operators",
      caption:
        "Combined fragments express alternatives, optional behavior, and repetition.",
      layers: [
        {
          boxes: [
            "alt — Alternative Paths",
            "opt — Optional Interaction",
            "loop — Repeated Interaction",
          ],
        },
        {
          boxes: [
            "Guard Conditions",
            "Success and Failure Branches",
            "Explicit Loop Conditions",
          ],
        },
      ],
    },
    {
      title: "15. Object Diagram",
      caption:
        "An object diagram shows concrete instances and links at one point in time.",
      layers: [
        {
          boxes: [
            "customer1:Customer",
            "order101:Order",
            "item1:OrderItem",
            "item2:OrderItem",
          ],
        },
        {
          boxes: [
            "Concrete Instances",
            "Instance-Level Links",
            "Snapshot of Object Structure",
          ],
        },
      ],
    },
    {
      title: "16. Use-Case Diagram",
      caption:
        "Use-case diagrams show actors and the goals they interact with.",
      layers: [
        {
          boxes: [
            "Member",
            "Search Books",
            "Borrow Book",
            "Return Book",
          ],
        },
        {
          boxes: [
            "Actors",
            "System Goals",
            "Functional Scope",
          ],
        },
      ],
    },
    {
      title: "17. Activity Diagram",
      caption:
        "Activity diagrams describe workflow, decisions, and potentially parallel paths.",
      layers: [
        {
          boxes: [
            "Place Order",
            "Validate Cart",
            "Decision: Valid?",
            "Process Payment",
            "Confirm Order",
          ],
        },
        {
          boxes: [
            "Actions",
            "Decision Nodes",
            "Merge Nodes",
            "Fork and Join",
            "Start and End",
          ],
        },
      ],
    },
    {
      title: "18. State Machine Diagram",
      caption:
        "State machines model lifecycle states and the events or conditions that trigger transitions.",
      layers: [
        {
          boxes: [
            "CREATED",
            "CONFIRMED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
          ],
        },
        {
          boxes: [
            "Events",
            "Transitions",
            "Guards",
            "Actions",
            "Valid and Invalid State Changes",
          ],
        },
      ],
    },
    {
      title: "19. Component vs Deployment",
      caption:
        "Use component diagrams for software modules and deployment diagrams for runtime placement.",
      layers: [
        {
          boxes: [
            "Component Diagram",
            "Order Module",
            "Payment Module",
            "Notification Module",
          ],
        },
        {
          boxes: [
            "Deployment Diagram",
            "Application Runtime",
            "Database Node",
            "Deployed Artifacts",
          ],
        },
      ],
    },
    {
      title: "20. Translate UML into Java",
      caption:
        "Map diagram elements to Java constructs only after understanding the relationship semantics.",
      layers: [
        {
          boxes: [
            "Class → Java Class",
            "Interface → Java Interface",
            "Generalization → extends",
            "Realization → implements",
            "Attribute → Field",
            "Operation → Method",
          ],
        },
        {
          boxes: [
            "Association → Reference or Collection",
            "Multiplicity → Cardinality Constraint",
            "Composition → Ownership Rules",
            "Dependency → Usage Relationship",
          ],
        },
      ],
    },
    {
      title: "21. Read an Unfamiliar Diagram",
      caption:
        "Follow a systematic interpretation process rather than guessing from the lines.",
      layers: [
        {
          boxes: [
            "1. Identify Diagram Type",
            "2. Identify Elements",
            "3. Decode Notation",
            "4. Read Multiplicity",
            "5. Check Direction",
            "6. Explain in Domain Terms",
          ],
        },
        {
          boxes: [
            "Separate Facts from Assumptions",
            "Identify Unspecified Details",
            "Translate Only What Requirements Support",
          ],
        },
      ],
    },
    {
      title: "22. UML Interview Mental Model",
      caption:
        "Choose the diagram that answers the question and keep it appropriately detailed.",
      layers: [
        {
          boxes: [
            "Class Diagram — Static Structure",
            "Sequence Diagram — Interactions",
            "Object Diagram — Instance Snapshot",
            "Use-Case Diagram — Actor Goals",
            "Activity Diagram — Workflow",
            "State Machine — Lifecycle",
            "Component Diagram — Software Modules",
            "Deployment Diagram — Runtime Placement",
          ],
        },
      ],
    },
  ],
},
"class-diagram-design": {
  topicId: "class-diagram-design",
  type: "stage-flow",
  summary: "Translate requirements into a cohesive object-oriented model by identifying classes, assigning responsibilities, defining relationships and multiplicities, choosing useful abstractions, and validating the design against real use cases.",
  stages: [
    {
      title: "1. Start with Requirements",
      caption: "Understand what the system must do before drawing classes.",
      layers: [
        {
          boxes: [
            "Identify actors and use cases",
            "Clarify functional requirements",
            "Identify business rules and invariants",
            "Capture important edge cases"
          ]
        },
        {
          boxes: [
            "Do not start with design patterns",
            "Do not turn every noun into a class"
          ]
        }
      ]
    },
    {
      title: "2. Discover Domain Concepts",
      caption: "Identify the objects that represent meaningful domain concepts.",
      layers: [
        {
          boxes: [
            "Entities: identity over time",
            "Value Objects: meaning through values",
            "Services: coordination or domain operations",
            "External Systems: integration boundaries"
          ]
        },
        {
          boxes: [
            "Customer",
            "Product",
            "Order",
            "Payment"
          ]
        }
      ]
    },
    {
      title: "3. Assign Responsibilities",
      caption: "Decide which object owns each piece of state and behavior.",
      layers: [
        {
          boxes: [
            "Order owns order state",
            "OrderItem represents a purchased line",
            "Payment handles payment-related state",
            "CheckoutService coordinates checkout"
          ]
        },
        {
          boxes: [
            "High Cohesion",
            "Low Unnecessary Coupling",
            "Protected Invariants"
          ]
        }
      ]
    },
    {
      title: "4. Define Class Structure",
      caption: "Describe the state and behavior needed for each class.",
      layers: [
        {
          boxes: [
            "Class Name",
            "Attributes",
            "Operations"
          ]
        },
        {
          boxes: [
            "Field types and meaningful visibility",
            "Important method parameters and return types",
            "Business behavior and invariants"
          ]
        },
        {
          boxes: [
            "Avoid clutter from every getter and setter",
            "Encapsulate mutable state"
          ]
        }
      ]
    },
    {
      title: "5. Choose Relationships",
      caption: "Use the relationship that accurately represents the domain.",
      layers: [
        {
          boxes: [
            "Association: structural relationship",
            "Dependency: usage relationship",
            "Generalization: inheritance",
            "Realization: implements a contract",
            "Aggregation: weak whole-part",
            "Composition: strong ownership"
          ]
        },
        {
          boxes: [
            "Do not confuse reference with ownership",
            "Do not confuse inheritance with realization"
          ]
        }
      ]
    },
    {
      title: "6. Define Multiplicity",
      caption: "Specify how many objects may participate in each relationship.",
      layers: [
        {
          boxes: [
            "1 = exactly one",
            "0..1 = optional single",
            "0..* = zero or many",
            "1..* = one or many"
          ]
        },
        {
          boxes: [
            "Customer 1 → Order 0..*",
            "Order 1 → OrderItem 1..*"
          ]
        },
        {
          boxes: [
            "Validate optional versus mandatory relationships",
            "Enforce required constraints in code"
          ]
        }
      ]
    },
    {
      title: "7. Decide Navigability",
      caption: "Add references only in the directions needed by the use cases.",
      layers: [
        {
          boxes: [
            "Unidirectional association",
            "Bidirectional association"
          ]
        },
        {
          boxes: [
            "Reduce unnecessary references",
            "Avoid redundant relationship state",
            "Keep navigation requirements explicit"
          ]
        }
      ]
    },
    {
      title: "8. Choose Abstractions",
      caption: "Separate stable contracts from implementations where it adds value.",
      layers: [
        {
          boxes: [
            "PaymentProcessor",
            "CardPaymentProcessor",
            "UpiPaymentProcessor"
          ]
        },
        {
          boxes: [
            "Service depends on the interface",
            "Implementations realize the contract",
            "Composition enables replacement"
          ]
        },
        {
          boxes: [
            "Use abstractions for real variation",
            "Avoid speculative interfaces"
          ]
        }
      ]
    },
    {
      title: "9. Protect Domain Rules",
      caption: "Keep the object model capable of enforcing valid state.",
      layers: [
        {
          boxes: [
            "Private state",
            "Controlled state transitions",
            "Validation of invariants"
          ]
        },
        {
          boxes: [
            "Prevent invalid order confirmation",
            "Handle payment success and failure",
            "Keep business rules out of controllers"
          ]
        }
      ]
    },
    {
      title: "10. Apply Design Principles",
      caption: "Check the model for maintainability and sensible responsibilities.",
      layers: [
        {
          boxes: [
            "SRP: focused responsibilities",
            "OCP: extension without unnecessary modification",
            "LSP: valid behavioral substitutability",
            "ISP: focused contracts",
            "DIP: depend on abstractions"
          ]
        },
        {
          boxes: [
            "Prefer composition for flexible behavior",
            "Use inheritance for genuine is-a relationships",
            "Avoid God classes and deep fragile hierarchies"
          ]
        }
      ]
    },
    {
      title: "11. Trace the Main Use Case",
      caption: "Check that the classes can collaborate to complete the required workflow.",
      layers: [
        {
          boxes: [
            "Customer adds products to Cart",
            "Cart contains CartItems",
            "CheckoutService creates an Order",
            "PaymentProcessor processes payment",
            "Order transitions to the appropriate state"
          ]
        },
        {
          boxes: [
            "Check responsibility ownership",
            "Check relationship multiplicity",
            "Check state transitions"
          ]
        }
      ]
    },
    {
      title: "12. Test Failure Scenarios",
      caption: "A valid model must also account for important errors and edge cases.",
      layers: [
        {
          boxes: [
            "Payment declined",
            "Insufficient inventory",
            "Duplicate checkout request",
            "Cancellation or refund",
            "Invalid state transition"
          ]
        },
        {
          boxes: [
            "Identify missing responsibilities",
            "Clarify recovery and consistency rules",
            "Update the model where necessary"
          ]
        }
      ]
    },
    {
      title: "13. Translate to Java",
      caption: "Turn the model into suitable implementation structures.",
      layers: [
        {
          boxes: [
            "Classes → Java classes",
            "Contracts → Java interfaces",
            "Multiplicity → references or collections",
            "Operations → methods",
            "Constraints → validation and business rules"
          ]
        },
        {
          boxes: [
            "Use persistence mappings where required",
            "Do not assume UML alone enforces constraints"
          ]
        }
      ]
    },
    {
      title: "14. Final Design Review",
      caption: "Explain the model and defend its important decisions.",
      layers: [
        {
          boxes: [
            "Are all required use cases supported?",
            "Does every class have a clear responsibility?",
            "Are relationships and multiplicities correct?",
            "Are abstractions justified?",
            "Are important edge cases covered?"
          ]
        },
        {
          boxes: [
            "Explain one main flow",
            "Explain one failure case",
            "Justify the key trade-offs"
          ]
        }
      ]
    }
  ]
},
"object-interaction-sequence-diagrams": {
  topicId: "object-interaction-sequence-diagrams",
  type: "stage-flow",
  summary: "Model how runtime objects collaborate to execute a use case. Identify participants, arrange lifelines, show messages in time order, express alternatives and loops, account for failure paths, and validate the interaction against the class design.",
  stages: [
    {
      title: "1. Select a Use Case",
      caption: "Model one meaningful scenario rather than the whole application.",
      layers: [
        {
          boxes: [
            "Checkout",
            "Booking",
            "Login",
            "Payment"
          ]
        },
        {
          boxes: [
            "Identify the trigger",
            "Define the expected result",
            "Capture preconditions",
            "Identify important failure outcomes"
          ]
        }
      ]
    },
    {
      title: "2. Identify Participants",
      caption: "Choose the objects or components that collaborate in this scenario.",
      layers: [
        {
          boxes: [
            "Customer",
            "CheckoutController",
            "CheckoutService",
            "PaymentProcessor",
            "OrderRepository"
          ]
        },
        {
          boxes: [
            "Use meaningful runtime participants",
            "Avoid creating a participant for every method",
            "Reuse the class diagram's responsibilities"
          ]
        }
      ]
    },
    {
      title: "3. Draw Lifelines",
      caption: "Place participants horizontally and show their vertical lifelines.",
      layers: [
        {
          boxes: [
            "Participant A",
            "Participant B",
            "Participant C"
          ]
        },
        {
          boxes: [
            "Vertical line = lifeline",
            "Horizontal separation = participants",
            "Top-to-bottom ordering = time"
          ]
        }
      ]
    },
    {
      title: "4. Establish Message Order",
      caption: "Show the important operations in the order they occur.",
      layers: [
        {
          boxes: [
            "Customer → CheckoutController",
            "CheckoutController → CheckoutService",
            "CheckoutService → InventoryService",
            "CheckoutService → PaymentProcessor"
          ]
        },
        {
          boxes: [
            "Use meaningful operation names",
            "Show important dependencies",
            "Avoid unnecessary low-level calls"
          ]
        }
      ]
    },
    {
      title: "5. Show Execution and Responses",
      caption: "Clarify nested calls and results that affect subsequent behavior.",
      layers: [
        {
          boxes: [
            "Activation bar = execution specification",
            "Synchronous call = caller waits",
            "Return message = response",
            "Self-message = internal invocation"
          ]
        },
        {
          boxes: [
            "PaymentResult",
            "InventoryReservationResult",
            "OrderStatus"
          ]
        }
      ]
    },
    {
      title: "6. Model Alternatives",
      caption: "Represent mutually exclusive outcomes with conditional branches.",
      layers: [
        {
          boxes: [
            "alt [payment succeeds]",
            "Confirm the order"
          ]
        },
        {
          boxes: [
            "else [payment fails]",
            "Record the appropriate failure or pending state"
          ]
        },
        {
          boxes: [
            "Use guards to explain branch selection",
            "Do not execute mutually exclusive paths together"
          ]
        }
      ]
    },
    {
      title: "7. Model Optional Behavior",
      caption: "Represent interactions that occur only when a condition holds.",
      layers: [
        {
          boxes: [
            "opt [customer opted in]",
            "Send notification"
          ]
        },
        {
          boxes: [
            "Condition true → execute interaction",
            "Condition false → skip interaction"
          ]
        }
      ]
    },
    {
      title: "8. Model Repetition",
      caption: "Represent repeated interactions without drawing the same calls over and over.",
      layers: [
        {
          boxes: [
            "loop [for each order item]",
            "Validate item",
            "Check inventory"
          ]
        },
        {
          boxes: [
            "Specify a meaningful guard",
            "Bound retries when applicable",
            "Show what happens when processing stops"
          ]
        }
      ]
    },
    {
      title: "9. Handle Validation Failures",
      caption: "Show how invalid requests and business-rule violations affect the flow.",
      layers: [
        {
          boxes: [
            "Invalid request",
            "Insufficient inventory",
            "Unauthorized operation"
          ]
        },
        {
          boxes: [
            "Identify the responsible validator",
            "Return or propagate the appropriate failure",
            "Prevent invalid state transitions"
          ]
        }
      ]
    },
    {
      title: "10. Handle External Failures",
      caption: "Make remote dependency behavior explicit where correctness depends on it.",
      layers: [
        {
          boxes: [
            "Timeout",
            "Connection failure",
            "Rejected request",
            "Unknown operation outcome"
          ]
        },
        {
          boxes: [
            "Bound waiting time",
            "Retry only when appropriate",
            "Use idempotency for repeated side effects",
            "Reconcile ambiguous payment results"
          ]
        }
      ]
    },
    {
      title: "11. Model Asynchronous Work",
      caption: "Separate request acceptance from background processing.",
      layers: [
        {
          boxes: [
            "OrderService publishes OrderPlaced",
            "Message broker accepts the event",
            "NotificationConsumer processes the event"
          ]
        },
        {
          boxes: [
            "Sender need not wait for processing",
            "Account for delivery and processing failures",
            "Handle duplicates where required",
            "Consider eventual consistency"
          ]
        }
      ]
    },
    {
      title: "12. Keep Responsibilities Clear",
      caption: "Ensure each participant performs the behavior it should own.",
      layers: [
        {
          boxes: [
            "Controller: request entry point",
            "Application Service: workflow coordination",
            "Domain Object: business invariants",
            "Repository: persistence",
            "External Adapter: provider integration"
          ]
        },
        {
          boxes: [
            "Avoid God services",
            "Avoid business logic in controllers",
            "Use abstractions at meaningful boundaries"
          ]
        }
      ]
    },
    {
      title: "13. Validate Against the Class Diagram",
      caption: "Check that every important message has a plausible owner and contract.",
      layers: [
        {
          boxes: [
            "Participants exist in the static model",
            "Operations match responsibilities",
            "Dependencies are justified",
            "State transitions are valid"
          ]
        },
        {
          boxes: [
            "Fix missing operations",
            "Revise incorrect responsibilities",
            "Update either model when the design changes"
          ]
        }
      ]
    },
    {
      title: "14. Review the Trade-Offs",
      caption: "Discuss the implications of the chosen interaction design.",
      layers: [
        {
          boxes: [
            "Synchronous vs asynchronous",
            "Direct calls vs orchestration",
            "Simple flow vs detailed alternatives",
            "Retries vs duplicate side effects"
          ]
        },
        {
          boxes: [
            "Latency",
            "Availability",
            "Consistency",
            "Complexity",
            "Recoverability"
          ]
        }
      ]
    },
    {
      title: "15. Explain the Final Design",
      caption: "Walk the interviewer through the normal flow and one important failure.",
      layers: [
        {
          boxes: [
            "Start with the triggering request",
            "Explain the main message sequence",
            "Describe key decisions",
            "Show the result returned to the caller"
          ]
        },
        {
          boxes: [
            "Trace one failure path",
            "Explain important design choices",
            "Confirm consistency with the class diagram"
          ]
        }
      ]
    }
  ]
},
"lld-interview-approach": {
  topicId: "lld-interview-approach",
  type: "stage-flow",
  summary: "A repeatable interview workflow that moves from requirements to domain modeling, class design, object interactions, edge-case validation, implementation decisions, and trade-off explanations.",
  stages: [
    {
      title: "1. Understand the Problem",
      caption: "Establish what you are actually being asked to design.",
      layers: [
        {
          boxes: [
            "Restate the problem",
            "Identify the expected outcome",
            "Clarify the scope"
          ]
        },
        {
          boxes: [
            "Avoid premature coding",
            "Avoid assumptions that change the design"
          ]
        }
      ]
    },
    {
      title: "2. Clarify Requirements",
      caption: "Ask high-value questions and state reasonable assumptions.",
      layers: [
        {
          boxes: [
            "Functional requirements",
            "Business rules",
            "Constraints",
            "Important edge cases"
          ]
        },
        {
          boxes: [
            "What must the system support?",
            "What is explicitly out of scope?",
            "What assumptions are reasonable?"
          ]
        }
      ]
    },
    {
      title: "3. Identify Domain Objects",
      caption: "Discover meaningful concepts from the requirements.",
      layers: [
        {
          boxes: [
            "Entities",
            "Value Objects",
            "Domain Services",
            "Application Services"
          ]
        },
        {
          boxes: [
            "Identity and lifecycle",
            "State and behavior",
            "Business rules",
            "External boundaries"
          ]
        }
      ]
    },
    {
      title: "4. Assign Responsibilities",
      caption: "Decide which object owns each behavior and piece of state.",
      layers: [
        {
          boxes: [
            "State ownership",
            "Business invariants",
            "Validation",
            "Workflow coordination"
          ]
        },
        {
          boxes: [
            "High cohesion",
            "Low unnecessary coupling",
            "Avoid God classes"
          ]
        }
      ]
    },
    {
      title: "5. Design the Class Model",
      caption: "Define the core classes and their relationships.",
      layers: [
        {
          boxes: [
            "Class names",
            "Important attributes",
            "Operations",
            "Visibility and types"
          ]
        },
        {
          boxes: [
            "Association",
            "Dependency",
            "Inheritance",
            "Realization",
            "Aggregation and composition"
          ]
        }
      ]
    },
    {
      title: "6. Choose Abstractions",
      caption: "Introduce interfaces and patterns only when they solve a real problem.",
      layers: [
        {
          boxes: [
            "Identify implementation variation",
            "Define meaningful contracts",
            "Use dependency injection where appropriate"
          ]
        },
        {
          boxes: [
            "Apply SOLID thoughtfully",
            "Prefer composition when appropriate",
            "Avoid speculative abstraction"
          ]
        }
      ]
    },
    {
      title: "7. Explain the Class Diagram",
      caption: "Communicate the structure before tracing runtime behavior.",
      layers: [
        {
          boxes: [
            "Core classes",
            "Responsibilities",
            "Relationships",
            "Important multiplicities"
          ]
        },
        {
          boxes: [
            "Justify key decisions",
            "Explain ownership",
            "Keep the diagram readable"
          ]
        }
      ]
    },
    {
      title: "8. Trace the Main Use Case",
      caption: "Show how the objects collaborate to complete the workflow.",
      layers: [
        {
          boxes: [
            "Triggering request",
            "Application service",
            "Domain behavior",
            "Persistence or external calls",
            "Final result"
          ]
        },
        {
          boxes: [
            "Sequence diagram",
            "Message ordering",
            "Relevant responses",
            "State transitions"
          ]
        }
      ]
    },
    {
      title: "9. Validate Edge Cases",
      caption: "Test the design mentally against important alternative outcomes.",
      layers: [
        {
          boxes: [
            "Invalid input",
            "Resource unavailable",
            "Operation rejected",
            "Duplicate request"
          ]
        },
        {
          boxes: [
            "Explicit failure behavior",
            "Valid state transitions",
            "Recovery or compensation where needed"
          ]
        }
      ]
    },
    {
      title: "10. Consider Concurrency",
      caption: "Protect invariants when operations can overlap.",
      layers: [
        {
          boxes: [
            "Identify shared mutable state",
            "Define the atomicity boundary",
            "Choose a suitable protection mechanism"
          ]
        },
        {
          boxes: [
            "Transactions",
            "Conditional updates",
            "Database constraints",
            "Scoped synchronization"
          ]
        },
        {
          boxes: [
            "Avoid unnecessary locks",
            "Account for multiple application instances"
          ]
        }
      ]
    },
    {
      title: "11. Review SOLID and Patterns",
      caption: "Improve the design where a real weakness exists.",
      layers: [
        {
          boxes: [
            "SRP: cohesive responsibility",
            "OCP: justified extension",
            "LSP: safe substitution",
            "ISP: focused contracts",
            "DIP: appropriate abstractions"
          ]
        },
        {
          boxes: [
            "Identify the design pressure first",
            "Use patterns when justified",
            "Remove unnecessary complexity"
          ]
        }
      ]
    },
    {
      title: "12. Translate to Java",
      caption: "Turn the model into an implementable design.",
      layers: [
        {
          boxes: [
            "Classes and interfaces",
            "Collections and relationships",
            "Methods and encapsulation",
            "Exceptions and validation"
          ]
        },
        {
          boxes: [
            "Persistence boundaries",
            "Dependency injection",
            "Unit testing",
            "Concurrency mechanisms where required"
          ]
        }
      ]
    },
    {
      title: "13. Discuss Trade-Offs",
      caption: "Explain why your design fits the stated constraints.",
      layers: [
        {
          boxes: [
            "Simplicity vs extensibility",
            "Inheritance vs composition",
            "Direct calls vs abstractions",
            "Concurrency safety vs complexity"
          ]
        },
        {
          boxes: [
            "What does the design improve?",
            "What complexity does it introduce?",
            "What would change if requirements changed?"
          ]
        }
      ]
    },
    {
      title: "14. Refine and Conclude",
      caption: "Validate completeness and correct weaknesses before finalizing.",
      layers: [
        {
          boxes: [
            "Trace required use cases",
            "Check class responsibilities",
            "Verify invariants",
            "Review failure paths"
          ]
        },
        {
          boxes: [
            "Correct missing behavior",
            "Remove unnecessary abstractions",
            "Summarize the final design",
            "Explain the main trade-offs"
          ]
        }
      ]
    }
  ]
},




};

export const getTopicVisualization = (
  topicId: string,
): TopicVisualization | undefined => systemDesignVisuals[topicId];
