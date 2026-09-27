import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/lib/fitlog";
import { Icon } from "@/components/icon";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link className="workout-card" href={`/workouts/${workout.id}`}>
      <div className="card-image">
        <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="card-index">{String(workout.id).padStart(2, "0")}</span>
        <span className="card-open"><Icon name="arrow" /></span>
      </div>
      <div className="card-copy">
        <div className="tag-row">
          {workout.muscleGroups.map((group) => <span className="tag" key={group}>{group}</span>)}
        </div>
        <h3>{workout.name}</h3>
        <p className="equipment-line"><Icon name="dumbbell" />{workout.equipment}</p>
        <div className="workout-stats">
          <span><Icon name="clock" />{workout.duration} min</span>
          <span><Icon name="flame" />{workout.caloriesBurned} kcal</span>
          <span><Icon name="star" />{workout.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
