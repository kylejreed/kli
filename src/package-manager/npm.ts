import { PackageManager } from "@types";
import { ExecCommand } from "@utils/cmd";
import { getFileContents, writeFileContents } from "@utils/fs";

export const npm = (cmd: ExecCommand): PackageManager => {
  return {
    init: () => {
      cmd("npm init -y");
    },
    install: (...pkgs: string[]) => {
      cmd(`npm install ${pkgs.join(" ")}`);
    },
    devInstall: (...pkgs: string[]) => {
      cmd(`npm install -D ${pkgs.join(" ")}`);
    },
    cleanInstall: () => {
      cmd("npm ci");
    },
    getConfig: async () => {
      return JSON.parse(await getFileContents("./package.json"));
    },
    setConfig: async (value) => {
      await writeFileContents("./package.json", JSON.stringify(value, null, 2));
    },
  };
};
