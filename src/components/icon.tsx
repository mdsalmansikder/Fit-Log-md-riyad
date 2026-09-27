import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "logo"
  | "arrow"
  | "clock"
  | "flame"
  | "star"
  | "plus"
  | "bookmark"
  | "check"
  | "close"
  | "search"
  | "chevron"
  | "dumbbell";

const paths: Record<IconName, ReactNode> = {
  logo: (
    <>
      <path d="M4 12h3m10 0h3M7 8v8m10-8v8M10 6v12m4-12v12" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  flame: (
    <>
      <path d="M12 22c4.2 0 7-2.9 7-7 0-3.2-2.2-5.4-4-7.5-.4 2.5-1.8 3.2-2 3.5C12.8 7.5 11 4.8 9 3 9.5 7.4 5 10 5 15c0 4.1 2.8 7 7 7Z" />
      <path d="M12 22c-1.7 0-2.7-1.2-2.7-2.8 0-1.4 1.1-2.5 2.5-3.8.4 1.3 2.9 2 2.9 3.8 0 1.6-1 2.8-2.7 2.8Z" />
    </>
  ),
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
  plus: <path d="M12 5v14m-7-7h14" />,
  bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4 4" />
    </>
  ),
  chevron: <path d="m7 10 5 5 5-5" />,
  dumbbell: (
    <>
      <path d="M6 9v6m12-6v6M3 10v4m18-4v4M6 12h12" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
