import { homedir } from "node:os";
import { initializeApp, type FirebaseOptions } from 'firebase/app';

export function configDir(): string {
  return `${homedir()}/.hexaDrive/`;
}

export function configPath(): string {
  return `${homedir()}/.hexaDrive/hexadrive.json`;
}

export function readConfigFile(): Record<string, unknown> {
  return JSON.parse(Deno.readTextFileSync(configPath()));
}

export function getFirebase(config : FirebaseOptions) {
  try {
    return initializeApp(config);
  } catch (error) {
    throw('Firebase config validation failed please check your config file and try again. Error: ' + error);
  }
}

export function getDrives(){
  try{
    return readConfigFile().drives;
  } catch (error) {
    throw('No drives found. Please run hexaDrive init --drive to create a new drive. Error:' + error);
  }
}