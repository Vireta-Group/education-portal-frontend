import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      status: {
        active: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        inactive: "border-transparent bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400",
        pending: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        destructive: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        default: "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export function StatusBadge({ className, status, children, ...props }) {
  return (
    <div className={cn(badgeVariants({ status }), className)} {...props}>
      {children || status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </div>
  );
}
