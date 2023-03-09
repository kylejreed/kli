#!/usr/bin/env node

import { Argument, Command } from "commander";
import { supportedAdditions } from "@types";
import { init } from "./init";
import { add } from "./add";

const { version } = require("../package.json");

const program = new Command();
program.version(version);
program.command("init").argument("<project-name>").action(init);
program.command("add").addArgument(new Argument("[package]").choices(supportedAdditions)).action(add);
program.parse(process.argv);
