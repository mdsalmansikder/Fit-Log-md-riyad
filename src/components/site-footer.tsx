import Link from "next/link";
import { Icon } from "@/components/icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" href="/">
          <span className="brand-mark"><Icon name="logo" /></span>
          <strong>FITLOG</strong>
        </Link>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
