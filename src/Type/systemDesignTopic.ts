// ============================================================
// System Design — Topic Content Types
// ============================================================
// This is the CONTENT layer, one level below the structural
// layer in systemDesign.ts. It holds What/Why/How/When/
// Trade-offs/Interview Questions for a single block. It is kept
// completely separate from the visualization layer
// (systemDesignVisual.ts) so a diagram can be updated without
// touching notes, and vice versa.

export interface HowStep {
  step: string; // e.g. "Requirements"
  description: string; // 1-2 sentence explanation
}

export interface TradeOffItem {
  label: string; // e.g. "Performance vs Cost"
  points: string[]; // short bullets explaining the tension
}

export type QuestionLevel = "Basic" | "Intermediate" | "Advanced" | "Scenario" | "Follow-up";

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface InterviewQuestionGroup {
  level: QuestionLevel;
  questions: InterviewQuestion[];
}

// ------------------------------------------------------------
// Optional "deep block" content — used by richer blocks like
// BLK 02. All optional so simpler blocks (like BLK 01) don't
// need them and TopicPage only renders what's present.
// ------------------------------------------------------------

/** A single concept explained to interview depth (used for NFRs, etc.) */
export interface DeepConcept {
  term: string;
  simpleDefinition: string;
  interviewDefinition: string;
  whyItMatters: string;
  example: string;
  whenItMatters: string;
  commonMistake: string;
  interviewQuestion: string;
  interviewAnswer: string;
}

/** One row in a "bad NFR vs measurable NFR" or FR-vs-NFR style table */
export interface ComparisonExample {
  statement: string;
  label: string; // e.g. "Functional" / "Non-Functional", or "Vague" / "Measurable"
}

/** Availability tier -> approximate downtime, or similar quantitative reference table */
export interface QuantitativeRow {
  label: string; // e.g. "99.9%"
  detail: string; // e.g. "≈ 8.76 hours/year downtime"
}

/** Functional/non-functional breakdown for a real system (Instagram, e-commerce, etc.) */
export interface SystemBreakdown {
  system: string;
  functional: string[];
  nonFunctional: string[];
  constraints: string[];
  priorities: string[];
}

/** A common interview mistake, with the fix */
export interface InterviewTrap {
  trap: string;
  wrongApproach: string;
  whyWrong: string;
  betterApproach: string;
}

export interface TopicContent {
  /** Matches SystemDesignBlock.id */
  blockId: string;
  /** Matches SystemDesignCategory.id */
  categoryId: string;

  what: string[]; // scannable paragraphs/bullets
  why: string[];
  how: HowStep[]; // ordered pipeline
  when: string[];
  tradeOffs: TradeOffItem[];

  thirtySecondAnswer: string;
  /** Optional second rehearsed answer, e.g. "How do you gather requirements?" */
  secondaryAnswer?: { question: string; answer: string };

  keyTakeaways: string[];
  interviewQuestions: InterviewQuestionGroup[];

  // Optional deep-dive sections, rendered inside WHAT/HOW when present
  deepConcepts?: DeepConcept[]; // rendered under WHAT
  frNfrExamples?: ComparisonExample[]; // rendered under WHAT
  quantitativeReference?: { title: string; rows: QuantitativeRow[] }; // rendered under WHAT
  systemBreakdowns?: SystemBreakdown[]; // rendered under WHAT
  interviewTraps?: InterviewTrap[]; // rendered under HOW
}
