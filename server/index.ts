import { spawn } from "child_process";

const vite = spawn("npx", ["vite", "--port", "5000", "--host"], {
  stdio: "inherit",
  shell: true,
});

vite.on("close", (code) => {
  process.exit(code ?? 0);
});
