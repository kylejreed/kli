import { ProjectBuilder } from "./project-builder";
import { getProjectType } from "./prompts";

const main = async () => {
  const name = process.argv[2];
  const projectType = await getProjectType();

  const project = await new ProjectBuilder(projectType).useName(name).useGit(false).run();
  project.open();
};

main().catch(console.error);

// kli . ----- should init project in current dir, using name of dir
// kli my-new-project ----- should init project in new subdir, using name entered
