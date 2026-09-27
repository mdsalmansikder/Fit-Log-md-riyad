import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" />WORKOUT LIBRARY</div>
        <h1>TRAIN WITH<br />INTENT. <span>LOG</span><br />EVERY SET.</h1>
        <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
        <Link className="button button-primary" href="#library">BROWSE WORKOUTS <Icon name="arrow" /></Link>
        <div className="hero-footnote"><span>01 / 12</span><i /> BUILT FOR THE WORK</div>
      </div>
      <div className="hero-visual">
        <Image src="/workouts/1-barbell-bench-press.jpg" alt="Athlete training with a barbell" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
        <div className="hero-image-shade" />
        <div className="hero-visual-top"><span>NO. 001</span><span>EST. 2026</span></div>
        <div className="hero-image-caption"><span>THE WORK<br />IS THE POINT.</span><b>FITLOG / 001</b></div>
        <span className="hero-vertical-label">STRENGTH / CONDITIONING / CONSISTENCY</span>
      </div>
    </section>
  );
}
