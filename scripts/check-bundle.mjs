#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const DIST = join(process.cwd(), "dist", "assets");
const MAIN_BUDGET_KB = 140; // gzip kB — fails the build above this
const CHUNK_BUDGET_KB = 80;

const mainChunkPattern = /^index-.*\.js$/;

let failures = 0;

try {
  const files = readdirSync(DIST).filter((f) => f.endsWith(".js"));

  for (const f of files) {
    const full = join(DIST, f);
    const raw = readFileSync(full);
    const gz = gzipSync(raw);
    const gzKB = gz.length / 1024;
    const rawKB = statSync(full).size / 1024;
    const budget = mainChunkPattern.test(f) ? MAIN_BUDGET_KB : CHUNK_BUDGET_KB;
    const over = gzKB > budget;
    if (over) failures++;
    const flag = over ? "FAIL" : "ok  ";
    console.log(
      `${flag}  ${f.padEnd(42)}  raw ${rawKB.toFixed(1).padStart(6)} kB  gz ${gzKB.toFixed(1).padStart(6)} kB  (budget ${budget} kB)`
    );
  }

  if (failures > 0) {
    console.error(`\n${failures} chunk(s) over budget`);
    process.exit(1);
  }
  console.log("\nall chunks within budget");
} catch (err) {
  console.error("bundle check failed:", err.message);
  process.exit(1);
}
