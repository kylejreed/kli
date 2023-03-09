import { SupportedAdditions } from "@types";
import { chooseAdditionPackage } from "./prompts";
import { cmd } from "@utils/cmd";
import { npm } from "./package-manager/npm";
import { NodeProjectManager } from "./project-manager/node";

export const add = async (addition?: SupportedAdditions) => {
  addition ??= await chooseAdditionPackage();

  switch (addition) {
    case "prisma":
      addPrisma();
      break;
    case "ws":
      addSocketIO();
      break;
  }
};

function addPrisma() {
  const node = new NodeProjectManager("", process.cwd());
  node.packageManager.devInstall("prisma");
  cmd("npx prisma init");
  node.packageManager.install("@prisma/client");
  node.updateConfig("scripts", {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
  });
}

function addSocketIO() {
  const pm = npm(cmd);
  pm.install("socket-io");
}
