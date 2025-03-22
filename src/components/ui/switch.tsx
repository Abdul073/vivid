import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure you have this utility function
import { Moon, Sun } from "lucide-react"; // Import icons
import * as SwitchPrimitives from "@radix-ui/react-switch";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full relative",
        "border-2 border-transparent shadow-sm transition-colors duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className // Merge custom class names
      )}
      {...props}
    >
      {/* Moon Icon (Visible in Unchecked State) */}
      <Moon
        className={cn(
          "h-3 w-3 absolute left-1 transition-opacity duration-300 ease-in-out stroke-gray-600",
          "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100"
        )}
      />

      {/* Sun Icon (Visible in Checked State) */}
      <Sun
        className={cn(
          "h-3 w-3 absolute right-1 transition-opacity duration-300 ease-in-out stroke-gray-400",
          "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
        )}
      />

      {/* Switch Thumb (Moving Button) */}
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
          "transition-transform duration-300 ease-in-out transform",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      >
        {/* Dynamic Icons inside the Thumb */}
        <Moon
          className={cn(
            "h-2 w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out stroke-gray-600",
            "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100"
          )}
        />
        <Sun
          className={cn(
            "h-2 w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out stroke-black",
            "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
          )}
        />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = "Switch";

export { Switch };
