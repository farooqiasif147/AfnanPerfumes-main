import { build } from "vite";

async function buildStatic() {
  console.log("Building static site...");
  await build();
  console.log("Build complete! Output: dist/public");
}

buildStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});
