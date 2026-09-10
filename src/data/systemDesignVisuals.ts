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
};

export const getTopicVisualization = (
  topicId: string,
): TopicVisualization | undefined => systemDesignVisuals[topicId];
