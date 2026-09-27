"use client";

import { useFitLog } from "@/app/components/fitlog-provider";
import { Icon } from "@/app/components/icon";

export function Toast() {
  const { toast } = useFitLog();
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="toast-message" key={toast.id}>
          <span className="toast-check"><Icon name="check" /></span>
          {toast.message}
        </div>
      )}
    </div>
  );
}
