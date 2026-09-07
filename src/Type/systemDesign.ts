// ============================================================
// System Design — Core Types
// ============================================================
// These types describe the STRUCTURE only (category → block).
// Topic-level content (What/Why/How/When/Trade-offs/Interview
// Questions/Visualization) is intentionally NOT modeled yet —
// that lives in a future `systemDesignData.ts` topic layer and
// a separate `systemDesignVisuals.ts`, kept apart from this
// structural layer so you can add real notes later without
// touching any UI component.

export type BlockStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface SystemDesignBlock {
  /** URL-safe slug, unique within its category, e.g. "load-balancer" */
  id: string;
  /** Display order / label, e.g. 4 -> "BLK 04" */
  blockNumber: number;
  /** Short title, e.g. "Load Balancer" */
  title: string;
  /** Current study status. Everything starts PENDING. */
  status: BlockStatus;
  /**
   * Dates (YYYY-MM-DD) this block's status last changed to COMPLETED.
   * Used to compute "last 7 days activity". Empty until you study it.
   */
  completedOn?: string;
  /**
   * Optional per-block target date (display string), e.g. "September 9, 2026".
   * Falls back to the category's targetDate on the topic page if omitted.
   */
  targetDate?: string;
  /** True once real topic content exists in systemDesignTopics.ts */
  hasContent?: boolean;
}

export interface SystemDesignCategory {
  /** URL-safe slug, e.g. "hld-fundamentals" */
  id: string;
  /** Display name, e.g. "HLD Fundamentals" */
  name: string;
  /** One-line description shown on the category page */
  description: string;
  /** Display target date, e.g. "September 14, 2026" */
  targetDate: string;
  /** ISO date used for sorting / countdown math, e.g. "2026-09-14" */
  targetDateISO: string;
  blocks: SystemDesignBlock[];
}

export interface CategoryProgress {
  completed: number;
  total: number;
  percentage: number; // 0-100, rounded
  last7DaysCompleted: number;
}
