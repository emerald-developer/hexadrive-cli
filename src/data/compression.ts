import * as fflate from "fflate";
import { Buffer } from "node:buffer";
export function compress(data: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const compressedData = fflate.deflateSync(data);
      const buffer = Buffer.from(compressedData); // Convert Uint8Array to Buffer
      resolve(buffer);
    } catch (error) {
      reject(error);
    }
  });
}

export function decompress(compressedData: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const decompressedData = fflate.inflateSync(compressedData);
      const buffer = Buffer.from(decompressedData); // Convert Uint8Array to Buffer
      resolve(buffer);
    } catch (error) {
      reject(error);
    }
  });
}
