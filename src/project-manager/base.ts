import path from "node:path";
import { PackageManager, ProjectManager } from "@types";
import { ExecCommand, cmd, getCmd } from "@utils/cmd";
import { copyContents } from "@utils/fs";

export abstract class BaseProjectManager implements ProjectManager {
  abstract packageManager: PackageManager;
  abstract updateConfig(key: string, value: any): Promise<void>;

  protected projectCmd: ExecCommand;
  protected name: string;
  protected root: string;

  constructor(name: string, root: string) {
    this.name = name;
    this.root = root;
    this.projectCmd = getCmd(root);
  }

  applyTemplate(template: string) {
    console.log(__dirname, __filename);
    const templateDirRoot = path.join(__dirname, "..", "templates");
    return copyContents(path.join(templateDirRoot, template), this.root);
  }

  cloneRepo(repoName: string) {
    cmd(`git clone https://github.com/${repoName}.git ${this.name}`);
    this.projectCmd("rm -rf .git");
  }

  setupGit(): void {
    this.projectCmd("git init");
  }

  run(command: string) {
    this.projectCmd(command);
  }

  open() {
    this.projectCmd("code .");
  }
}
