//check env
let env =  "development";
// fetch env config
let config = require("../processess.json");

let envConfig = config["development"];

if (env == "production") {
  envConfig = config["production"];
}
//add env.config values to process.env
Object.keys(envConfig).forEach((key) => (process.env[key] = envConfig[key]));
