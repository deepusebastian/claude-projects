import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-to-br from-brand-500 to-blue-500 text-white shadow-[0_2px_8px_rgba(108,60,239,0.25)] hover:opacity-90":
              variant === "primary",
            "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100":
              variant === "secondary",
            "bg-transparent text-brand-500 hover:bg-brand-50":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-[13px]": size === "sm",
            "px-5 py-2.5 text-[14px]": size === "md",
            "px-7 py-3.5 text-[16px]": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
