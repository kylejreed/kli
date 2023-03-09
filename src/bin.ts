#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./init";

const { version } = require("../package.json");

const program = new Command();
program.version(version);
program.command("init").argument("<project-name>").action(init);
program.parse(process.argv);
