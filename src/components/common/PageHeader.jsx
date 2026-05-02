import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function PageHeader({ title, breadcrumbs, actions, className }) {
  return (
    <div className={cn("mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0", className)}>
      <div className="flex flex-col gap-1">
        {/* Breadcrumb - simple implementation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center text-sm text-slate-500">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-medium text-slate-900 dark:text-slate-100">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
