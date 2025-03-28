"use client";

import * as React from "react";

// This is a helper component to add a subtle ripple effect when the switch is toggled
export function SwitchRipple({
  active,
  color = "rgba(255, 255, 255, 0.7)",
}: {
  active: boolean;
  color?: string;
}) {
  const [ripple, setRipple] = React.useState(false);

  React.useEffect(() => {
    // Trigger ripple animation when active state changes
    if (active !== undefined) {
      setRipple(true);
      const timer = setTimeout(() => setRipple(false), 600);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!ripple) return null;

  return (
    <span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        animation: "ripple 600ms ease-out forwards",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}

// Add this to your global CSS
export const rippleStyles = `
@keyframes ripple {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  40% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
`;
