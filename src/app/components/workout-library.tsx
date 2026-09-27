"use client";

import { useMemo, useState } from "react";
import { WorkoutCard } from "@/app/components/workout-card";
import { Icon } from "@/app/components/icon";
import { useWorkouts } from "@/hooks/use-workouts";

type SortKey = "duration" | "caloriesBurned" | "rating";

export function WorkoutLibrary() {
  const { workouts, loading, error } = useWorkouts();
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return workouts
      .filter((workout) =>
        !term ||
        workout.name.toLowerCase().includes(term) ||
        workout.muscleGroups.some((group) => group.toLowerCase().includes(term)),
      )
      .sort((left, right) => left[sortBy] - right[sortBy]);
  }, [search, sortBy, workouts]);

  return (
    <section className="library section-wrap" id="library">
      <div className="section-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" />PICK YOUR NEXT SET</div>
          <h2>THE <span>LIBRARY</span></h2>
          <p>Twelve lifts covering every major muscle group.</p>
        </div>
        <span className="section-count">{String(workouts.length).padStart(2, "0")} <small>EXERCISES</small></span>
      </div>
      <div className="library-tools">
        <label className="search-field">
          <Icon name="search" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search lifts or muscle groups" aria-label="Search workouts" />
        </label>
        <label className="sort-control">
          <span>SORT BY</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortKey)} aria-label="Sort workouts">
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <Icon name="chevron" />
        </label>
      </div>
      {loading && (
        <div className="loading-state" role="status">
          <span className="loader" />
          <span>Loading workouts…</span>
        </div>
      )}
      {!loading && error && <div className="error-state" role="alert">{error} Please try refreshing the page.</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="empty-search">No lifts found. Try another name or muscle group.</div>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="workout-grid">{filtered.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>
      )}
      <div className="library-endnote"><span>END OF LINE</span><i /><span>KEEP SHOWING UP.</span></div>
    </section>
  );
}
