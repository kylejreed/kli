import { PackageManager, ProjectManager } from "@types";
import { ExecCommand, cmd, getCmd } from "@utils/cmd";
import { ensurePathExists } from "@utils/fs";
import { BaseProjectManager } from "./base";
import { npm } from "../package-manager/npm";

export class NodeProjectManager extends BaseProjectManager {
  packageManager: PackageManager;

  constructor(name: string, root: string) {
    super(name, root);
    this.packageManager = npm(this.projectCmd);
  }
}
