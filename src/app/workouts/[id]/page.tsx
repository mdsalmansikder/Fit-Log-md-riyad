import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailActions } from "@/app/components/detail-actions";
import { Icon } from "@/app/components/icon";
import { getWorkout } from "@/lib/fitlog";

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const workout = await getWorkout(id);
  if (!workout) notFound();

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", String(workout.sets)],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating.toFixed(1)],
  ];

  return (
    <div className="detail-page content-shell">
      <div className="breadcrumbs"><Link href="/">WORKOUTS</Link><span>/</span><span>{workout.name.toUpperCase()}</span></div>
      <div className="detail-layout">
        <div className="detail-visual">
          <Image src={workout.image} alt={workout.name} fill priority sizes="(max-width: 850px) 100vw, 48vw" />
          <span className="detail-visual-number">FITLOG / {String(workout.id).padStart(3, "0")}</span>
          <span className="detail-visual-title">{workout.muscleGroups[0]}<br />DAY.</span>
        </div>
        <div className="detail-copy">
          <div className="eyebrow"><span className="eyebrow-dot" />THE MOVEMENT / {String(workout.id).padStart(2, "0")}</div>
          <h1>{workout.name}</h1>
          <p className="detail-description">{workout.description}</p>
          <div className="tag-row detail-tags">{workout.muscleGroups.map((group) => <span className="tag" key={group}>{group}</span>)}</div>
          <div className="spec-panel">
            <div className="spec-heading"><span>KEY SPECS</span><span>01 — 07</span></div>
            <dl>{specs.map(([label, value]) => <div className="spec-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
          <div className="instructions">
            <div className="spec-heading"><span>INSTRUCTIONS</span><span>{String(workout.instructions.length).padStart(2, "0")} STEPS</span></div>
            <ol>{workout.instructions.map((instruction, index) => <li key={instruction}><span>{String(index + 1).padStart(2, "0")}</span><p>{instruction}</p></li>)}</ol>
          </div>
          <DetailActions workout={workout} />
        </div>
      </div>
      <div className="detail-next"><Link href="/">← BACK TO THE LIBRARY</Link><span>ONE REP AT A TIME.</span></div>
      <div className="detail-mini-note"><Icon name="dumbbell" /> TRAIN WITH INTENT. LOG EVERY SET.</div>
    </div>
  );
}
