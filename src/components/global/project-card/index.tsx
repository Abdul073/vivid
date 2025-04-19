"use client";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import ALertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/projects";

type Props = {
  ProjectId: string;
  title: string;
  createdAt: string;
  Isdelete?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  ProjectId,
  title,
  createdAt,
  Isdelete,
  themeName,
  slideData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setSlides } = useSlideStore();
  const router = useRouter();
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${ProjectId}`);
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  //   recover the project
  const handleRecover = async () => {
    setLoading(true);
    if (!ProjectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
        icon: "🚨",
      });
      return;
    }
    try {
      const res = await recoverProject(ProjectId);
      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Something went wrong",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("SUccess", {
        description: "Project recovered successfully",
        icon: "✅",
      });
    } catch (error) {
      toast.error("Oops!", {
        description: "Something went wrong, please try again later",
      });
    }
  };

  //   delete the project
  const handleDelete = async () => {
    setLoading(true);
    if (!ProjectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
        icon: "🚨",
      });
      return;
    }
    try {
      const res = await deleteProject(ProjectId);
      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Failed to delete project",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("SUccess", {
        description: "Project deleted successfully",
        icon: "✅",
      });
    } catch (error) {
      toast.error("Oops!", {
        description: "Something went wrong, please try again later",
      });
    }
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !Isdelete && "hover:bg-muted/50"
      }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <ThumbnailPreview
          theme={theme}
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title} title
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {Isdelete ? (
              <ALertDialogBox
                description="This will recover your project and restore your data."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </ALertDialogBox>
            ) : (
              <ALertDialogBox
                description="This will delete your project and send to your trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                onClick={handleDelete}
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </ALertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
