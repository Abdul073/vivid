"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, defaultChecked, ...props }, ref) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(
    defaultChecked || checked || false
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={cn(
          "inline-flex h-7 w-14 shrink-0 items-center rounded-full relative",
          "bg-gray-700 shadow-lg",
          className
        )}
      />
    );
  }

  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full relative",
        "border-2 border-transparent transition-colors duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isChecked
          ? "bg-gradient-to-r from-blue-400 via-sky-200 to-blue-500"
          : "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900",
        "shadow-lg overflow-hidden",
        className
      )}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      {...props}
    >
      {/* Background elements */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars with twinkle animation */}
        {!isChecked && (
          <>
            <span className="absolute h-1 w-1 bg-white rounded-full top-1 left-2 opacity-70 animate-[twinkle_3s_ease-in-out_infinite]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-3 left-4 opacity-60 animate-[twinkle_4s_ease-in-out_infinite]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-2 left-6 opacity-80 animate-[twinkle_2.5s_ease-in-out_infinite]"></span>
            <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-4 left-8 opacity-50 animate-[twinkle_3.5s_ease-in-out_infinite]"></span>
          </>
        )}

        {/* Clouds with subtle movement */}
        {isChecked && (
          <>
            <span className="absolute h-1.5 w-3 bg-white/30 rounded-full top-1 right-3 blur-[1px] animate-[cloudFloat_8s_linear_infinite]"></span>
            <span className="absolute h-1 w-2 bg-white/20 rounded-full top-3 right-5 blur-[1px] animate-[cloudFloat_6s_linear_infinite_reverse]"></span>
            <span className="absolute h-1 w-3 bg-white/25 rounded-full top-2 left-4 blur-[1px] animate-[cloudFloat_7s_linear_infinite]"></span>
          </>
        )}
      </div>

      {/* Moon Icon (Visible in Unchecked State) */}
      <Moon
        className={cn(
          "h-3.5 w-3.5 absolute left-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-gray-200",
          isChecked ? "opacity-0 -translate-x-2 rotate-45" : "opacity-100"
        )}
      />

      {/* Sun Icon (Visible in Checked State) */}
      <Sun
        className={cn(
          "h-3.5 w-3.5 absolute right-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-yellow-300",
          isChecked
            ? "opacity-100 animate-[sunPulse_1.5s_ease-in-out_infinite]"
            : "opacity-0 translate-x-2"
        )}
      />

      {/* Switch Thumb with enhanced animations */}
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full shadow-lg ring-0 relative",
          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform will-change-transform",
          isChecked ? "translate-x-7" : "translate-x-0",
          isChecked
            ? "bg-gradient-to-br from-yellow-200 to-yellow-400"
            : "bg-gradient-to-br from-gray-300 to-gray-400",
          "border-2 border-white/80",
          "group"
        )}
      >
        {/* Sun inside thumb with shine effect */}
        <Sun
          className={cn(
            "h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "text-yellow-600 group-hover:scale-110 group-active:scale-90",
            isChecked
              ? "opacity-100 scale-100 rotate-0 animate-[spin_10s_linear_infinite]"
              : "opacity-0 scale-50 -rotate-45"
          )}
        />

        {/* Moon inside thumb with phase effect */}
        <Moon
          className={cn(
            "h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "text-gray-700 group-hover:scale-110 group-active:scale-90",
            isChecked
              ? "opacity-0 scale-50 rotate-45"
              : "opacity-100 scale-100 rotate-0"
          )}
        />

        {/* Shine effect for the thumb */}
        {isChecked && (
          <span className="absolute inset-0 rounded-full bg-white/10 pointer-events-none animate-[shine_3s_ease-in-out_infinite]" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = "Switch";

export { Switch };
