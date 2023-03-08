import { PackageManager } from "@types";
import { ExecCommand } from "@utils/cmd";

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
  };
};
