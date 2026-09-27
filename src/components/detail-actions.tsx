"use client";

import { useFitLog } from "@/components/fitlog-provider";
import { Icon } from "@/components/icon";
import type { Workout } from "@/lib/fitlog";

export function DetailActions({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, toggleSaved } = useFitLog();
  const alreadyPlanned = plan.includes(workout.id);
  const alreadySaved = saved.includes(workout.id);
  return (
    <div className="detail-actions">
      <button
        className="button button-primary"
        type="button"
        disabled={alreadyPlanned || (!alreadyPlanned && plan.length >= 5)}
        onClick={() => addToPlan(workout.id)}
      >
        <Icon name={alreadyPlanned ? "check" : "plus"} />
        {alreadyPlanned ? "IN TODAY'S PLAN" : "ADD TO TODAY'S PLAN"}
      </button>
      <button className={`button button-secondary${alreadySaved ? " is-saved" : ""}`} type="button" onClick={() => toggleSaved(workout.id)}>
        <Icon name="bookmark" />{alreadySaved ? "SAVED FOR LATER" : "SAVE FOR LATER"}
      </button>
    </div>
  );
}
