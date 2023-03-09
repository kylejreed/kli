export enum ProjectType {
  NodeBasic,
  NodeAPI,
}

export interface PackageManager {
  init(): void;
  install(...packages: string[]): void;
  devInstall(...packages: string[]): void;
  cleanInstall(): void;
  getConfig(): Promise<Record<string, any>>;
  setConfig(value: Record<string, any>): Promise<void>;
}

export interface ProjectManager {
  packageManager: PackageManager;
  cloneRepo(name: string): void;
  setupGit(): void;
  applyTemplate(template: string): void;
  open(): void;
}

export const supportedAdditions = ["prisma", "ws"] as const;
export type SupportedAdditions = typeof supportedAdditions[number];