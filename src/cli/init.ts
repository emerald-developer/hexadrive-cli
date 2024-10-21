import { program } from "commander";
import chalk from "chalk";
import { homedir } from "node:os";

export function initialize() {
  program
    .command("init")
    .description("Initialize HexaDrive by creating the config file")
    .action(() => {
      const configFilePath = `${homedir}/.hexaDrive.toml`;
      console.log(chalk.bold.hex('f5c2e7')('Creating config file...'));
      try {
        Deno.writeFileSync(configFilePath, new TextEncoder().encode("# HexaDrive Configuration\n"));
        console.log(chalk.bold.hex('a6e3a1')(`Config file created successfully at ${configFilePath}`));
      } catch (error) {
        console.error(chalk.bold.red('Error creating config file:', error));
      }
    });
}
