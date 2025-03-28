"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
// Add the ripple effect to the switch
// Import the ripple component at the top
import { SwitchRipple } from "./switch-animation";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full relative",
        "border-2 border-transparent transition-all duration-500 ease-&lsqb;cubic-bezier(0.34,1.56,0.64,1)&rsqb]", // Spring-like easing for smoother motion
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-400 data-[state=checked]:to-blue-600",
        "data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-gray-700 data-[state=unchecked]:to-gray-900",
        "shadow-lg", // Add shadow for depth
        className
      )}
      {...props}
    >
      {/* Ripple effect */}
      <SwitchRipple
        active={props.checked as boolean}
        color={
          props.checked
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(255, 255, 255, 0.2)"
        }
      />
      {/* Background elements */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars (visible in unchecked/dark state) */}
        <div className="absolute inset-0 data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100 transition-opacity duration-400 ease-in-out">
          <span className="absolute h-1 w-1 bg-white rounded-full top-1 left-2 opacity-70"></span>
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-3 left-4 opacity-60"></span>
          <span className="absolute h-0.5 w-0.5 bg-white rounded-full top-2 left-6 opacity-80"></span>
        </div>

        {/* Clouds (visible in checked/light state) */}
        <div className="absolute inset-0 data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0 transition-opacity duration-400 ease-in-out">
          <span className="absolute h-1.5 w-3 bg-white/30 rounded-full top-1 right-3 blur-[1px]"></span>
          <span className="absolute h-1 w-2 bg-white/20 rounded-full top-3 right-5 blur-[1px]"></span>
        </div>
      </div>

      {/* Moon Icon (Visible in Unchecked State) */}
      <Moon
        className={cn(
          "h-3.5 w-3.5 absolute left-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-gray-300",
          "data-[state=checked]:opacity-0 data-[state=checked]:-translate-x-2 data-[state=unchecked]:opacity-100"
        )}
      />

      {/* Sun Icon (Visible in Checked State) */}
      <Sun
        className={cn(
          "h-3.5 w-3.5 absolute right-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-yellow-300",
          "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0 data-[state=unchecked]:translate-x-2"
        )}
      />

      {/* Switch Thumb (Moving Button) */}
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full shadow-lg ring-0",
          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform will-change-transform",
          "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 data-[state=checked]:scale-105 data-[state=unchecked]:scale-100",
          "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-yellow-200 data-[state=checked]:to-yellow-400",
          "data-[state=unchecked]:bg-gradient-to-br data-[state=unchecked]:from-gray-300 data-[state=unchecked]:to-gray-400",
          "border-2 border-white/80"
        )}
      >
        {/* Dynamic Icons inside the Thumb */}
        <Moon
          className={cn(
            "h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-gray-700",
            "data-[state=checked]:opacity-0 data-[state=checked]:scale-50 data-[state=unchecked]:opacity-100 data-[state=unchecked]:scale-100"
          )}
        />
        <Sun
          className={cn(
            "h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-yellow-600",
            "data-[state=checked]:opacity-100 data-[state=checked]:scale-100 data-[state=unchecked]:opacity-0 data-[state=unchecked]:scale-50"
          )}
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = "Switch";

export { Switch };
