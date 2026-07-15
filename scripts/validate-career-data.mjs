#!/usr/bin/env node
/**
 * Career data validation — run via `npm run validate`.
 * Uses tsx to execute TypeScript validators in apps/personal.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runner = path.join(root, "apps/personal/scripts/run-career-validate.mjs");

const result = spawnSync("node", [runner], { stdio: "inherit", cwd: root });
process.exit(result.status ?? 1);
