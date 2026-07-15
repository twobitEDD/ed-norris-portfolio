#!/usr/bin/env node
/**
 * Executes career validation in the personal app workspace.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, "..");
const repoRoot = path.resolve(appRoot, "../..");
const tsxCli = path.join(repoRoot, "node_modules", "tsx", "dist", "cli.mjs");

const result = spawnSync(
  process.execPath,
  [tsxCli, "src/data/career/run-validate.ts"],
  { stdio: "inherit", cwd: appRoot },
);

process.exit(result.status ?? 1);
