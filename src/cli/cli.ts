import {program} from "commander"
import { initialize } from "./init.ts"
import process from "node:process";

program
  .name("hexaDrive")
  .version('0.1.8')
  .description('Firebase storage handler')
  initialize()
  program.parse(process.argv);