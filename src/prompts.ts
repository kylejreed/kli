import { ProjectType, SupportedAdditions, supportedAdditions } from "@types";
import inq from "inquirer";

export const getProjectType = async () => {
  const { type } = await inq.prompt({
    name: "type",
    type: "list",
    message: "Choose project type: ",
    choices: [
      { name: "Bare app (Node)", value: ProjectType.NodeBasic },
      { name: "Rest API (Node)", value: ProjectType.NodeAPI },
    ],
  });

  return type as ProjectType;
};

export const chooseAdditionPackage = async (): Promise<SupportedAdditions> => {
  const { choice } = await inq.prompt({
    name: "choice",
    type: "list",
    message: "Choose package: ",
    choices: supportedAdditions,
  });

  return choice;
};
