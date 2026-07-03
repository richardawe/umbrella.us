import type { Pathway } from "@/lib/path-matching";

/**
 * Shared shape for per-state configuration. Do not hardcode California
 * logic inline elsewhere in the app — a future agent should be able to
 * add `states/ny.ts` (etc.) that satisfies this same interface without
 * touching `lib/path-matching.ts` or any product-app component.
 */
export interface StateForm {
  number: string;
  title: string;
  url: string;
  description: string;
}

export interface StateStatute {
  citation: string;
  title: string;
  url: string;
  note?: string;
}

export interface StateAgency {
  name: string;
  url: string;
  description: string;
}

export interface DocumentChecklistItem {
  id: string;
  label: string;
  description: string;
  pathways: Pathway[];
  formNumber?: string;
}

export interface StateConfig {
  code: string;
  name: string;
  courtSelfHelpUrl: string;
  caseLawSearchUrl: string;
  forms: StateForm[];
  statutes: StateStatute[];
  agencies: StateAgency[];
  documentChecklist: DocumentChecklistItem[];
  pathwayNotes: Partial<Record<Pathway, string>>;
}
