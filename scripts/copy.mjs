// @ts-check
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    source: { type: "string" },
    outDir: { type: "string" },
  },
  tokens: true,
});
const { source = "", outDir = "" } = values;

if (!source) {
  console.error("No source file specified");
  process.exit(1);
}

if (!outDir) {
  console.error("No output directory specified");
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`Created directory: ${outDir}`);
}

const targetPath = path.join(outDir, path.basename(source));
fs.copyFileSync(source, targetPath);
console.log(`Copied: ${source} -> ${targetPath}`);
