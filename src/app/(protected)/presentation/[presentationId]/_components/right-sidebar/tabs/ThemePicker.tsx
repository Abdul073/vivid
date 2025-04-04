import { updateTheme } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { themes } from "@/lib/constants";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import React from "react";
import { toast } from "sonner";

const ThemePicker = () => {
  const { currentTheme, setCurrentTheme, project } = useSlideStore();

  const { setTheme } = useTheme();

  const handleThemeChange = async (theme: Theme) => {
    if (!project) {
      toast.error("", {
        description: "Failed to update theme",
      });
      return;
    }
    setTheme(theme.type);
    setCurrentTheme(theme);

    try {
      const res = await updateTheme(project.id, theme.name);
      if (res.status !== 200) {
        throw new Error("Failed to update theme");
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update theme",
      });
    }
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="mb-4 text-center font-bold">Themes</div>
      <div className="flex flex-col space-y-4">
        {themes.map((theme) => (
          <Button
            onClick={() => handleThemeChange(theme)}
            key={theme.name}
            variant={currentTheme.name === theme.name ? "default" : "outline"}
            className="flex flex-col items-center justify-start px-4 w-full h-auto"
            style={{
              fontFamily: theme.fontColor,
              color: theme.fontColor,
              background: theme.gradientBackground || theme.backgroundColor,
            }}
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-xl font-bold">{theme.name}</span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.accentColor }}
              />
            </div>
            <div className="space-y-1 w-full">
              <div
                className="text-2xl font-bold"
                style={{ color: theme.accentColor }}
              >
                Title
              </div>
              <div className="text-base opacity-80">
                Body & <span style={{ color: theme.accentColor }}>link</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ThemePicker;
