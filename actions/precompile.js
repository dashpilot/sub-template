/* converts the raw template to es module with template literals */

import sub from "./../lib/sub.js";
import * as fs from "fs";

(async () => {
  let precompiled = await sub.precompileFile("./src/index.sub");

  console.log(precompiled);

  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
    fs.mkdirSync("./public/template");
  }

  fs.writeFileSync("./public/template/index.mjs", precompiled, "utf8");
})();
