"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/app/components/fitlog-provider";
import { Icon } from "@/app/components/icon";

export function SiteHeader() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="FitLog home">
          <span className="brand-mark"><Icon name="logo" /></span>
          <span>FIT<span>LOG</span><small>TRAINING JOURNAL</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link className={pathname === "/" || pathname.startsWith("/workouts/") ? "active" : ""} href="/">Workout</Link>
          <Link className={pathname === "/my-plan" ? "active" : ""} href="/my-plan">My Plan</Link>
        </nav>
        <div className="header-badges">
          <Link className="counter-badge plan-badge" href="/my-plan">
            <span>PLAN</span><b>{plan.length}</b>
          </Link>
          <Link className="counter-badge saved-badge" href="/my-plan?tab=saved">
            <span>SAVED</span><b>{saved.length}</b>
          </Link>
        </div>
      </div>
    </header>
  );
}
