import path from "node:path";
import fs from "node:fs/promises";

export const getDirectoryName = (dirPath: string) => {
  return path.basename(path.resolve(dirPath));
};

export const ensurePathExists = (dirPath: string) => {
  return fs.mkdir(dirPath, { recursive: true });
};

export const copyContents = (fromPath: string, toPath: string) => {
  return fs.cp(fromPath, toPath, { recursive: true });
};

export const getFileContents = async (filePath: string) => {
  return await fs.readFile(filePath, "utf8");
};

export const writeFileContents = async (filePath: string, contents: string) => {
  return await fs.writeFile(filePath, contents);
};