import StrokeEarth from "@/icons/StrokeEarth";
import { CircleOff } from "lucide-react";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex flex-col min-h-[70vh] w-full justify-center items-center gap-12">
      <CircleOff className="w-12 h-12 text-secondary" />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-semibold text-primary">
          Nothing to see here
        </p>
        <p className="text-base font-normal text-secondary">
          So here is a randon image genearted by{" "}
          <span className="text-vivid">Creative AI</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
