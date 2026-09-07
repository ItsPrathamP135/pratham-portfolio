

// ============================================================
// System Design — Topic Content
// ============================================================
// Single source of truth for What/Why/How/When/Trade-offs/
// Interview Questions, keyed by blockId. Only BLK 01 is
// populated right now — add more entries here as you study
// each block. No UI component needs to change when you do.

import type { TopicContent } from "../Type/systemDesignTopic";

export const systemDesignTopics: Record<string, TopicContent> = {
  "system-design-introduction": {
    blockId: "system-design-introduction",
    categoryId: "hld-fundamentals",

    what: [
      "A software system is a set of components — servers, databases, caches, queues, clients — working together to deliver some functionality reliably, at a given scale.",
      "System Design is the process of deciding how those components fit together: what each one is responsible for, how they communicate, where data lives, and how the system behaves under load, failure, and growth.",
      "It's more than drawing boxes and arrows. A diagram is the output; the actual work is reasoning about requirements, trade-offs, and constraints that led to that diagram.",
      "During System Design you're making decisions like: What does this system need to do (functional)? How fast, how available, how consistent does it need to be (non-functional)? How much traffic and data are we planning for? What breaks first as we scale, and how do we address it?",
      "This block sets up the vocabulary and mental model used across every other HLD topic — scalability, load balancing, caching, replication, and so on are all *tools* you reach for once you understand the problem they solve.",
    ],

    why: [
      "A single server with an app and a database can comfortably serve a small number of users — System Design isn't needed yet.",
      "As users grow, traffic grows. As traffic grows, the database and app server start queueing requests, and latency increases.",
      "As data grows, a single database struggles to hold everything in memory, and queries slow down as tables get larger.",
      "A single server also has fixed CPU and memory. Once you exhaust vertical scaling (a bigger machine), the only way forward is horizontal scaling (more machines) — which introduces new problems: how do requests get distributed, how does data stay consistent, what happens when one machine fails.",
      "This is the progression that motivates System Design:",
      "Small System → Growing Traffic → Growing Data → More Components → Distributed System → Scalability / Availability / Reliability Challenges.",
      "Once a system is distributed, new concerns appear that didn't exist on a single machine: latency between components, partial failures, single points of failure, and the need to keep the system available and reliable even when individual parts fail.",
      "System Design is the discipline that anticipates this progression instead of reacting to it after an outage.",
    ],

    how: [
      { step: "Requirements", description: "Clarify what the system needs to do and for whom, before designing anything." },
      { step: "Functional Requirements", description: "The features the system must support — e.g. \"users can post and view content.\"" },
      { step: "Non-Functional Requirements", description: "Quality attributes — latency, availability, consistency, durability, scalability." },
      { step: "Scale / Capacity", description: "Rough numbers: users, requests per second, data volume, read/write ratio." },
      { step: "API Design", description: "The contract clients use to interact with the system — endpoints, inputs, outputs." },
      { step: "Data Model", description: "What data is stored, how it's structured, and which store fits it best." },
      { step: "High-Level Architecture", description: "The components involved and how they connect — client, servers, storage, and everything between." },
      { step: "Database / Cache / Messaging", description: "Choosing storage and communication primitives that fit the access patterns and scale." },
      { step: "Scalability", description: "How the system handles growth in traffic and data over time." },
      { step: "Reliability / Fault Tolerance", description: "How the system keeps working, or fails gracefully, when a component goes down." },
      { step: "Bottlenecks", description: "Identifying the component most likely to fail first under load, and why." },
      { step: "Trade-offs", description: "Naming what you're giving up for what you're gaining — every design choice has a cost." },
    ],

    when: [
      "Applications expecting a large or fast-growing user base.",
      "Systems facing high traffic — many requests per second, potential spikes.",
      "Systems handling large volumes of data that won't fit comfortably on one machine.",
      "Products with high availability requirements — downtime is costly or unacceptable.",
      "Use cases with low latency requirements — e.g. real-time features.",
      "Distributed applications, where components run on different machines by necessity.",
      "Any system where failure handling genuinely matters — payments, bookings, infrastructure.",
      "Even a small application benefits from deliberate design — the point isn't to over-engineer everything, it's to match the complexity of the design to the actual requirements of the system.",
    ],

    tradeOffs: [
      {
        label: "Performance vs Cost",
        points: [
          "Faster systems usually need more machines, more memory, or premium infrastructure — performance is rarely free.",
          "The question is how much performance is actually required, not how much is theoretically possible.",
        ],
      },
      {
        label: "Consistency vs Availability",
        points: [
          "In a distributed system, you often can't guarantee both perfectly at the same time during a failure.",
          "Covered in depth in the CAP Theorem block — for now, just recognize this tension exists.",
        ],
      },
      {
        label: "Scalability vs Complexity",
        points: [
          "Adding components (load balancers, caches, queues) to scale also adds moving parts to build, monitor, and debug.",
          "Every new component is a new potential point of failure.",
        ],
      },
      {
        label: "Low Latency vs Resource Cost",
        points: [
          "Techniques like caching and pre-computation reduce latency but cost extra memory, storage, or staleness risk.",
        ],
      },
      {
        label: "Simplicity vs Flexibility",
        points: [
          "A simple design is easier to build, reason about, and operate — but may need rework as requirements change.",
          "A flexible design anticipates future needs — but costs more time and complexity upfront.",
        ],
      },
    ],

    thirtySecondAnswer:
      "System Design is basically about figuring out how to structure a system so it does what it's supposed to do, and keeps doing it as more people use it. I start by nailing down requirements — what the system needs to do, and what quality bars it needs to hit, like latency or availability. Then I think about scale — how many users, how much data — because that tells me where a simple setup will start breaking. From there it's about picking the right components: do I need a load balancer, a cache, a queue, a particular kind of database — and being honest about the trade-offs each one brings. It's less about memorizing architectures and more about reasoning from requirements to a design that fits them.",

    keyTakeaways: [
      "System Design defines how system components work together to meet requirements.",
      "Design starts with requirements — functional and non-functional — not with components.",
      "Architecture should match the actual scale and requirements, not the biggest possible design.",
      "Systems evolve as users, traffic, and data increase — design for the next stage, not just today.",
      "Every component you add should solve a specific, identifiable problem.",
      "System Design is fundamentally about trade-offs — there's no free win.",
      "Start simple, and add complexity only when the requirements justify it.",
      "Always come back to scalability, reliability, and failure handling when evaluating a design.",
    ],

    interviewQuestions: [
      {
        level: "Basic",
        questions: [
          { id: "b1", question: "What is System Design?", answer: "The process of defining a system's components, their responsibilities, and how they interact to meet functional and non-functional requirements at a given scale." },
          { id: "b2", question: "What is the purpose of System Design?", answer: "To make deliberate, justified decisions about architecture before building — so the system meets requirements around scale, latency, availability, and reliability, instead of discovering problems in production." },
          { id: "b3", question: "What is the difference between HLD and LLD?", answer: "HLD (High-Level Design) focuses on overall architecture — components, data flow, infrastructure. LLD (Low-Level Design) focuses on the internals — classes, interfaces, and object interactions within a component." },
          { id: "b4", question: "Why do systems need multiple components?", answer: "A single component (e.g. one server) has finite capacity. Splitting responsibility across components (load balancer, app servers, cache, database) lets each part scale and fail independently." },
        ],
      },
      {
        level: "Intermediate",
        questions: [
          { id: "i1", question: "What factors do you consider when designing a system?", answer: "Functional requirements, non-functional requirements (latency, availability, consistency), expected scale, data model, and failure scenarios." },
          { id: "i2", question: "How does architecture change as traffic increases?", answer: "It moves from a single server, to a load-balanced fleet of servers, to adding caching for read-heavy load, to splitting into services with dedicated data stores and messaging as needed." },
          { id: "i3", question: "Why might a single application server become a problem?", answer: "It has fixed CPU/memory, so throughput has a hard ceiling. It's also a single point of failure — if it goes down, the whole system is unavailable." },
          { id: "i4", question: "Why do we introduce components such as Load Balancers and caches?", answer: "A load balancer distributes traffic across multiple servers so no single machine is overwhelmed. A cache serves frequent reads without hitting the database every time, cutting latency and load." },
          { id: "i5", question: "What is the difference between scalability, availability and reliability?", answer: "Scalability is the ability to handle growing load. Availability is the system being up and responsive when needed. Reliability is the system behaving correctly and consistently over time, including during failures." },
          { id: "i6", question: "What is a single point of failure?", answer: "Any component whose failure takes down the whole system. Good design identifies these and adds redundancy so no single failure causes a total outage." },
        ],
      },
      {
        level: "Advanced",
        questions: [
          { id: "a1", question: "How would you approach a System Design interview?", answer: "Clarify requirements first, estimate scale, sketch a high-level architecture, then go deeper into the components the interviewer cares about — narrating trade-offs as you go rather than presenting one fixed answer." },
          { id: "a2", question: "Why should requirements be clarified before designing the architecture?", answer: "Because the 'right' architecture depends entirely on the requirements — a system with 1,000 users and one with 100 million users need very different designs, even if the feature set is identical." },
          { id: "a3", question: "Why is there no single \"perfect\" System Design?", answer: "Because every design involves trade-offs (cost, complexity, latency, consistency) — what's optimal depends on which of those the specific system needs to prioritize." },
          { id: "a4", question: "How do you decide whether a system needs additional infrastructure?", answer: "By identifying a concrete requirement or bottleneck the current design can't meet — e.g. read latency under load — rather than adding components speculatively." },
          { id: "a5", question: "How do you identify bottlenecks in a system?", answer: "By looking at where load concentrates — a single database taking all reads/writes, a single server handling all traffic — and reasoning about what fails first as load increases." },
        ],
      },
      {
        level: "Follow-up",
        questions: [
          { id: "f1", question: "Why did you choose this component?", answer: "Tie it back to a specific requirement it satisfies — e.g. \"a cache here because read traffic on this data is much higher than write traffic.\"" },
          { id: "f2", question: "What problem does this component solve?", answer: "State it concretely: reduces latency, distributes load, adds redundancy, decouples services — not just \"it makes it faster.\"" },
          { id: "f3", question: "What happens if this component fails?", answer: "Walk through the failure mode — does the system degrade gracefully, fail over, or go down entirely? This is where redundancy and fault tolerance get evaluated." },
          { id: "f4", question: "What happens when traffic increases 10x?", answer: "Identify which component saturates first and how you'd scale it — more instances, sharding, caching, queueing — rather than assuming the same design just scales." },
          { id: "f5", question: "What trade-off are you making with this architecture?", answer: "Be explicit — e.g. \"we're trading strong consistency for availability here,\" or \"we're adding operational complexity to get lower latency.\"" },
        ],
      },
    ],
  },
  
  "functional-and-non-functional-requirements": {
    blockId: "functional-and-non-functional-requirements",
    categoryId: "hld-fundamentals",

    what: [
      "A system requirement is a statement of what the system must do, or how well it must do it, for a given business need. Requirements come from a chain: a business need creates user needs, which get translated into system requirements — and system requirements split cleanly into two categories: Functional Requirements (FR) and Non-Functional Requirements (NFR).",
      "Functional Requirements define WHAT the system does — the concrete features and behaviors. \"A user can place an order.\" \"A user can upload a profile picture.\" \"A short URL redirects to the original URL.\" These are the actions and capabilities a user or another system can invoke.",
      "Non-Functional Requirements define HOW WELL the system does it — the quality attributes and constraints under which those features must operate. \"The order API should respond within 300ms.\" \"The system should support 1 million users.\" \"99.99% of requests should succeed.\" NFRs don't add new features, they constrain the existing ones.",
      "A simple way to remember it: if you can demo it by clicking through the app, it's probably functional. If you'd need a load test, a monitoring dashboard, or an incident report to prove it, it's probably non-functional.",
      "Quick examples across common interview systems: E-commerce — FR: browse/search/add-to-cart/checkout; NFR: checkout should complete under 500ms even during a flash sale. Instagram — FR: post, follow, like, feed; NFR: feed should load within 200ms for 100M+ daily active users. URL Shortener — FR: create and redirect a short URL; NFR: redirect latency under 50ms, 99.99% availability. Food Delivery — FR: browse restaurants, place order, track order; NFR: order status updates should propagate within seconds.",
      "NFRs are far more useful when they're measurable. \"The system should be fast\" isn't actionable — it can't be tested, and it can't drive a design decision. \"95th percentile API latency under 200ms\" can. Interviewers specifically listen for whether you push vague NFRs toward numbers.",
    ],

    deepConcepts: [
      {
        term: "Scalability",
        simpleDefinition: "The system's ability to handle more load — more users, more traffic, more data — without falling over.",
        interviewDefinition: "The ability of a system to handle increasing workload by adding resources (vertical scaling: bigger machines, or horizontal scaling: more machines), ideally with proportional or near-proportional gains.",
        whyItMatters: "Almost every large-scale interview system (Instagram, Uber, YouTube) is fundamentally a scalability problem — the features are simple, the challenge is doing them at scale.",
        example: "An e-commerce site goes from 10K to 10M users during a sale — the checkout service needs to scale horizontally by adding more instances behind a load balancer.",
        whenItMatters: "Any system expecting user or traffic growth, or with unpredictable traffic spikes (flash sales, viral content).",
        commonMistake: "Assuming vertical scaling (a bigger server) is enough, or jumping straight to \"microservices + Kafka\" without justifying it against actual scale numbers.",
        interviewQuestion: "What is scalability, and how do you design for it?",
        interviewAnswer: "Scalability is a system's ability to handle growing load by adding resources. I design for it by keeping components stateless where possible so I can scale horizontally, and by identifying which component will bottleneck first at the target scale.",
      },
      {
        term: "Availability",
        simpleDefinition: "Whether the system is up and responding when a user tries to use it.",
        interviewDefinition: "The percentage of time a system is operational and able to serve requests, usually expressed as a percentage (99.9%, 99.99%) over a period like a year.",
        whyItMatters: "For most consumer and business systems, downtime directly costs revenue and trust — availability targets often drive redundancy and failover design.",
        example: "A payment gateway advertising 99.99% availability commits to at most ~52 minutes of downtime per year.",
        whenItMatters: "Any system where downtime is costly — payments, e-commerce checkout, core social feeds.",
        commonMistake: "Confusing availability (is it up?) with reliability (is it correct?) — a system can be up and returning wrong answers, which is available but not reliable.",
        interviewQuestion: "What's the difference between availability and reliability?",
        interviewAnswer: "Availability means the system is accessible and responding. Reliability means it's producing correct results consistently. A server that's up but silently corrupting data is available but not reliable.",
      },
      {
        term: "Reliability",
        simpleDefinition: "Whether the system does the right thing, correctly, every time.",
        interviewDefinition: "The system's ability to consistently perform its intended function correctly over time, without producing incorrect results or data corruption.",
        whyItMatters: "Correctness failures — like duplicate orders or wrong payment amounts — are often worse than downtime, because they're silent and erode trust.",
        example: "A payment system must never double-charge a customer, even if a request is retried after a network timeout.",
        whenItMatters: "Any system handling money, inventory counts, or anything where a wrong answer is worse than a slow answer.",
        commonMistake: "Treating reliability as automatically covered by high availability — they measure different things.",
        interviewQuestion: "Give an example where a system is available but not reliable.",
        interviewAnswer: "A search service that's always up but occasionally returns stale or duplicate results is available, but not fully reliable, because correctness isn't guaranteed on every request.",
      },
      {
        term: "Performance & Latency",
        simpleDefinition: "How fast a single request gets a response.",
        interviewDefinition: "Latency is the time taken for one operation or request to receive a response, typically measured at percentiles (average, p95, p99) rather than a single number.",
        whyItMatters: "User-perceived speed drives engagement and conversion; percentile latency (not average) reveals how bad the worst-case experience actually is.",
        example: "\"Average latency is 80ms\" can hide a p99 of 2 seconds — the average looks fine while 1% of users have a bad experience.",
        whenItMatters: "Any user-facing API, especially ones on the critical path like checkout or feed load.",
        commonMistake: "Reporting only average latency instead of percentiles, or leaving an NFR as \"should be fast\" instead of a number.",
        interviewQuestion: "Why do we care about p95/p99 latency instead of just average latency?",
        interviewAnswer: "Average latency hides outliers. p95/p99 tells you what the slowest meaningful fraction of users actually experience, which is usually what causes complaints even when the average looks healthy.",
      },
      {
        term: "Throughput",
        simpleDefinition: "How many requests the system can handle per second, not how fast any one of them is.",
        interviewDefinition: "The number of operations or requests a system can process per unit of time, e.g. 10,000 requests/second.",
        whyItMatters: "Throughput determines how many servers, partitions, or queue consumers you need at a given scale — it's the basis for capacity estimation.",
        example: "A ticket-booking system needs to handle 50,000 requests/second during the first minute a popular event goes on sale.",
        whenItMatters: "Capacity planning, choosing between synchronous vs asynchronous processing, sizing message queues.",
        commonMistake: "Confusing throughput with latency — a system can have low latency per request but low overall throughput if it can't handle many requests concurrently.",
        interviewQuestion: "What's the difference between latency and throughput?",
        interviewAnswer: "Latency is how long one request takes. Throughput is how many requests the system can process per second. You can have low latency with low throughput, or higher latency with very high throughput, depending on the architecture.",
      },
      {
        term: "Consistency",
        simpleDefinition: "Whether everyone sees the same, up-to-date data at the same time.",
        interviewDefinition: "How and when updates to data become visible across replicas, caches, or nodes in a distributed system. At this stage, just recognize that consistency is a spectrum, not a switch — deep CAP/eventual-consistency reasoning is a dedicated later block.",
        whyItMatters: "Distributed systems replicate data for availability and performance, which introduces the risk that different nodes temporarily disagree on the current value.",
        example: "A user updates their profile picture; a cached copy on another server might briefly still serve the old picture.",
        whenItMatters: "Any system with replicated databases, caches, or multiple regions — most large-scale systems, to some degree.",
        commonMistake: "Assuming every system needs strong consistency by default — many (like social feeds) can tolerate brief staleness in exchange for availability.",
        interviewQuestion: "Does every system need strong consistency?",
        interviewAnswer: "No — it depends on the requirement. A payment balance usually needs strong consistency, but a social media like-count can tolerate eventual consistency without hurting the user experience.",
      },
      {
        term: "Security",
        simpleDefinition: "Making sure only the right people/systems can do the right things with the right data.",
        interviewDefinition: "Covers authentication (who are you), authorization (what are you allowed to do), encryption (protecting data in transit/at rest), and access control.",
        whyItMatters: "A functionally perfect system that leaks user data or allows unauthorized actions is a failed system regardless of its other qualities.",
        example: "A payment system encrypts card data at rest and in transit, and enforces that a user can only view their own order history.",
        whenItMatters: "Always relevant, but especially systems handling personal data, payments, or admin-level actions.",
        commonMistake: "Treating security as an afterthought bolted on after the architecture is designed, instead of a requirement gathered upfront.",
        interviewQuestion: "How would you factor security into requirements gathering?",
        interviewAnswer: "I'd ask what data is sensitive, who should access it, and any compliance needs, early — because that can affect data storage choices and API design, not just add-on middleware.",
      },
      {
        term: "Maintainability",
        simpleDefinition: "How easy it is to change, test, and debug the system later.",
        interviewDefinition: "The ease of modifying, extending, testing, and operating a system over its lifetime, without a disproportionate amount of effort or risk.",
        whyItMatters: "Systems live for years and are touched by many engineers; a system optimized purely for initial delivery speed often becomes expensive to change.",
        example: "Splitting a monolith's payment logic into a well-isolated module makes it easier to test and modify without breaking unrelated features.",
        whenItMatters: "Every system, but especially ones expected to evolve rapidly or be owned by multiple teams.",
        commonMistake: "Over-indexing on maintainability upfront for a system that may never reach the scale or lifespan that justifies the extra structure.",
        interviewQuestion: "How does maintainability factor into a System Design interview?",
        interviewAnswer: "I mention it when justifying structure — e.g. separating a service by responsibility — but I keep it proportional to the system's expected complexity rather than over-engineering from day one.",
      },
      {
        term: "Fault Tolerance",
        simpleDefinition: "The system keeps working even when a piece of it breaks.",
        interviewDefinition: "The ability of a system to continue operating, possibly in a degraded mode, despite the failure of one or more components.",
        whyItMatters: "In a distributed system, component failure isn't an edge case — it's expected. Designing for it upfront avoids full outages from partial failures.",
        example: "One of five application server instances crashes; the load balancer routes traffic to the remaining four while it's replaced.",
        whenItMatters: "Any distributed system, and especially ones with an availability requirement.",
        commonMistake: "Designing the happy path only and treating failure handling as an afterthought instead of a requirement.",
        interviewQuestion: "What happens in your design if one component fails?",
        interviewAnswer: "I'd walk through it explicitly — redundant instances behind a load balancer handle server failure, replicas handle database failure, retries with backoff handle transient network failure.",
      },
      {
        term: "Durability",
        simpleDefinition: "Once data is saved, it doesn't get lost — even if something crashes right after.",
        interviewDefinition: "The guarantee that once a write is acknowledged as successful, the data survives subsequent failures (crashes, power loss, disk failure).",
        whyItMatters: "Users and businesses trust that a confirmed action (an order, a payment) is permanent — losing acknowledged data is one of the most damaging failure modes.",
        example: "Once a payment is confirmed to the user, that record must survive a database node crash a second later.",
        whenItMatters: "Any system where a confirmed write matters — orders, payments, messages.",
        commonMistake: "Confusing durability with availability — data can be durable (safely persisted) even while the system serving it is temporarily unavailable.",
        interviewQuestion: "How would you guarantee durability for a confirmed order?",
        interviewAnswer: "I'd only confirm the order to the user after the write is acknowledged by a durable store — e.g. committed and replicated — not just written to an in-memory or single-node cache.",
      },
    ],

    frNfrExamples: [
      { statement: "User can place an order", label: "Functional" },
      { statement: "Order API should respond within 300ms", label: "Non-Functional" },
      { statement: "User can upload a profile picture", label: "Functional" },
      { statement: "System should support 1 million concurrent users", label: "Non-Functional" },
      { statement: "User can search and filter products", label: "Functional" },
      { statement: "Search results should return within 150ms at p95", label: "Non-Functional" },
      { statement: "User can create a short URL", label: "Functional" },
      { statement: "Redirect should have 99.99% availability", label: "Non-Functional" },
      { statement: "User can follow/unfollow another user", label: "Functional" },
      { statement: "Feed should load within 200ms for 100M+ daily users", label: "Non-Functional" },
      { statement: "User can cancel an order before shipping", label: "Functional" },
      { statement: "System should never double-charge a payment", label: "Non-Functional" },
    ],

    quantitativeReference: {
      title: "Availability tiers — approximate downtime per year",
      rows: [
        { label: "99%", detail: "≈ 3.65 days/year" },
        { label: "99.9%", detail: "≈ 8.76 hours/year" },
        { label: "99.99%", detail: "≈ 52.56 minutes/year" },
        { label: "99.999%", detail: "≈ 5.26 minutes/year" },
      ],
    },

    systemBreakdowns: [
      {
        system: "E-commerce",
        functional: ["Browse/search products", "Add to cart / wishlist", "Checkout & payment", "Order tracking"],
        nonFunctional: ["High availability during sales", "Consistent inventory counts", "Fast search latency"],
        constraints: ["Payment must go through a compliant provider", "Inventory can't oversell"],
        priorities: ["Correctness of payment/inventory", "Availability during traffic spikes"],
      },
      {
        system: "Instagram",
        functional: ["Post/upload media", "Follow/unfollow", "Like & comment", "View feed"],
        nonFunctional: ["Low feed latency at massive scale", "High availability", "Eventual consistency is acceptable for likes/feed"],
        constraints: ["Media storage at petabyte scale", "Global user base, varying network conditions"],
        priorities: ["Availability & low latency over strict consistency"],
      },
      {
        system: "URL Shortener",
        functional: ["Create short URL", "Redirect to original URL", "Optional expiration", "Track click count"],
        nonFunctional: ["Very low redirect latency", "High availability", "Uniqueness of short codes"],
        constraints: ["Short codes must not collide", "Read-heavy: redirects vastly outnumber creations"],
        priorities: ["Redirect speed and availability above all else"],
      },
      {
        system: "Food Delivery",
        functional: ["Browse restaurants/menu", "Place order", "Payment", "Real-time order tracking"],
        nonFunctional: ["Near real-time location updates", "Reliable payment processing", "Regional availability"],
        constraints: ["Time-sensitive — stale data (e.g. closed restaurant) is a bad experience", "Depends on third-party maps/payment"],
        priorities: ["Real-time accuracy of order/delivery status"],
      },
      {
        system: "Payment System",
        functional: ["Initiate payment", "Process refund", "View transaction history"],
        nonFunctional: ["Strong consistency", "High durability — no lost confirmed transactions", "Strict security/compliance"],
        constraints: ["Regulatory compliance (e.g. PCI-DSS)", "Must never double-charge or lose a confirmed transaction"],
        priorities: ["Correctness, consistency, and durability over raw latency"],
      },
    ],

    why: [
      "Requirements must be understood before architecture is designed because architecture is the answer to requirements — without them, you're designing a solution to an undefined problem.",
      "Different systems have wildly different priorities: a payment system prioritizes correctness and consistency; a social feed prioritizes availability and low latency, and can tolerate some staleness. The same architecture is not correct for both.",
      "Functional requirements define what capabilities must exist. Non-functional requirements define the quality bar and constraints those capabilities must meet — together they fully define \"done.\"",
      "Clear requirements prevent overengineering: without them, it's easy to add complexity (microservices, message queues, multiple data stores) that a system with modest, well-understood requirements doesn't actually need.",
      "Requirements also drive technology selection — not the other way around. The correct mental model is: Problem → Requirement → Solution → Technology. For example: repeated database reads cause high DB load (problem) → the requirement is to reduce read latency and DB load → the solution is caching → Redis may be a suitable technology, depending on the specifics. Starting from \"let's use Redis\" and then finding a justification is backwards, and interviewers notice.",
      "Requirements are also what let you reason about scalability, availability, latency, consistency, and reliability targets concretely, instead of guessing — and they're what create the trade-offs you'll be asked to defend in an interview.",
    ],

    how: [
      { step: "Clarify scope", description: "Ask which part of the system to focus on. \"Should I focus on the complete product, or specific functionality?\" Don't try to design the entire product — e.g. for \"Design YouTube,\" scope to upload, metadata, and playback, and explicitly exclude live streaming or recommendations unless asked." },
      { step: "Identify Functional Requirements", description: "Ask: \"What are the core features we need to support?\" List the concrete user-facing capabilities in scope — don't list 30 features, focus on the ones central to the problem." },
      { step: "Identify Non-Functional Requirements", description: "Ask about the quality bar: performance, availability, consistency. Push any vague answer (\"it should be fast\") toward a number." },
      { step: "Understand expected users and traffic", description: "Ask: \"What scale are we targeting? What's the expected number of users and peak traffic?\" This anchors every later capacity decision." },
      { step: "Understand latency/performance expectations", description: "Ask: \"What latency do we expect?\" Prefer a percentile target (e.g. p95 under 200ms) over a vague \"fast.\"" },
      { step: "Understand availability/reliability expectations", description: "Ask: \"What availability is required?\" A 99.9% target implies very different redundancy design than 99.99%." },
      { step: "Understand consistency requirements", description: "Ask: \"Do we need strong consistency?\" Only go deep enough to know if staleness is acceptable — full CAP reasoning is a dedicated later block." },
      { step: "Understand security requirements", description: "Ask: \"Are there security or compliance requirements?\" — especially for systems touching payments or personal data." },
      { step: "Identify constraints", description: "Surface anything that limits the design space — regulatory constraints, third-party dependencies, existing infrastructure, geographic requirements." },
      { step: "Prioritize requirements", description: "Not all NFRs can be maximized simultaneously. Explicitly rank what matters most for this specific system (e.g. correctness over latency for payments)." },
      { step: "Use requirements to drive architecture", description: "Only now start sketching architecture — every component you introduce should trace back to a specific requirement you gathered above." },
    ],

    interviewTraps: [
      { trap: "Immediately choosing Redis/Kafka/MongoDB", wrongApproach: "Naming specific technologies in the first minute of the interview.", whyWrong: "It skips the requirement-gathering step entirely and signals pattern-matching rather than reasoning.", betterApproach: "Identify the problem and requirement first (\"we have high read load\"), then introduce the technology as one option that fits, e.g. \"a cache — Redis could work here.\"" },
      { trap: "Starting architecture before clarifying requirements", wrongApproach: "Drawing boxes and arrows within the first couple of minutes.", whyWrong: "The architecture becomes unmoored from actual scale, priorities, and constraints, and often has to be re-justified later.", betterApproach: "Spend the first several minutes on scope, FR, and NFR before drawing anything." },
      { trap: "Listing 30 features without defining scope", wrongApproach: "Trying to cover every feature a real product like Instagram has.", whyWrong: "It spreads the limited interview time too thin and avoids depth on any one part.", betterApproach: "Explicitly scope down: \"I'll focus on posting and the feed; I'll leave out DMs and stories unless you'd like those included.\"" },
      { trap: "Ignoring NFRs", wrongApproach: "Designing only around functional features.", whyWrong: "Most of the interesting System Design decisions (caching, replication, sharding) exist specifically to satisfy NFRs, not FRs.", betterApproach: "Explicitly state the NFRs you're targeting before or alongside the architecture." },
      { trap: "Using vague NFRs such as \"very scalable\"", wrongApproach: "Leaving requirements unquantified.", whyWrong: "Vague requirements can't drive or justify specific design decisions.", betterApproach: "Convert to a number: \"support 1M users\" or \"handle 50K requests/sec.\"" },
      { trap: "Assuming traffic without asking", wrongApproach: "Guessing user/traffic numbers internally and designing for them silently.", whyWrong: "It misses a chance to demonstrate requirement-gathering, and you may guess wrong.", betterApproach: "Ask directly: \"What's the expected number of users and peak traffic?\"" },
      { trap: "Treating all systems as requiring the same consistency", wrongApproach: "Defaulting to strong consistency everywhere out of caution.", whyWrong: "It over-constrains the design and often conflicts with an availability requirement that matters more.", betterApproach: "Ask what the system actually needs — a like count can tolerate eventual consistency; a balance usually can't." },
      { trap: "Confusing availability and reliability", wrongApproach: "Using the terms interchangeably.", whyWrong: "They measure different things — uptime vs. correctness — and interviewers listen for the distinction.", betterApproach: "Define both explicitly if the conversation touches on failure handling or correctness." },
      { trap: "Confusing latency and throughput", wrongApproach: "Using the terms interchangeably.", whyWrong: "Latency is per-request time; throughput is total capacity — mixing them leads to wrong capacity math.", betterApproach: "State both separately when discussing performance targets." },
      { trap: "Overengineering a simple system", wrongApproach: "Introducing microservices, queues, and multiple databases for a system with modest scale.", whyWrong: "It adds operational complexity the actual requirements don't justify.", betterApproach: "Match architectural complexity to the requirements and scale actually stated." },
    ],

    when: [
      "Before any architecture design begins — requirements are the input, architecture is the output.",
      "During System Design interviews — almost always the correct opening move.",
      "During capacity planning — traffic and data estimates come from FRs/NFRs.",
      "During architecture and technology selection decisions.",
      "During scalability and reliability planning.",
      "During trade-off discussions, since NFRs are what create the trade-offs in the first place.",
      "Requirements aren't fixed forever — they evolve as a system and its user base grow, and the architecture should be revisited when they do.",
    ],

    tradeOffs: [
      {
        label: "Availability vs Consistency",
        points: [
          "During a network partition in a distributed system, you often can't guarantee both perfectly at once — this is the introduction to CAP, covered in depth in its own block.",
          "It's not \"pick any 2 of 3\" in general — it's specifically about the trade-off between consistency and availability when a partition occurs.",
        ],
      },
      {
        label: "Low Latency vs Cost",
        points: ["Hitting aggressive p95/p99 latency targets often means more caching, more regions, or more machines — all of which cost money."],
      },
      {
        label: "Scalability vs Complexity",
        points: ["Every component added to scale (queues, caches, sharding) is also a new moving part to build, monitor, and debug."],
      },
      {
        label: "Reliability vs Infrastructure Cost",
        points: ["Redundancy, replication, and retries improve reliability but multiply infrastructure and operational cost."],
      },
      {
        label: "Security vs Convenience/Performance",
        points: ["Extra auth checks, encryption, and access control add latency and friction in exchange for protecting data and access."],
      },
      {
        label: "Performance vs Resource Usage",
        points: ["Pre-computation and caching improve response time at the cost of extra memory/storage and potential staleness."],
      },
      {
        label: "The core idea",
        points: [
          "There is no universally perfect architecture.",
          "The correct architecture depends on business requirements, scale, constraints, priorities, and which trade-offs are acceptable for this specific system.",
        ],
      },
    ],

    thirtySecondAnswer:
      "Functional requirements are what the system actually does — the features, like a user placing an order or uploading a photo. Non-functional requirements are how well it does that — things like latency, availability, and scalability. I think of FR as the demo, and NFR as everything that has to be true for that demo to still work under real load. In an interview, I always try to nail down both before I draw any architecture, because the right design for 'support 1,000 users' looks completely different from the right design for 'support 10 million users with 99.99% availability' — even if the features are identical.",

    secondaryAnswer: {
      question: "How do you gather requirements before designing a system?",
      answer:
        "I start by clarifying scope — what part of the system I should actually focus on — because trying to design the whole product usually isn't realistic in the time given. From there I list the core functional requirements, the must-have features, then move to non-functional ones: expected users and traffic, latency expectations, availability target, and whether we need strong consistency. I'll also ask about constraints — compliance, existing infrastructure, third-party dependencies — and then prioritize, because not every system can maximize every NFR at once. Only after that do I start sketching architecture, and I try to tie every component back to a specific requirement rather than adding things speculatively.",
    },

    keyTakeaways: [
      "FR = WHAT the system does. NFR = HOW WELL it does it.",
      "Requirements come before architecture, always.",
      "Core mental model: Problem → Requirement → Solution → Technology.",
      "Core interview flow: Scope → FR → NFR → Scale → Constraints → Priorities → Architecture → Trade-offs.",
      "Scalability = handle increasing workload. Availability = system is accessible. Reliability = system behaves correctly and consistently.",
      "Latency = time per request. Throughput = requests processed per unit time — different questions.",
      "Consistency = how/when data updates become visible across the system. Fault Tolerance = keeps working despite failures. Durability = committed data survives failures.",
      "Prefer measurable NFRs (\"p95 latency under 200ms\") over vague ones (\"the system should be fast\").",
      "Different systems prioritize differently — payments prioritize correctness/consistency, social feeds prioritize availability/low latency.",
      "There is no universally perfect architecture — only the right trade-offs for this system's specific requirements.",
    ],

    interviewQuestions: [
      {
        level: "Basic",
        questions: [
          { id: "b1", question: "What is a Functional Requirement?", answer: "A statement of what the system must do — a feature or behavior a user or system can invoke, e.g. \"a user can place an order.\"" },
          { id: "b2", question: "What is a Non-Functional Requirement?", answer: "A statement of how well the system must perform a function or operate overall — e.g. latency, availability, scalability targets." },
          { id: "b3", question: "What is the difference between FR and NFR?", answer: "FR defines what the system does; NFR defines the quality bar and constraints under which it does it. FR is demoable by clicking through the app; NFR usually requires load testing or monitoring to verify." },
          { id: "b4", question: "Give examples of FR and NFR for an e-commerce system.", answer: "FR: browse products, add to cart, checkout. NFR: checkout should complete within 500ms even during peak sale traffic, and inventory counts must stay accurate under concurrent orders." },
        ],
      },
      {
        level: "Intermediate",
        questions: [
          { id: "i1", question: "Why are NFRs important in System Design?", answer: "Most of the actual design decisions in System Design — caching, replication, sharding, load balancing — exist to satisfy NFRs, not to add features. Ignoring NFRs means designing only half the problem." },
          { id: "i2", question: "How do requirements influence architecture?", answer: "A read-heavy workload pushes toward caching and read replicas. A high-availability requirement pushes toward redundancy and failover. A global user base pushes toward geographic distribution. Each requirement narrows the design space." },
          { id: "i3", question: "How do you gather requirements during a System Design interview?", answer: "Clarify scope, list functional requirements, then non-functional ones — scale, latency, availability, consistency — then constraints, then prioritize, before touching architecture." },
          { id: "i4", question: "Why should you clarify requirements before choosing technologies?", answer: "Because the right technology depends entirely on the requirement — choosing Redis or Kafka before understanding the problem is solving a problem you haven't defined yet." },
          { id: "i5", question: "What is requirement scoping, and why does it matter?", answer: "Scoping means explicitly deciding which parts of a large product to focus on, e.g. \"I'll cover upload and playback for YouTube, not live streaming.\" It matters because trying to design an entire real-world product in an interview leads to shallow coverage everywhere." },
          { id: "i6", question: "Why is there no universally perfect architecture?", answer: "Because architecture is a set of trade-offs, and which trade-offs are acceptable depends entirely on that specific system's requirements, scale, and priorities." },
        ],
      },
      {
        level: "Scenario",
        questions: [
          { id: "s1", question: "Design Instagram. What requirements would you clarify first?", answer: "Scope (post/feed/follow vs. DMs/stories), expected DAUs and read/write ratio, feed latency target, and whether eventual consistency is acceptable for likes and feed ordering — it usually is." },
          { id: "s2", question: "Design a payment system. Which NFRs would be high priority?", answer: "Consistency and durability first — a confirmed payment must never be lost or double-processed — followed by security/compliance, with latency and pure availability weighted lower than correctness." },
          { id: "s3", question: "The interviewer says \"the system should be fast.\" How do you convert that into a meaningful NFR?", answer: "I'd ask what operation specifically, and propose a measurable target: e.g. \"95th percentile response time under 200ms for the search endpoint,\" then confirm that's the right bar for this use case." },
          { id: "s4", question: "A system currently supports 1,000 users and must support 1 million. What would you clarify before changing the architecture?", answer: "New expected peak traffic and read/write ratio, whether latency/availability targets change at the new scale, and which component is likely to bottleneck first — that tells me what actually needs to change." },
          { id: "s5", question: "Users complain that data sometimes looks outdated. Which requirement should you investigate?", answer: "The consistency requirement — this points to replication lag or cache staleness, and the fix depends on whether the data actually needs strong consistency or was just under-specified." },
          { id: "s6", question: "The system should continue working even when one server fails. What requirement is this?", answer: "Fault tolerance — the system should degrade gracefully or fail over rather than going fully down when a single component fails." },
          { id: "s7", question: "The system must never lose confirmed payment information. Which NFR is most important here?", answer: "Durability — once a payment is acknowledged, it must survive subsequent failures like a crash or disk loss." },
        ],
      },
      {
        level: "Follow-up",
        questions: [
          { id: "f1", question: "Why shouldn't you immediately choose Redis or Kafka?", answer: "Because naming a technology before naming the problem it solves skips the reasoning an interviewer wants to see — introduce it only after the requirement (e.g. \"reduce DB read load\") makes it the obvious fit." },
          { id: "f2", question: "How do you define a measurable NFR instead of a vague one?", answer: "Attach a number and a condition: not \"scalable,\" but \"support 1M concurrent users\"; not \"fast,\" but \"p95 latency under 200ms.\"" },
          { id: "f3", question: "What's the difference between average latency and p95/p99 latency?", answer: "Average can hide outliers — a low average can coexist with a terrible worst case. p95/p99 shows what the slowest meaningful fraction of requests actually experience, which is closer to what users notice." },
          { id: "f4", question: "How do business requirements influence technical decisions?", answer: "Business priorities (e.g. \"never lose a payment\" vs. \"always show something, even if stale\") directly set which NFRs matter most, which then determines consistency model, redundancy strategy, and technology choices." },
          { id: "f5", question: "A component fails — how does that map back to a requirement?", answer: "It maps to fault tolerance and availability requirements — the response (failover, degrade gracefully, retry) should be sized to match how critical that component's availability requirement actually is." },
        ],
      },
    ],
  },
};

export const getTopicContent = (blockId: string): TopicContent | undefined =>
  systemDesignTopics[blockId];
