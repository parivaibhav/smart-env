import SmartEnv from "./smartEnv.js";
import { validateEnv } from "./validator.js";

// default export = instance
const env = new SmartEnv();

// named exports
export { SmartEnv, validateEnv, env };

// default export instance (like dotenv.config())
export default env;
