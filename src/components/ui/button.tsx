import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-card-hover",
        teal: "bg-teal-500 text-white shadow-soft hover:bg-teal-600 hover:shadow-card-hover",
        outline:
          "border-2 border-primary-600 bg-transparent text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:border-primary-700",
        ghost: "text-primary-700 hover:bg-primary-50",
        soft: "bg-primary-50 text-primary-700 hover:bg-primary-100",
        whatsapp: "bg-[#25D366] text-white shadow-soft hover:bg-[#1DA851] hover:shadow-card-hover",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-7 text-base py-3.5",
        xl: "h-14 px-8 text-base py-3.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
