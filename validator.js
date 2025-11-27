export const validateEnv = (schema, env) => {
  Object.keys(schema).forEach((key) => {
    const rule = schema[key];
    const value = env[key];

    if (rule.required && !value) {
      throw new Error(`[smart-env] Missing required env: ${key}`);
    }

    if (rule.type === "number" && isNaN(Number(value))) {
      throw new Error(`[smart-env] ENV ${key} must be a number`);
    }

    if (rule.type === "boolean" && !["true", "false"].includes(value)) {
      throw new Error(`[smart-env] ENV ${key} must be true/false`);
    }
  });

  return true;
};
