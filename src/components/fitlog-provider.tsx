"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

type StoredState = { plan: number[]; saved: number[]; done: number[] };
type Toast = { message: string; id: number } | null;
type FitLogContextValue = StoredState & {
  hydrated: boolean;
  toast: Toast;
  addToPlan: (id: number) => void;
  toggleSaved: (id: number) => void;
  removeFromPlan: (id: number) => void;
  markDone: (id: number) => void;
};
type StateUpdate = { next: StoredState; message?: string };

const emptyState: StoredState = { plan: [], saved: [], done: [] };
const STORAGE_KEY = "fitlog-state";
const listeners = new Set<() => void>();
let storedState = emptyState;
let initialized = false;

function readStoredState(): StoredState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") throw new Error("Stored FitLog state is not an object");
    const stored = value as Record<string, unknown>;
    const ids = (candidate: unknown) =>
      Array.isArray(candidate) && candidate.every((id) => Number.isInteger(id) && id > 0)
        ? candidate as number[]
        : [];
    return { plan: ids(stored.plan).slice(0, 5), saved: ids(stored.saved), done: ids(stored.done) };
  } catch (error) {
    console.error("Unable to read saved FitLog workouts.", error);
    return emptyState;
  }
}

function getSnapshot() {
  if (!initialized && typeof window !== "undefined") {
    storedState = readStoredState();
    initialized = true;
  }
  return storedState;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  function onStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    storedState = readStoredState();
    initialized = true;
    listeners.forEach((notify) => notify());
  }
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function updateStoredState(update: (current: StoredState) => StateUpdate) {
  const current = getSnapshot();
  const result = update(current);
  if (result.next === current) return { persisted: true, message: result.message };

  storedState = result.next;
  initialized = true;
  let persisted = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
  } catch (error) {
    persisted = false;
    console.error("Unable to save FitLog workouts.", error);
  }
  listeners.forEach((notify) => notify());
  return { persisted, message: result.message };
}

const FitLogContext = createContext<FitLogContextValue | null>(null);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => emptyState);
  const [toast, setToast] = useState<Toast>(null);
  const hydrated = useSyncExternalStore(
    (listener) => {
      if (initialized) return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => initialized,
    () => false,
  );

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = useCallback((message: string) => {
    setToast({ message, id: Date.now() });
  }, []);

  const addToPlan = useCallback((id: number) => {
    const result = updateStoredState((current) => {
      if (current.plan.includes(id)) return { next: current, message: "This lift is already in today's plan." };
      if (current.plan.length >= 5) return { next: current, message: "Today's plan is full. Finish a lift to make room." };
      return { next: { ...current, plan: [...current.plan, id] }, message: "Added to today's plan." };
    });
    notify(result.persisted ? result.message ?? "Added to today's plan." : "Your browser could not save this plan.");
  }, [notify]);

  const toggleSaved = useCallback((id: number) => {
    const result = updateStoredState((current) => {
      const exists = current.saved.includes(id);
      return {
        next: { ...current, saved: exists ? current.saved.filter((item) => item !== id) : [...current.saved, id] },
        message: exists ? "Removed from saved workouts." : "Saved for later.",
      };
    });
    notify(result.persisted ? result.message ?? "Saved for later." : "Your browser could not save this workout.");
  }, [notify]);

  const removeFromPlan = useCallback((id: number) => {
    const result = updateStoredState((current) => ({
      next: {
        ...current,
        plan: current.plan.filter((item) => item !== id),
        done: current.done.filter((item) => item !== id),
      },
      message: "Lift removed from today's plan.",
    }));
    notify(result.persisted ? result.message ?? "Lift removed from today's plan." : "Your browser could not save this change.");
  }, [notify]);

  const markDone = useCallback((id: number) => {
    const result = updateStoredState((current) => ({
      next: current.done.includes(id) ? current : { ...current, done: [...current.done, id] },
      message: "Lift marked as done. Nice work.",
    }));
    notify(result.persisted ? result.message ?? "Lift marked as done." : "Your browser could not save this change.");
  }, [notify]);

  const value = useMemo(
    () => ({ ...state, hydrated, toast, addToPlan, toggleSaved, removeFromPlan, markDone }),
    [addToPlan, hydrated, markDone, removeFromPlan, state, toast, toggleSaved],
  );
  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside FitLogProvider");
  return context;
}
