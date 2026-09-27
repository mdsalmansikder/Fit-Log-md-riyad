"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/app/components/icon";
import { useFitLog } from "@/app/components/fitlog-provider";
import { useWorkouts } from "@/hooks/use-workouts";
import type { Workout } from "@/lib/fitlog";

type PlanTab = "plan" | "saved";

function PlanWorkoutCard({
  workout,
  isDone,
  isSavedTab,
  onDone,
  onRemove,
}: {
  workout: Workout;
  isDone: boolean;
  isSavedTab: boolean;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <article className={`plan-card${isDone ? " completed" : ""}`}>
      <Link className="plan-thumb" href={`/workouts/${workout.id}`}>
        <Image src={workout.image} alt="" fill sizes="120px" />
      </Link>
      <div className="plan-card-copy">
        <div className="plan-tags">{workout.muscleGroups.map((group) => <span key={group}>{group}</span>)}</div>
        <Link href={`/workouts/${workout.id}`}><h3>{workout.name}</h3></Link>
        <p className="equipment-line"><Icon name="dumbbell" />{workout.equipment}</p>
        <div className="workout-stats">
          <span><Icon name="clock" />{workout.duration} min</span>
          <span><Icon name="flame" />{workout.caloriesBurned} kcal</span>
          <span><Icon name="star" />{workout.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="plan-card-actions">
        <Link className="view-link" href={`/workouts/${workout.id}`}>VIEW DETAILS <Icon name="arrow" /></Link>
        {!isSavedTab && <button className={`done-button${isDone ? " marked-done" : ""}`} type="button" onClick={onDone} disabled={isDone}><Icon name="check" />{isDone ? "DONE" : "MARK AS DONE"}</button>}
        <button className="remove-button" type="button" onClick={onRemove} aria-label={isSavedTab ? "Remove from saved" : "Remove from plan"}><Icon name="close" /></button>
      </div>
    </article>
  );
}

export function PlanScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const initialTab: PlanTab = params.get("tab") === "saved" ? "saved" : "plan";
  const [selectedTab, setSelectedTab] = useState<PlanTab>(initialTab);
  const tab = params.get("tab") === "saved" ? "saved" : selectedTab;
  const { plan, saved, done, hydrated, removeFromPlan, toggleSaved, markDone } = useFitLog();
  const { workouts, loading, error } = useWorkouts();

  const planWorkouts = useMemo(() => plan.flatMap((id) => workouts.filter((workout) => workout.id === id)), [plan, workouts]);
  const savedWorkouts = useMemo(() => saved.flatMap((id) => workouts.filter((workout) => workout.id === id)), [saved, workouts]);
  const listed = tab === "plan" ? planWorkouts : savedWorkouts;
  const minutes = planWorkouts.reduce((total, workout) => total + workout.duration, 0);
  const calories = planWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);

  return (
    <section className="plan-page content-shell">
      <div className="eyebrow"><span className="eyebrow-dot" />YOUR TRAINING LOG / 2026</div>
      <div className="plan-title-row"><div><h1>MY <span>PLAN</span></h1><p>Cap of five lifts for today. Finish them, then load more.</p></div><span className="plan-date">TODAY / TRAINING LOG</span></div>
      <div className="metrics-row">
        <div className="metric-card"><span>EXERCISES</span><strong>{planWorkouts.length}<small> / 05</small></strong><i><Icon name="dumbbell" /></i></div>
        <div className="metric-card"><span>MINUTES</span><strong>{minutes}<small> MIN</small></strong><i><Icon name="clock" /></i></div>
        <div className="metric-card"><span>CALORIES</span><strong>{calories}<small> KCAL</small></strong><i><Icon name="flame" /></i></div>
      </div>
      <div className="plan-tabs" role="tablist" aria-label="Workout lists">
        <button className={tab === "plan" ? "active" : ""} type="button" role="tab" aria-selected={tab === "plan"} onClick={() => { setSelectedTab("plan"); router.replace("/my-plan"); }}>TODAY&apos;S PLAN <span>{plan.length}</span></button>
        <button className={tab === "saved" ? "active" : ""} type="button" role="tab" aria-selected={tab === "saved"} onClick={() => { setSelectedTab("saved"); router.replace("/my-plan?tab=saved"); }}>SAVED <span>{saved.length}</span></button>
      </div>
      {(loading || !hydrated) && <div className="loading-state plan-loading" role="status"><span className="loader" />Loading workouts…</div>}
      {!loading && hydrated && error && <div className="error-state" role="alert">{error} Please try refreshing the page.</div>}
      {!loading && hydrated && !error && listed.length === 0 && (
        <div className="plan-empty"><span className="empty-mark"><Icon name="dumbbell" /></span><span className="eyebrow">REST IS OPTIONAL.</span><h2>NOTHING HERE YET</h2><p>Browse the library and add a lift to get today moving.</p><Link className="button button-primary" href="/">GO TO WORKOUTS <Icon name="arrow" /></Link></div>
      )}
      {!loading && hydrated && !error && listed.length > 0 && (
        <div className="plan-list">
          {listed.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              isDone={tab === "plan" && done.includes(workout.id)}
              isSavedTab={tab === "saved"}
              onDone={() => markDone(workout.id)}
              onRemove={() => tab === "plan" ? removeFromPlan(workout.id) : toggleSaved(workout.id)}
            />
          ))}
          {tab === "plan" && plan.length < 5 && <Link className="add-more" href="/"><span>+</span> ADD ANOTHER LIFT <Icon name="arrow" /></Link>}
        </div>
      )}
      <div className="plan-bottomline"><span>STAY THE COURSE.</span><i /><span>ONE DAY AT A TIME.</span></div>
    </section>
  );
}
