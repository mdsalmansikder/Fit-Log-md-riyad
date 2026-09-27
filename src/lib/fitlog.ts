export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export const workoutImages: Record<number, string> = {
  1: "/workouts/1-barbell-bench-press.jpg",
  2: "/workouts/2-pull-up.jpg",
  3: "/workouts/3-back-squat.jpg",
  4: "/workouts/4-overhead-press.jpg",
  5: "/workouts/5-dumbbell-bicep-curl.jpg",
  6: "/workouts/6-hollow-body-plank.jpg",
  7: "/workouts/7-burpee.jpg",
  8: "/workouts/8-conventional-deadlift.jpg",
  9: "/workouts/9-push-up.jpg",
  10: "/workouts/10-walking-lunge.jpg",
  11: "/workouts/11-russian-twist.jpg",
  12: "/workouts/12-kettlebell-swing.jpg",
};

export function isWorkout(value: unknown): value is Workout {
  if (!value || typeof value !== "object") return false;
  const workout = value as Record<string, unknown>;
  return (
    typeof workout.id === "number" &&
    typeof workout.name === "string" &&
    Array.isArray(workout.muscleGroups) &&
    typeof workout.equipment === "string" &&
    typeof workout.duration === "number" &&
    typeof workout.caloriesBurned === "number" &&
    typeof workout.rating === "number" &&
    Array.isArray(workout.instructions)
  );
}

export function withLocalImage(workout: Workout): Workout {
  return { ...workout, image: workoutImages[workout.id] ?? workout.image };
}

const apiEndpoints = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export async function getWorkout(id: string): Promise<Workout | null> {
  const failures: string[] = [];
  let missingAtBothSources = true;
  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(`${endpoint}/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (response.status === 404) continue;
      missingAtBothSources = false;
      if (!response.ok) {
        failures.push(`${endpoint} returned ${response.status}`);
        continue;
      }
      const result: unknown = await response.json();
      if (isWorkout(result)) return withLocalImage(result);
      failures.push(`${endpoint} returned invalid workout data for ${id}`);
    } catch (error) {
      missingAtBothSources = false;
      failures.push(error instanceof Error ? error.message : "Unknown workout API error");
    }
  }
  if (!missingAtBothSources) {
    console.error(`Unable to load workout ${id}:`, failures);
    throw new Error(`Workout ${id} could not be loaded.`);
  }
  return null;
}
