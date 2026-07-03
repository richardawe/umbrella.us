"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEMO_MATTERS, type ChecklistStatus, type Matter } from "./mock-data";

// v0 has no backend — all "matter" data lives in localStorage, resets if
// cleared, and is clearly a demo. See README for what's mocked vs. real.
//
// Uses useSyncExternalStore (not useState+useEffect) because localStorage
// is genuinely an external system: the server/build snapshot must always
// be the default demo data, and the real value is only known client-side.
// That's exactly the case useSyncExternalStore exists for.
const STORAGE_KEY = "umbrella-demo-v1";
const ACTIVE_KEY = "umbrella-demo-active-matter";

interface Store {
  matters: Matter[];
  activeMatterId: string | null;
}

const SERVER_SNAPSHOT: Store = { matters: DEMO_MATTERS, activeMatterId: null };

let cachedRawMatters: string | null | undefined;
let cachedRawActive: string | null | undefined;
let cachedSnapshot: Store = SERVER_SNAPSHOT;

function readSnapshot(): Store {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;

  const rawMatters = window.localStorage.getItem(STORAGE_KEY);
  const rawActive = window.localStorage.getItem(ACTIVE_KEY);

  if (rawMatters === cachedRawMatters && rawActive === cachedRawActive) {
    return cachedSnapshot;
  }

  cachedRawMatters = rawMatters;
  cachedRawActive = rawActive;

  let matters = DEMO_MATTERS;
  if (rawMatters) {
    try {
      const parsed = JSON.parse(rawMatters) as { matters: Matter[] };
      if (parsed.matters?.length) matters = parsed.matters;
    } catch {
      matters = DEMO_MATTERS;
    }
  }

  cachedSnapshot = { matters, activeMatterId: rawActive };
  return cachedSnapshot;
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

function writeMatters(matters: Matter[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ matters }));
  notify();
}

export function useDemoStore() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => SERVER_SNAPSHOT);

  const addMatter = useCallback((matter: Matter) => {
    writeMatters([matter, ...readSnapshot().matters]);
  }, []);

  const setChecklistStatus = useCallback(
    (matterId: string, itemId: string, status: ChecklistStatus) => {
      const next = readSnapshot().matters.map((m) =>
        m.id !== matterId
          ? m
          : {
              ...m,
              checklist: m.checklist.map((c) =>
                c.id === itemId ? { ...c, status } : c
              ),
            }
      );
      writeMatters(next);
    },
    []
  );

  const setActiveMatterId = useCallback((id: string) => {
    window.localStorage.setItem(ACTIVE_KEY, id);
    notify();
  }, []);

  const resetDemo = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(ACTIVE_KEY);
    notify();
  }, []);

  const getMatter = useCallback(
    (id: string | null) => snapshot.matters.find((m) => m.id === id),
    [snapshot.matters]
  );

  return {
    matters: snapshot.matters,
    activeMatterId: snapshot.activeMatterId,
    setActiveMatterId,
    addMatter,
    setChecklistStatus,
    resetDemo,
    getMatter,
  };
}
