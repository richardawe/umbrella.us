import type { Pathway, ReasoningStep } from "./path-matching";
import { ca } from "@/states/ca";

export type ChecklistStatus = "not_started" | "requested" | "received" | "waived";

export interface ChecklistItemState {
  id: string;
  status: ChecklistStatus;
}

export interface NudgeLogEntry {
  id: string;
  date: string;
  channel: "email" | "text";
  summary: string;
}

export interface ReferenceContact {
  id: string;
  name: string;
  relationship: string;
  status: "not_requested" | "requested" | "received";
}

export type MatterStatus = "intake" | "in_progress" | "ready_for_review";

export interface Matter {
  id: string;
  clientName: string;
  pathway: Pathway;
  pathwayLabel: string;
  reasoning: ReasoningStep[];
  sequencingNote?: string;
  overrideReason?: string;
  status: MatterStatus;
  createdAt: string;
  checklist: ChecklistItemState[];
  references: ReferenceContact[];
  nudgeLog: NudgeLogEntry[];
}

export function checklistForPathway(pathway: Pathway): ChecklistItemState[] {
  return ca.documentChecklist
    .filter((item) => item.pathways.includes(pathway))
    .map((item) => ({ id: item.id, status: "not_started" as ChecklistStatus }));
}

export const DEMO_MATTERS: Matter[] = [
  {
    id: "demo-rivera-chen",
    clientName: "Alex Rivera & Jordan Chen",
    pathway: "step-second-parent",
    pathwayLabel: "Stepparent / second-parent adoption",
    reasoning: [
      {
        rule: "Client is the spouse, registered domestic partner, or unmarried partner of the child's existing legal parent.",
        finding:
          "This is a stepparent/second-parent scenario, regardless of the client's marital status.",
      },
      {
        rule: "Child was conceived via surrogacy or a known/identified donor, and no parentage judgment exists yet.",
        finding:
          "A parentage judgment should be sought before or alongside the adoption filing.",
      },
      {
        rule: "Client is married or in a registered domestic partnership with the legal parent.",
        finding:
          "A confirmatory stepparent/second-parent adoption remains advisable even though the couple is married.",
      },
    ],
    sequencingNote:
      "Recommend confirming parentage (parentage judgment) before or alongside filing the adoption petition.",
    status: "in_progress",
    createdAt: "2026-05-18",
    checklist: [
      { id: "adoption-request", status: "received" },
      { id: "stepparent-request", status: "received" },
      { id: "confirm-parentage-declaration", status: "requested" },
      { id: "icwa-inquiry", status: "received" },
      { id: "background-check", status: "requested" },
      { id: "adoption-agreement", status: "not_started" },
      { id: "adoption-order", status: "not_started" },
    ],
    references: [
      { id: "r1", name: "Dana Whitfield", relationship: "Family friend", status: "received" },
      { id: "r2", name: "Casey Nguyen", relationship: "Sibling", status: "requested" },
    ],
    nudgeLog: [
      {
        id: "n1",
        date: "2026-06-02",
        channel: "email",
        summary: "Reminded Jordan to complete Live Scan appointment.",
      },
      {
        id: "n2",
        date: "2026-06-10",
        channel: "text",
        summary: "Nudged Alex for the parentage declaration paperwork.",
      },
    ],
  },
  {
    id: "demo-okafor",
    clientName: "Morgan Okafor",
    pathway: "foster-to-adopt",
    pathwayLabel: "Foster-to-adopt (agency adoption via foster placement)",
    reasoning: [
      {
        rule: "Child is currently placed with the client through the foster care / dependency system.",
        finding:
          "This is a foster-to-adopt scenario — procedurally an agency adoption once dependency proceedings clear the child for adoption, typically through a Resource Family Approval (RFA) caregiver.",
      },
    ],
    status: "in_progress",
    createdAt: "2026-04-02",
    checklist: checklistForPathway("foster-to-adopt"),
    references: [
      { id: "r1", name: "Taylor Brooks", relationship: "RFA social worker", status: "received" },
    ],
    nudgeLog: [
      {
        id: "n1",
        date: "2026-05-20",
        channel: "email",
        summary: "Requested updated medical clearance from Morgan's physician.",
      },
    ],
  },
  {
    id: "demo-nandakumar-lee",
    clientName: "Priya Nandakumar & Sam Lee",
    pathway: "agency",
    pathwayLabel: "Agency adoption",
    reasoning: [
      {
        rule: "A licensed public or private adoption agency is placing the child, and this is not a foster-care placement.",
        finding: "This is an agency adoption.",
      },
    ],
    status: "ready_for_review",
    createdAt: "2026-02-11",
    checklist: checklistForPathway("agency").map((c) => ({ ...c, status: "received" })),
    references: [
      { id: "r1", name: "Jordan Alvarez", relationship: "Neighbor", status: "received" },
      { id: "r2", name: "Reese Kim", relationship: "Coworker", status: "received" },
    ],
    nudgeLog: [
      {
        id: "n1",
        date: "2026-03-01",
        channel: "email",
        summary: "Confirmed all financial disclosure documents received.",
      },
    ],
  },
];
