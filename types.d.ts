declare module "smart-env" {
  interface SchemaRule {
    required?: boolean;
    type?: "string" | "number" | "boolean";
  }

  interface Schema {
    [key: string]: SchemaRule;
  }

  class SmartEnv {
    load(envPath?: string): void;
    get(key: string, fallback?: any): string | null;
    must(key: string): string;
    validate(schema: Schema): void;
    all(): Record<string, string>;
  }

  const env: SmartEnv;
  export default env;
}
