import { Input } from "../ui/Input";
import { cn } from "../../lib/utils";

/**
 * Standard Form Field Component
 * Adheres to Form Design Standards:
 * - Bold Label
 * - Helper Text (optional, gray)
 * - Error Message (red)
 * - Required Indicator (red *)
 */
export function FormField({ 
  label, 
  name, 
  required, 
  error, 
  helperText, 
  className,
  children,
  ...props 
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* If children are provided, render them (for custom inputs like select/textarea). Otherwise render standard Input */}
      {children ? (
        children
      ) : (
        <Input id={name} name={name} required={required} {...props} />
      )}

      {helperText && !error && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
