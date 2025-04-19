"use client";
import { deleteAllProjects } from "@/actions/projects";
import ALertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Flag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  projects: Project[];
};

const DeleteAllButton = ({ projects }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteAllProjects = async () => {
    setLoading(true);

    if (!projects || projects.length === 0) {
      setLoading(false);
      toast.error("Error", {
        description: "No Project found",
      });
      setOpen(false);
      return;
    }

    try {
      const res = await deleteAllProjects(
        projects.map((project) => project.id)
      );

      if (res.status !== 200) {
        throw new Error("Failed to delete all projects");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("error", {
        description: "Failed to delete all projects",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <ALertDialogBox
      description="This action cannot be undone. This will permanently delete all your projects and remove your data from our servers."
      className="bg-red-600 text-white dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size="lg"
        className="bg-background-80 rounded-lg dark:hover:bg-background-90 text-primary font-semibold hover:text-white"
      >
        <Trash2 />
        Delete all
      </Button>
    </ALertDialogBox>
  );
};

export default DeleteAllButton;
