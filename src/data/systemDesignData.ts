

import type { CategoryProgress, SystemDesignBlock, SystemDesignCategory } from "../Type/systemDesign";


const block = (
  blockNumber: number,
  title: string,
  status: SystemDesignBlock["status"] = "PENDING"
): SystemDesignBlock => ({
  id: slugify(title),
  blockNumber,
  title,
  status,
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const systemDesignData: SystemDesignCategory[] = [
  {
    id: "hld-fundamentals",
    name: "HLD Fundamentals",
    description:
      "Core building blocks of high-level design — scalability, load balancing, replication, sharding, and consistency.",
    targetDate: "September 14, 2026",
    targetDateISO: "2026-09-14",
    blocks: [
      { ...block(1, "System Design Introduction"), targetDate: "September 9, 2026", hasContent: true },
      { ...block(2, "Functional & Non-Functional Requirements"), targetDate: "September 10, 2026", hasContent: true },
      { ...block(3, "Scalability", "COMPLETED"), targetDate: "September 10, 2026", hasContent: true, completedOn: "2026-09-08" },
      { ...block(4, "Load Balancer", "COMPLETED"), targetDate: "September 11, 2026", hasContent: true, completedOn: "2026-09-08" },
      block(5, "CDN"),
      block(6, "Database Replication"),
      block(7, "Database Sharding"),
      block(8, "Consistent Hashing"),
      block(9, "CAP Theorem"),
      block(10, "Distributed Transactions"),
      block(11, "Eventual Consistency"),
      block(12, "Horizontal vs Vertical Scaling"),
    ],
  },
  {
    id: "distributed-system",
    name: "Distributed System",
    description:
      "Caching, messaging, Kafka, service discovery, fault tolerance, and observability in distributed systems.",
    targetDate: "September 21, 2026",
    targetDateISO: "2026-09-21",
    blocks: [
      block(1, "Caching"),
      block(2, "Cache-Aside Pattern"),
      block(3, "Write-Through & Write-Back Cache"),
      block(4, "Cache Eviction Policies"),
      block(5, "Redis"),
      block(6, "Cache Invalidation"),
      block(7, "Message Queues"),
      block(8, "Synchronous vs Asynchronous Communication"),
      block(9, "Kafka"),
      block(10, "Kafka Topics & Partitions"),
      block(11, "Kafka Consumer Groups"),
      block(12, "Message Ordering"),
      block(13, "Message Delivery Semantics"),
      block(14, "API Gateway"),
      block(15, "Service Discovery"),
      block(16, "WebSockets"),
      block(17, "Long Polling vs WebSockets"),
      block(18, "Object Storage"),
      block(19, "Elasticsearch"),
      block(20, "Rate Limiting"),
      block(21, "Fault Tolerance"),
      block(22, "Retry & Timeout"),
      block(23, "Circuit Breaker"),
      block(24, "Backpressure"),
      block(25, "Health Checks"),
      block(26, "Observability"),
    ],
  },
  {
    id: "lld-fundamentals",
    name: "LLD Fundamentals",
    description:
      "Dependency injection, SOLID principles, and UML — the object-design vocabulary interviewers expect. (Core OOP is covered separately in Core Java.)",
    targetDate: "September 26, 2026",
    targetDateISO: "2026-09-26",
    blocks: [
      block(1, "Dependency Injection"),
      block(2, "Loose Coupling & High Cohesion"),
      block(3, "SOLID Principles"),
      block(4, "Single Responsibility Principle"),
      block(5, "Open/Closed Principle"),
      block(6, "Liskov Substitution Principle"),
      block(7, "Interface Segregation Principle"),
      block(8, "Dependency Inversion Principle"),
      block(9, "UML & Class Diagrams"),
      block(10, "Class Diagram Design"),
      block(11, "Object Interaction & Sequence Diagrams"),
      block(12, "LLD Interview Approach"),
    ],
  },
  {
    id: "design-patterns",
    name: "Design Patterns",
    description:
      "Creational, structural, and behavioral patterns, with a focus on when to reach for each in an interview.",
    targetDate: "September 29, 2026",
    targetDateISO: "2026-09-29",
    blocks: [
      block(1, "Creational Design Patterns"),
      block(2, "Singleton Pattern"),
      block(3, "Factory Pattern"),
      block(4, "Abstract Factory Pattern"),
      block(5, "Builder Pattern"),
      block(6, "Prototype Pattern"),
      block(7, "Structural Design Patterns"),
      block(8, "Adapter Pattern"),
      block(9, "Decorator Pattern"),
      block(10, "Facade Pattern"),
      block(11, "Proxy Pattern"),
      block(12, "Composite Pattern"),
      block(13, "Behavioral Design Patterns"),
      block(14, "Strategy Pattern"),
      block(15, "Observer Pattern"),
      block(16, "Command Pattern"),
      block(17, "State Pattern"),
      block(18, "Chain of Responsibility"),
      block(19, "Pattern Selection & Trade-offs"),
    ],
  },
  {
    id: "lld-case-studies",
    name: "LLD Case Studies",
    description:
      "End-to-end low-level design walkthroughs — requirements to class design to extensibility.",
    targetDate: "September 30, 2026",
    targetDateISO: "2026-09-30",
    blocks: [
      block(1, "Parking Lot"),
      block(2, "Elevator System"),
      block(3, "Snake & Ladder"),
      block(4, "Requirements Analysis"),
      block(5, "Class Design"),
      block(6, "Interface Design"),
      block(7, "Design Pattern Application"),
      block(8, "Extensibility & Edge Cases"),
    ],
  },
  {
    id: "hld-case-studies-1",
    name: "HLD Case Studies I",
    description:
      "Classic HLD interview systems — TinyURL, Rate Limiter, Typeahead, Instagram, Newsfeed, E-Commerce, BookMyShow.",
    targetDate: "October 8, 2026",
    targetDateISO: "2026-10-08",
    blocks: [
      block(1, "Tiny URL"),
      block(2, "Rate Limiter"),
      block(3, "Typeahead"),
      block(4, "Instagram"),
      block(5, "Newsfeed"),
      block(6, "E-Commerce"),
      block(7, "BookMyShow"),
      block(8, "Ticket Booking"),
      block(9, "Capacity Estimation"),
      block(10, "Database Selection & Trade-offs"),
      block(11, "Caching Strategy"),
      block(12, "API & Data Flow Design"),
    ],
  },
  {
    id: "hld-case-studies-2",
    name: "HLD Case Studies II",
    description:
      "Harder large-scale systems — Uber, YouTube, WhatsApp, PayPal — and the trade-offs behind each.",
    targetDate: "October 15, 2026",
    targetDateISO: "2026-10-15",
    blocks: [
      block(1, "Uber"),
      block(2, "YouTube"),
      block(3, "WhatsApp"),
      block(4, "PayPal"),
      block(5, "Real-Time Communication"),
      block(6, "Location-Based Services"),
      block(7, "Media Processing"),
      block(8, "Payment Systems"),
      block(9, "Idempotency"),
      block(10, "Failure Handling"),
      block(11, "Scalability & Availability"),
      block(12, "Data Consistency Trade-offs"),
    ],
  },
  {
    id: "independent-hld-practice",
    name: "Independent HLD Practice",
    description:
      "Design systems from scratch, unaided — the closest simulation of the real interview.",
    targetDate: "October 19, 2026",
    targetDateISO: "2026-10-19",
    blocks: [
      block(1, "Design Instagram From Scratch"),
      block(2, "Design YouTube From Scratch"),
      block(3, "Design E-Commerce From Scratch"),
      block(4, "Design BookMyShow From Scratch"),
      block(5, "Design WhatsApp From Scratch"),
      block(6, "Design Uber From Scratch"),
      block(7, "Design URL Shortener From Scratch"),
      block(8, "Design Rate Limiter From Scratch"),
      block(9, "Capacity Estimation Practice"),
      block(10, "API Design Practice"),
      block(11, "Database Selection Practice"),
      block(12, "Caching Strategy Practice"),
      block(13, "Messaging Strategy Practice"),
      block(14, "Scaling & Bottleneck Analysis"),
      block(15, "Failure Scenario Analysis"),
      block(16, "Architecture Trade-off Analysis"),
    ],
  },
  {
    id: "final-revision",
    name: "Final Revision",
    description:
      "Last-mile revision across every category, plus mock interviews, before the target interview window.",
    targetDate: "October 22, 2026",
    targetDateISO: "2026-10-22",
    blocks: [
      block(1, "HLD Fundamentals Revision"),
      block(2, "Distributed Systems Revision"),
      block(3, "Database Revision"),
      block(4, "Caching & Redis Revision"),
      block(5, "Kafka & Messaging Revision"),
      block(6, "API Gateway & Microservices Revision"),
      block(7, "CAP & Consistency Revision"),
      block(8, "Scalability Revision"),
      block(9, "Fault Tolerance Revision"),
      block(10, "SOLID Revision"),
      block(11, "Design Patterns Revision"),
      block(12, "LLD Revision"),
      block(13, "HLD Case Study Revision"),
      block(14, "HLD Interview Questions"),
      block(15, "LLD Interview Questions"),
      block(16, "HLD Mock Interview"),
      block(17, "LLD Mock Interview"),
      block(18, "Final System Design Assessment"),
    ],
  },
];

/** Overall System Design target date, shown on the landing page header. */
export const systemDesignTargetDate = "October 22, 2026";

export const getCategoryById = (categoryId: string): SystemDesignCategory | undefined =>
  systemDesignData.find((c) => c.id === categoryId);

/** Adjacent blocks within the same category, for Previous/Next topic navigation. */
export const getAdjacentBlocks = (categoryId: string, blockId: string) => {
  const category = getCategoryById(categoryId);
  if (!category) return { category: undefined, prev: undefined, next: undefined };
  const index = category.blocks.findIndex((b) => b.id === blockId);
  return {
    category,
    prev: index > 0 ? category.blocks[index - 1] : undefined,
    next: index >= 0 && index < category.blocks.length - 1 ? category.blocks[index + 1] : undefined,
  };
};

export const getBlockById = (
  categoryId: string,
  blockId: string
): { category: SystemDesignCategory; block: SystemDesignBlock } | undefined => {
  const category = getCategoryById(categoryId);
  const found = category?.blocks.find((b) => b.id === blockId);
  return category && found ? { category, block: found } : undefined;
};

/** Progress is always derived — never hard-code a percentage. */
export const getCategoryProgress = (category: SystemDesignCategory): CategoryProgress => {
  const total = category.blocks.length;
  const completed = category.blocks.filter((b) => b.status === "COMPLETED").length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const last7DaysCompleted = category.blocks.filter((b) => {
    if (!b.completedOn) return false;
    const d = new Date(b.completedOn);
    return d >= sevenDaysAgo;
  }).length;

  return { completed, total, percentage, last7DaysCompleted };
};

/** Overall progress across every category — used for a global summary if needed. */
export const getOverallProgress = (): CategoryProgress => {
  const allBlocks = systemDesignData.flatMap((c) => c.blocks);
  const total = allBlocks.length;
  const completed = allBlocks.filter((b) => b.status === "COMPLETED").length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const last7DaysCompleted = allBlocks.filter((b) => {
    if (!b.completedOn) return false;
    return new Date(b.completedOn) >= sevenDaysAgo;
  }).length;

  return { completed, total, percentage, last7DaysCompleted };
};