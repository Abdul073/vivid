"use client";
import { useSlideStore } from "@/store/useSlideStore";
import { useParams, useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeCard from "./ThemeCard";
import ThemePicker from "./ThemePicker";
import { themes } from "@/lib/constants";

type Props = {};

const ThemePreview = (props: Props) => {
  const params = useParams();
  const router = useRouter();
  const controls = useAnimation();

  const { currentTheme, setCurrentTheme, project } = useSlideStore();

  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      router.push(`/presentation/${params.presentationId}`);
    }
  }, [project, router, params.presentationId]);

  useEffect(() => {
    controls.start("visible");
  }, [controls, selectedTheme]);

  const leftCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-4 shadow-md"
        style={{ backgroundColor: `${selectedTheme.accentColor}10` }}
      >
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: selectedTheme.accentColor }}
        >
          Quick Start Guide
        </h3>
        <ol
          className="list-decimal list-inside space-y-3"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and publish</li>
        </ol>
      </div>
      <Button
        className="w-full h-10 text-lg font-medium shadow-sm"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  const mainCardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-4 shadow-md"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: it acts as a text box.
          </p>
        </div>
        <div
          className="rounded-xl p-4 shadow-sm"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            You can get these by typing / smart
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 shadow-sm">
        <Button
          className="h-12 px-6 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Primary button
        </Button>
        <Button
          variant="outline"
          className="h-12 px-6 text-lg font-medium"
          style={{
            borderColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Secondary button
        </Button>
      </div>
    </div>
  );
  const rightCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: selectedTheme.accentColor }}
        >
          Theme Features
        </h3>
        <ul
          className="list-disc list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Responsive design</li>
          <li>Dark and light modes</li>
          <li>Custom color schemes</li>
          <li>Accessibility optimized</li>
        </ul>
      </div>
      <Button
        variant="outline"
        className="w-full h-12 text-lg font-medium"
        style={{
          borderColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Explore Features
      </Button>
    </div>
  );
  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div
      className="h-screen w-screen flex"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="p-12 flex flex-col items-center min-h-screen">
          <Button
            variant="outline"
            className="mb-12 self-start"
            size="lg"
            style={{
              backgroundColor: selectedTheme.accentColor + "10",
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + "20",
            }}
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <div className="w-full flex justify-center items-center relative flex-grow">
            <ThemeCard
              title="Quick Start"
              description="Get up and running in on time"
              content={leftCardContent}
              variant="left"
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title="Main Preview"
              description="This is the main theme preview card"
              content={mainCardContent}
              variant="main"
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title="Theme Features"
              description="Discover what our themes can do"
              content={rightCardContent}
              variant="right"
              theme={selectedTheme}
              controls={controls}
            />
          </div>
        </div>
      </div>
      <ThemePicker
        selectedTheme={selectedTheme}
        themes={themes}
        onThemeSelect={applyTheme}
      />
    </div>
  );
};

export default ThemePreview;

// "use client";
// import { useSlideStore } from "@/store/useSlideStore";
// import { useParams, useRouter } from "next/navigation";
// import { useAnimation } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { Theme } from "@/lib/types";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import ThemeCard from "./ThemeCard";
// import ThemePicker from "./ThemePicker";
// import { themes } from "@/lib/constants";
// import { readableColor } from "polished";

// const THEME_CARD_TITLES = {
//   QUICK_START: "Quick Start",
//   MAIN_PREVIEW: "Main Preview",
//   THEME_FEATURES: "Theme Features",
// };

// const ThemePreview = () => {
//   const params = useParams();
//   const router = useRouter();
//   const controls = useAnimation();

//   const { currentTheme, setCurrentTheme, project } = useSlideStore();
//   const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

//   useEffect(() => {
//     if (project?.slides) {
//       router.push(`/presentation/${params.presentationId}`);
//     }
//   }, [project?.slides, router, params.presentationId]);

//   useEffect(() => {
//     controls.start("visible");
//   }, [selectedTheme]);

//   const applyTheme = (theme: Theme) => {
//     setSelectedTheme(theme);
//     setCurrentTheme(theme);
//   };

