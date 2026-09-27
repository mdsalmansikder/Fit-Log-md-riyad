import Link from "next/link";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return (
    <section className="not-found content-shell">
      <span className="eyebrow"><span className="eyebrow-dot" />WRONG TURN / 404</span>
      <h1>THIS REP<br /><span>DOESN&apos;T COUNT.</span></h1>
      <p>That page isn&apos;t in the program. Get back to the library and find your next lift.</p>
      <Link className="button button-primary" href="/">BACK TO WORKOUTS <Icon name="arrow" /></Link>
    </section>
  );
}
