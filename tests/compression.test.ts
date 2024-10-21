import { compress, decompress } from "../src/data/index.ts";
import { describe, expect, it } from "vitest";
import { Buffer } from "node:buffer";

describe("Compression", () => {
  it("should compress and decompress data successfully", async () => {
    const originalData = Buffer.from("Hello, World!");

    const compressedData = await compress(originalData);

    expect(compressedData).not.toBe(originalData);

    const decompressedData = await decompress(compressedData);

    expect(decompressedData.toString()).toBe(originalData.toString());
    expect(compressedData.length).toBeLessThanOrEqual(compressedData.length);
    // Test with larger data
    const largeData = Buffer.from("".padEnd(10000, "a"));
    const compressedLargeData = await compress(largeData);
    const decompressedLargeData = await decompress(compressedLargeData);

    expect(Buffer.isBuffer(decompressedLargeData)).toBe(true);
    expect(decompressedLargeData.length).toBeGreaterThan(0);
    expect(decompressedLargeData.length).toBeGreaterThanOrEqual(
      compressedLargeData.length,
    );
  });

  it("should handle empty input", async () => {
    const emptyBuffer = Buffer.alloc(0);
    const compressedEmpty = await compress(emptyBuffer);
    const decompressedEmpty = await decompress(compressedEmpty);

    expect(Buffer.isBuffer(decompressedEmpty)).toBe(true);
    expect(decompressedEmpty.length).toBe(0);
  });

  it("should compress and decompress small inputs correctly", async () => {
    const originalData = Buffer.from([255]);
    const compressedData = await compress(originalData);

    expect(compressedData).not.toBe(originalData);

    const decompressedData = await decompress(compressedData);
    expect(decompressedData.toString()).toBe(originalData.toString());

    const multiByteData = Buffer.from([255, 255]);
    const compressedMultiByte = await compress(multiByteData);
    const decompressedMultiByte = await decompress(compressedMultiByte);

    expect(Buffer.isBuffer(decompressedMultiByte)).toBe(true);
    expect(decompressedMultiByte.length).toBeGreaterThan(0);
  });
});
