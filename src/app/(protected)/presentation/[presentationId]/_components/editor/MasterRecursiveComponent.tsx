"use client";
import { Heading1 } from "@/components/global/editor/components/Headings";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { on } from "events";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import DropZone from "./DropZone";
import { Heading2 } from "lucide-react";

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

const ContentRendered: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index }) => {
    switch (content.type) {
      case "heading1":
        return <motion.div className="w-full h-full"></motion.div>;
    }
  }
);
