import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/app/components/icon";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" />WORKOUT LIBRARY</div>
        <h1>TRAIN WITH INTENT.<br /><span>LOG EVERY SET.</span></h1>
        <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
        <Link className="button button-primary" href="#library">BROWSE WORKOUTS <Icon name="arrow" /></Link>
      </div>
      <div className="hero-visual">
        <Image src="/hero-strength.png" alt="Illustration of an athlete performing a seated strength exercise" width={280} height={345} priority sizes="(max-width: 700px) 70vw, (max-width: 1050px) 35vw, 280px" />
      </div>
    </section>
  );
}
