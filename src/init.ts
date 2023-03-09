import { ProjectBuilder } from "./project-builder";
import { getProjectType } from "./prompts";

export const init = async (name: string) => {
  const projectType = await getProjectType();

  const project = await new ProjectBuilder(projectType).useName(name).run();
  project.open();
};
