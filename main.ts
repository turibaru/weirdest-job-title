import { copyFileSync, mkdirSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(new URL("./entry.txt", import.meta.url), `${outDir}/entry.txt`);
} catch (err) {
  console.error("failed to write entry.txt:", err);
  process.exit(1);
}
