import { cn } from "../../lib/utils";

/**
 * Skeleton loader component used for loading states instead of spinners
 */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-800", className)}
      {...props}
    />
  );
}
