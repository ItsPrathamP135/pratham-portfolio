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
    "cdn": {
    topicId: "cdn",
    type: "stage-flow",
    summary: "A CDN serves cacheable content from an edge location near the user, only reaching the origin when the edge doesn't already have it.",
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
        caption: "The edge fetches from origin once, then serves future requests from cache.",
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
        caption: "They coexist — CDN handles cacheable content, LB distributes what reaches the backend.",
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
        caption: "Object storage holds the files; the CDN delivers them efficiently.",
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
        caption: "A popular object expiring at the wrong moment can flood the origin all at once.",
        layers: [
          { boxes: ["Popular object expires"] },
          { boxes: ["10,000 users request it simultaneously"] },
          { boxes: ["All requests miss cache"] },
          { boxes: ["10,000 requests hit origin at once"] },
        ],
      },
    ],
  },  
  "hashing": {
    topicId: "hashing",
    type: "stage-flow",
    summary: "Plain modulo hashing breaks when the node count changes — consistent hashing (with virtual nodes) fixes that by minimizing how much remaps.",
    stages: [
      {
        title: "Basic Hashing",
        caption: "The same input always deterministically maps to the same hash value.",
        layers: [
          { boxes: ["User ID = 101"] },
          { boxes: ["hash(101)"] },
          { boxes: ["Hash Value"] },
          { boxes: ["Bucket / Server"] },
        ],
      },
      {
        title: "Collision",
        caption: "Different keys can land in the same bucket — this is normal, not a bug.",
        layers: [
          { boxes: ["Key A → hash() → Bucket 3", "Key B → hash() → Bucket 3"] },
        ],
      },
      {
        title: "Collision Handling",
        caption: "Chaining stores multiple entries per bucket; open addressing finds the next free slot.",
        layers: [
          { boxes: ["Chaining: Bucket 3 → Key A → Key B → Key C"] },
          { boxes: ["Open Addressing: Bucket 3 full → try Bucket 4 → try Bucket 5"] },
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
        caption: "Changing N reshuffles most keys, not just ones tied to the change.",
        layers: [
          { boxes: ["Before: N=3 — KeyA→S0, KeyB→S1, KeyC→S2"] },
          { boxes: ["After: N=4 — many keys now map to a different server"] },
          { boxes: ["Cache misses · Data migration · Rebalancing · Instability"] },
        ],
      },
      {
        title: "Consistent Hashing Ring",
        caption: "Keys and nodes share a ring; a key is owned by the next node clockwise.",
        layers: [
          { boxes: ["Ring: S1=15, S2=40, S3=65, S4=90"] },
          { boxes: ["Key = 50 (between S2 and S3)"] },
          { boxes: ["Clockwise next → S3"] },
          { boxes: ["Key 50 → S3"] },
        ],
      },
      {
        title: "Wrap-Around",
        caption: "The ring loops back to the start — nothing falls off the end.",
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
        caption: "One ring position per physical node can divide the ring unevenly.",
        layers: [
          { boxes: ["S1 owns a very large section", "S2 owns a small section", "S3 owns a small section"] },
          { boxes: ["Hotspots · Uneven CPU/memory/request load"] },
        ],
      },
      {
        title: "Virtual Nodes",
        caption: "Each physical server gets multiple ring positions, smoothing distribution.",
        layers: [
          { boxes: ["Physical S1 → V1, V2, V3, V4"] },
          { boxes: ["Physical S2 → V5, V6, V7, V8"] },
        ],
      },
      {
        title: "Virtual Node Failure & Cascading Failure",
        caption: "Spreading a node's ranges reduces concentrated impact when it fails.",
        layers: [
          { boxes: ["S1 (V1, V2, V3) fails"] },
          { boxes: ["Ranges distributed across multiple surviving servers"] },
          { boxes: ["vs. no virtual nodes: S1 fails → S2 overloaded → S2 fails → S3 overloaded"] },
        ],
      },
      {
        title: "Real System Use Cases",
        caption: "The same idea shows up across caching, sharding, and routing.",
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
    summary: "A stateful server remembers you by keeping session data in its own memory; a stateless one doesn't — the state travels in a token or lives in a shared store instead.",
    stages: [
      { title: "What Is State", caption: "Information the server must remember between requests.", layers: [
        { boxes: ["Request 1: POST /login"] },
        { boxes: ["Server creates: User=Pratham, SessionID=ABC123, LoggedIn=true"] },
        { boxes: ["Request 2: GET /profile (SessionID=ABC123)"] },
        { boxes: ["Server must know what ABC123 means"] },
      ]},
      { title: "Stateful Architecture", caption: "The server depends on state remembered from a previous request.", layers: [
        { boxes: ["Client"] }, { boxes: ["Server A"] }, { boxes: ["Local Session"] },
      ]},
      { title: "Stateless Architecture", caption: "Any healthy server can process the request — no dependency on local memory.", layers: [
        { boxes: ["Client"] }, { boxes: ["Load Balancer"] }, { boxes: ["Server A (this request)", "Server B (next request)"] },
      ]},
      { title: "Local Session + Multiple Servers Problem", caption: "A session created on one instance is invisible to the others.", layers: [
        { boxes: ["Load Balancer"] }, { boxes: ["Server A (Session X created)", "Server B (Session X unavailable)"] },
      ]},
      { title: "Sticky Sessions", caption: "The load balancer keeps routing the same user to the same server.", layers: [
        { boxes: ["User A"] }, { boxes: ["Load Balancer"] }, { boxes: ["Server A (every request)"] },
      ]},
      { title: "Sticky Session Server Failure", caption: "Sticky routing doesn't protect the session if that server dies.", layers: [
        { boxes: ["User → Server A → Local Session"] }, { boxes: ["Server A ❌"] }, { boxes: ["User routed to Server B"] }, { boxes: ["Session unavailable (only existed on A)"] },
      ]},
      { title: "Shared Redis Session Store", caption: "Any instance can reach the same session data.", layers: [
        { boxes: ["Load Balancer"] }, { boxes: ["Server A", "Server B"] }, { boxes: ["Redis (shared session store)"] },
      ]},
      { title: "Stateless JWT Authentication", caption: "The proof of identity travels with the request itself.", layers: [
        { boxes: ["Client (holds JWT)"] }, { boxes: ["Authorization: Bearer <token>"] }, { boxes: ["Load Balancer"] }, { boxes: ["Any application server validates the token"] },
      ]},
      { title: "Stateful vs Stateless API", caption: "Does the next request depend on server-created context?", layers: [
        { boxes: ["Stateful: POST /checkout → server creates checkout state → GET /checkout/status needs it"] },
        { boxes: ["Stateless: GET /users/101 + JWT → any server can answer independently"] },
      ]},
      { title: "Horizontal Scaling", caption: "Stateless instances absorb new capacity freely; local state doesn't.", layers: [
        { boxes: ["Load Balancer"] }, { boxes: ["A", "B", "C"] }, { boxes: ["+ D, + E (new instances, no state to migrate)"] },
      ]},
      { title: "Failure Handling — Three Cases", caption: "The blast radius of a server failure depends entirely on where state lives.", layers: [
        { boxes: ["Stateful local session: Server A ❌ → local session lost"] },
        { boxes: ["Stateless: Server A ❌ → LB → Server B → request processed"] },
        { boxes: ["Stateless + external session: Server A ❌ → Server B → Redis → session retrieved"] },
      ]},
      { title: "Session Replication", caption: "Copying session data across instances — a different trade-off from centralizing it.", layers: [
        { boxes: ["Server A has session"] }, { boxes: ["Session replicated to Server B"] }, { boxes: ["A fails → B still has a copy"] },
      ]},
      { title: "Architecture Comparison", caption: "Three ways to handle the same problem, in increasing scalability.", layers: [
        { boxes: ["A. Stateful local: Client → LB → Server A → Local Session"] },
        { boxes: ["B. Stateful + shared session: Client → LB → A/B/C → Redis Session Store"] },
        { boxes: ["C. Stateless + JWT: Client (JWT) → LB → A/B/C, no shared session needed"] },
      ]},
    ],
  },
};

export const getTopicVisualization = (topicId: string): TopicVisualization | undefined =>
  systemDesignVisuals[topicId];