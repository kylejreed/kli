import { execSync } from "node:child_process";

export type ExecCommand = (command: string, cwd?: string) => Buffer;

export const cmd: ExecCommand = (command: string, cwd?: string) => {
  return execSync(command, { cwd });
};

export const getCmd = (dir: string): ExecCommand => {
  return (command: string) => cmd(command, dir);
};
