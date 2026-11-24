import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

// The gate accepts 1-60 characters, never only whitespace (RULES.txt).
const entryPath = new URL("./entry.txt", import.meta.url);
const entryText = readFileSync(entryPath, "utf8");
const entryLength = [...entryText].length;
if (entryLength < 1 || entryLength > 60 || entryText.trim().length === 0) {
  console.error(`entry.txt must be 1-60 characters, got ${entryLength}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(entryPath, `${outDir}/entry.txt`);
} catch (err) {
  console.error("failed to write entry.txt:", err);
  process.exit(1);
}
