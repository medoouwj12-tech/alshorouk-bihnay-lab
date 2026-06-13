import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "full" | "compact" | "mark";
  className?: string;
}

/**
 * Al-Shorouk Bihnay Lab Logo
 * Combines a stylized sunrise (الشروق) with a medical plus symbol,
 * conveying trust, hope, and clinical precision.
 */
export function Logo({ variant = "full", className, ...props }: LogoProps) {
  if (variant === "mark") {
    return <LogoMark className={className} {...props} />;
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        <LogoMark className="h-9 w-9" />
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold text-primary-700">الشروق</span>
          <span className="text-[10px] font-medium text-muted-foreground">معمل بهناي</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-12 w-12 shrink-0" />
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold text-primary-700">معمل الشروق</span>
        <span className="text-sm font-semibold text-teal-600">بهناي</span>
      </div>
    </div>
  );
}

function LogoMark({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary-600", className)}
      aria-label="معمل الشروق بهناي"
      role="img"
      {...props}
    >
      {/* Soft outer ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="url(#bgGrad)"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.95"
      />
      {/* Sunrise rays (subtle) */}
      <g opacity="0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="32" y1="8" x2="32" y2="14" />
        <line x1="14" y1="20" x2="18" y2="24" />
        <line x1="50" y1="20" x2="46" y2="24" />
      </g>
      {/* Half-sun arc */}
      <path
        d="M 16 40 A 16 16 0 0 1 48 40"
        stroke="url(#sunGrad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Medical Plus */}
      <g transform="translate(32 32)">
        <rect
          x="-3"
          y="-10"
          width="6"
          height="20"
          rx="1.5"
          fill="url(#plusGrad)"
        />
        <rect
          x="-10"
          y="-3"
          width="20"
          height="6"
          rx="1.5"
          fill="url(#plusGrad)"
        />
      </g>
      {/* Test tube / droplet accent */}
      <path
        d="M 32 44 Q 29 48 32 50 Q 35 48 32 44 Z"
        fill="url(#dropGrad)"
        opacity="0.9"
      />

      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#E6F4FB" />
          <stop offset="100%" stopColor="#CCE9F6" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0" y1="0" x2="64" y2="0">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
        <linearGradient id="plusGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
        <radialGradient id="dropGrad" cx="32" cy="46" r="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="100%" stopColor="#0077B6" />
        </radialGradient>
      </defs>
    </svg>
  );
}
