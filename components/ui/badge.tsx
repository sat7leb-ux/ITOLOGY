import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary" | "success" | "warning" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-jade/10 text-jade border border-jade/20",
    outline: "border border-line text-text-muted",
    secondary: "bg-paper text-text-primary border border-line",
    success: "bg-ok/10 text-ok border border-ok/20",
    warning: "bg-warn/10 text-warn border border-warn/20",
    destructive: "bg-stop/10 text-stop border border-stop/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
