import path from "node:path";
import { Listr } from "listr2";
import { ProjectManager, ProjectType } from "@types";
import { getDirectoryName } from "@utils/fs";
import { NodeProjectManager } from "./project-manager/node";

export class ProjectBuilder {
  #type: ProjectType;
  #name: string;
  #projectRoot: string;
  #initializeGit?: boolean;

  constructor(type: ProjectType) {
    this.#type = type;
    this.#projectRoot = process.cwd();
    this.#name = getDirectoryName(this.#projectRoot);
  }

  useName(value: string): ProjectBuilder {
    if (value !== ".") {
      this.#name = value;
      this.#projectRoot = path.join(this.#projectRoot, value);
    }

    return this;
  }

  useGit(value: boolean): ProjectBuilder {
    this.#initializeGit = value;
    return this;
  }

  run() {
    const tasks = new Listr([], { concurrent: false });
    let project: ProjectManager;
    switch (this.#type) {
      case ProjectType.NodeBasic:
        project = new NodeProjectManager(this.#name, this.#projectRoot);
        tasks.add({ title: "Scaffolding files", task: () => project.cloneRepo("kylejreed/node-basic-template") });
        tasks.add({ title: "Initializing...", task: () => project.init() });
        tasks.add({ title: "Initializing git", task: () => project.setupGit() });
        tasks.add({ title: "Installing packages", task: () => project.packageManager.install() });
        break;
      case ProjectType.NodeAPI:
        project = new NodeProjectManager(this.#name, this.#projectRoot);
        tasks.add({ title: "Initializing...", task: () => project.init() });
        tasks.add({ title: "Scaffolding files", task: () => project.cloneRepo("kylejreed/node-api-template") });
        tasks.add({ title: "Initializing git", task: () => project.setupGit() });
        tasks.add({ title: "Installing packages", task: () => project.packageManager.install() });
        break;
    }

    return tasks.run().then(() => project);
  }
}