//   const LeftCardContent = () => (
//     <div className="space-y-4">
//       <div
//         className="rounded-xl p-4 shadow-md"
//         style={{ backgroundColor: `${selectedTheme.accentColor}10` }}
//       >
//         <h3
//           className="text-lg font-semibold mb-2"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           {THEME_CARD_TITLES.QUICK_START}
//         </h3>
//         <ol
//           className="list-decimal list-inside space-y-3"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           <li>Choose a theme</li>
//           <li>Customize colors and fonts</li>
//           <li>Add your content</li>
//           <li>Preview and publish</li>
//         </ol>
//       </div>
//       <Button
//         className="w-full h-10 text-lg font-medium shadow-sm"
//         style={{
//           backgroundColor: selectedTheme.accentColor,
//           color: readableColor(selectedTheme.accentColor),
//         }}
//       >
//         Get Started
//       </Button>
//     </div>
//   );

//   const MainCardContent = () => (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div
//           className="rounded-xl p-4 shadow-md"
//           style={{ backgroundColor: `${selectedTheme.accentColor}10` }}
//         >
//           <p style={{ color: selectedTheme.accentColor }}>
//             This is a smart layout: it acts as a text box.
//           </p>
//         </div>
//         <div
//           className="rounded-xl p-4 shadow-sm"
//           style={{ backgroundColor: `${selectedTheme.accentColor}10` }}
//         >
//           <p style={{ color: selectedTheme.accentColor }}>
//             You can get these by typing / smart
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-wrap gap-4 shadow-sm">
//         <Button
//           className="h-12 px-6 text-lg font-medium"
//           style={{
//             backgroundColor: selectedTheme.accentColor,
//             color: readableColor(selectedTheme.accentColor),
//           }}
//         >
//           Primary button
//         </Button>
//         <Button
//           variant="outline"
//           className="h-12 px-6 text-lg font-medium"
//           style={{
//             borderColor: selectedTheme.accentColor,
//             color: selectedTheme.accentColor,
//           }}
//         >
//           Secondary button
//         </Button>
//       </div>
//     </div>
//   );

//   const RightCardContent = () => (
//     <div className="space-y-4">
//       <div
//         className="rounded-xl p-4"
//         style={{ backgroundColor: `${selectedTheme.accentColor}10` }}
//       >
//         <h3
//           className="text-xl font-semibold mb-4"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           {THEME_CARD_TITLES.THEME_FEATURES}
//         </h3>
//         <ul
//           className="list-disc list-inside space-y-2"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           <li>Responsive design</li>
//           <li>Dark and light modes</li>
//           <li>Custom color schemes</li>
//           <li>Accessibility optimized</li>
//         </ul>
//       </div>
//       <Button
//         variant="outline"
//         className="w-full h-12 text-lg font-medium"
//         style={{
//           borderColor: selectedTheme.accentColor,
//           color: selectedTheme.accentColor,
//         }}
//       >
//         Explore Features
//       </Button>
//     </div>
//   );

//   return (
//     <div
//       className="h-screen w-screen flex"
//       style={{
//         backgroundColor: selectedTheme.backgroundColor,
//         color: selectedTheme.accentColor,
//         fontFamily: selectedTheme.fontFamily,
//       }}
//     >
//       <div className="flex-grow overflow-y-auto">
//         <div className="p-12 flex flex-col items-center min-h-screen">
//           <Button
//             variant="outline"
//             className="mb-12 self-start"
//             size="lg"
//             style={{
//               backgroundColor: `${selectedTheme.accentColor}10`,
//               color: selectedTheme.accentColor,
//               borderColor: `${selectedTheme.accentColor}20`,
//             }}
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="mr-2 h-5 w-5" />
//             Back
//           </Button>
//           <div className="w-full flex justify-center items-center relative flex-grow">
//             <ThemeCard
//               title={THEME_CARD_TITLES.QUICK_START}
//               description="Get up and running in no time"
//               content={<LeftCardContent />}
//               variant="left"
//               theme={selectedTheme}
//               controls={controls}
//             />
//             <ThemeCard
//               title={THEME_CARD_TITLES.MAIN_PREVIEW}
//               description="This is the main theme preview card"
//               content={<MainCardContent />}
//               variant="main"
//               theme={selectedTheme}
//               controls={controls}
//             />
//             <ThemeCard
//               title={THEME_CARD_TITLES.THEME_FEATURES}
//               description="Discover what our themes can do"
//               content={<RightCardContent />}
//               variant="right"
//               theme={selectedTheme}
//               controls={controls}
//             />
//           </div>
//         </div>
//       </div>
//       <ThemePicker
//         selectedTheme={selectedTheme}
//         themes={themes}
//         onThemeSelect={applyTheme}
//       />
//     </div>
//   );
// };

// export default ThemePreview;
