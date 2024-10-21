import { homedir } from "node:os";
import * as toml from "@std/toml";
export function configPath() : string {
  return `${homedir()}/.hexaDrive.toml`;
}
export function readConfigFile() : Record<string,unknown>{
  return toml.parse(Deno.readTextFileSync(configPath()));
}