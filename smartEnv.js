import fs from "fs";
import path from "path";
import { validateEnv } from "./validator.js";

class SmartEnv {
  constructor() {
    this.cache = {};
  }

  load(envPath = ".env") {
    try {
      const filePath = path.resolve(process.cwd(), envPath);

      if (!fs.existsSync(filePath)) return;

      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");

      lines.forEach((line) => {
        if (!line.includes("=")) return;
        const [key, ...rest] = line.split("=");
        const value = rest.join("=").trim();

        process.env[key.trim()] = value;
        this.cache[key.trim()] = value;
      });
    } catch (err) {
      console.error("[smart-env] Failed to load:", err);
    }
  }

  get(key, fallback = null) {
    return process.env[key] || fallback;
  }

  must(key) {
    const value = process.env[key];
    if (!value) {
      throw new Error(`[smart-env] Missing required ENV: ${key}`);
    }
    return value;
  }

  validate(schema = {}) {
    validateEnv(schema, process.env);
  }

  all() {
    return { ...process.env };
  }
}

export default SmartEnv;
