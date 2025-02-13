import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { exec } = require("child_process");

// Run the serve command using Node.js
exec("serve -s dist -l 5173", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});