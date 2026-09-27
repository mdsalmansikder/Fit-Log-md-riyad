import { Suspense } from "react";
import { PlanScreen } from "@/app/components/plan-screen";

export default function MyPlanPage() {
  return <Suspense fallback={<div className="loading-state"><span className="loader" />Loading workouts…</div>}><PlanScreen /></Suspense>;
}
