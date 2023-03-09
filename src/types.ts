export enum ProjectType {
  NodeBasic,
  NodeAPI,
}

export interface PackageManager {
  init(): void;
  install(...packages: string[]): void;
  devInstall(...packages: string[]): void;
  cleanInstall(): void;
}

export interface ProjectManager {
  packageManager: PackageManager;
  cloneRepo(name: string): void;
  setupGit(): void;
  applyTemplate(template: string): void;
  open(): void;
}
