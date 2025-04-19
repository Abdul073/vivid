"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { Project } from "@prisma/client";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

export const getAllProjects = async () => {
  try {
    const CheckUser = await onAuthenticateUser();

    if (CheckUser.status !== 200 || !CheckUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: CheckUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No Projects Found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log("🔴ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getrecentProjects = async () => {
  try {
    const CheckUser = await onAuthenticateUser();

    if (CheckUser.status !== 200 || !CheckUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const Projects = await client.project.findMany({
      where: {
        userId: CheckUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (Projects.length === 0) {
      return { status: 404, error: "No recent projects found" };
    }

    return { status: 200, data: Projects };
  } catch (error) {
    console.error("🔴ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

//   recover the project
export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!updatedProject) {
      return { status: 500, error: "Failed to recover project" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

//   delete the project
export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!updatedProject) {
      return { status: 500, error: "Failed to delete project" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and outlines are required" };
    }
    const allOutlines = outlines.map((outline) => outline.title);
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const project = await client.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: checkUser.user.id,
      },
    });

    if (!project) {
      return { status: 500, error: "Failed to create project" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.error("🔴ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticate" };
    }

    const project = await client.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    return { status: 200, data: project };
  } catch (error) {
    console.error("🔴ERROR", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    if (!projectId || !slides) {
      return { status: 400, error: "Project ID and slides are requrired." };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides,
      },
    });

    if (!updatedProject) {
      return { status: 500, error: "Failed tp update slides" };
    }
    return { status: 200, data: updateSlides };
  } catch (error) {
    console.error("🔴Error", error);
    return { status: 500, error: "Inernal server error" };
  }
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if (!projectId || !theme) {
      return { status: 400, error: "Project ID and slides are required." };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      },
    });
    if (!updatedProject) {
      return { status: 500, error: "Failed to update slides" };
    }
    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error("🔴Error", error);
    return { status: 500, error: "Inernal server error" };
  }
};

export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return { status: 400, error: "No project IDs provided" };
    }

    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated." };
    }

    const userId = checkUser.user.id;
    const projectToDelete = await client.project.findMany({
      where: {
        id: {
          in: projectIds,
        },
        userId: userId,
      },
    });

    if (projectToDelete.length === 0) {
      return { status: 404, error: "No projects found for the given Ids" };
    }

    const deletedProjects = await client.project.deleteMany({
      where: {
        id: {
          in: projectToDelete.map((project) => project.id),
        },
      },
    });

    return {
      status: 200,
      message: `${deletedProjects.count} projects successfully deleted`,
    };
  } catch (error) {
    console.error("🔴Error", error);
    return { status: 500, error: "Inernal server error" };
  }
};

export const getDeletedProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 400, message: "No deleted projects found", data: [] };
    }

    return {
      status: 200,
      data: projects,
      message:
        projects.length === 0
          ? "No deleted projects found"
          : "Deleted projects loaded successfully",
    };
  } catch (error) {
    console.error("🔴Error", error);
    return { status: 500, error: "Inernal server error" };
  }
};
