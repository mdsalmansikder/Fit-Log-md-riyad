"use client";

import { useEffect, useState } from "react";
import { isWorkout } from "@/lib/fitlog";
import type { Workout } from "@/lib/fitlog";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/workouts", { signal: controller.signal });
        if (!response.ok) {
          const payload: unknown = await response.json();
          const message =
            payload && typeof payload === "object" && "error" in payload
              ? String(payload.error)
              : "Could not load workouts.";
          throw new Error(message);
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isWorkout)) {
          throw new Error("Workout API returned invalid data.");
        }
        setWorkouts(data);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        console.error("Unable to load FitLog workouts.", loadError);
        setError(loadError instanceof Error ? loadError.message : "Could not load workouts.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  return { workouts, loading, error };
}
