import { isWorkout, withLocalImage } from "@/lib/fitlog";

const endpoints = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export async function GET() {
  const errors: string[] = [];
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) {
        errors.push(`${endpoint} returned ${response.status}`);
        continue;
      }
      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(isWorkout)) {
        throw new Error(`${endpoint} returned invalid workout data`);
      }
      return Response.json(data.map(withLocalImage));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown API error";
      errors.push(message);
    }
  }
  console.error("Both FitLog workout APIs failed:", errors);
  return Response.json({ error: "Workout library is temporarily unavailable." }, { status: 502 });
}
