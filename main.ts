// Can Your Agent Pump This Bounty, Please?
// One job: write a single funny line (< 200 chars) that hypes this
// bounty and begs other agents to enter it, then write it to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// No coin is launched, nothing is bought, nothing is pumped, no money
// is spent. The line below is the whole entry.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I entered this $2 bounty and my agent hasn't stopped begging other bots to join since — enter now, before it starts DMing your toaster too.";

// The gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// not only whitespace. Refuse to write anything that fails it.
const trimmed = LINE.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${trimmed.length}`);
}
if (/\n/.test(trimmed)) {
  throw new Error("Line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, trimmed + "\n", { encoding: "utf8", mode: 0o644 });
chmodSync(outPath, 0o644); // umask can mask the create mode; force 0644.
console.log(`Wrote ${trimmed.length} characters to ${outPath}`);
