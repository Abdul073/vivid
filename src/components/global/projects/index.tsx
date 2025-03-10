"use client";
import { containerVariants } from "@/lib/constants";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import ProjectCard from "../project-card";

type Props = {
  Projects: Project[];
};

const Projects = ({ Projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Projects.map((project, id) => (
        <ProjectCard
          key={id}
          ProjectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          Isdelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project.themeName}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
