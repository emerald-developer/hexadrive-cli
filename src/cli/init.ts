import { program } from "commander";
import chalk from "chalk";
import { configPath } from "../handler/config.ts";
import { exists } from "@std/fs"
 
export function initialize() {
  program
    .command("init")
    .description("Initialize HexaDrive by creating the config file or use -d to add a new drive.")
    .summary("Initialize HexaDrive config file or a new drive.")
    .option("-d, --drive <drive>", "Initialize a new drive. You can add multiple drives by running this command multiple times.")
    .action((options) => {
      const { drive } = options;
      const configFilePath = configPath();
      try {
        if (!exists(configFilePath)){
          console.log(chalk.bold.hex('f5c2e7')('Creating config file...'));
          Deno.writeFileSync(configFilePath, new TextEncoder().encode("{}\n"));
          console.log(chalk.bold.hex('a6e3a1')(`Config file created successfully at ${configFilePath}`));
        }
        
        if (drive) {
          const config = JSON.parse(Deno.readTextFileSync(configFilePath));
          config.drives = config.drives || [];
          const drivePath = configPath() + '/drives/' + drive;
          console.log(chalk.bold.hex('f5c2e7')('Creating config file...'));
          Deno.writeFileSync(drivePath, new TextEncoder().encode("{}\n"))
          config.drives.push({name : drive, path : drivePath });
          Deno.writeFileSync(configFilePath, new TextEncoder().encode(JSON.stringify(config, null, 2) + "\n"));
          console.log(chalk.bold.hex('a6e3a1')(`Drive ${drive} added successfully to config file at ${configFilePath}`));
        }

      } catch (error) {
        console.error(chalk.bold.red('Error creating config file:', error));
      }
    });
}
