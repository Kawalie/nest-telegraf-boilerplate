import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG_FILENAME = "src/configuration/config.yaml";
export default () => {
  return yaml.load(readFileSync(join(YAML_CONFIG_FILENAME), "utf-8")) as Record<
    string,
    any
  >;
};
