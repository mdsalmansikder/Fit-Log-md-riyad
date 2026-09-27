import { Suspense } from "react";
import { PlanScreen } from "@/components/plan-screen";

export default function MyPlanPage() {
  return <Suspense fallback={<div className="loading-state"><span className="loader" />Loading workouts…</div>}><PlanScreen /></Suspense>;
}
