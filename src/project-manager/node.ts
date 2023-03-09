import { PackageManager } from "@types";
import { BaseProjectManager } from "./base";
import { npm } from "../package-manager/npm";

export class NodeProjectManager extends BaseProjectManager {
  packageManager: PackageManager;

  constructor(name: string, root: string) {
    super(name, root);
    this.packageManager = npm(this.projectCmd);
  }

  async updateConfig(key: string, value: any) {
    const config = await this.packageManager.getConfig();
    if (config[key] && typeof value === "object") {
      config[key] = Object.assign({}, config[key], value);
    } else {
      config[key] = value;
    }

    this.packageManager.setConfig(config);
  }
}
