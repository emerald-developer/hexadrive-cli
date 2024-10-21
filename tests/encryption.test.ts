import { describe, expect, it } from "vitest";
import { decrypt, encrypt } from "../src/data/index.ts";
import { randomBytes } from "crypto";

describe("encryption", () => {
  it("should encrypt properly", () => {
    const message = "Hello, World!";
    const key = randomBytes(32).toString("hex");

    const encryptedMessage = encrypt(message, key);

    expect(encryptedMessage).not.toBe(message);
  });

  it("should decrypt properly", () => {
    const message = "Hello, World!";
    const key = randomBytes(32).toString("hex");

    const encryptedMessage = encrypt(message, key);
    const decryptedMessage = decrypt(encryptedMessage, key);

    expect(decryptedMessage).toBe(message);
  });

  it("should accept keys of any size", () => {
    const message = "Hello, World!";
    const key = randomBytes(Math.pow(2, 10)).toString("hex");

    const encryptedMessage = encrypt(message, key);
    const decryptedMessage = decrypt(encryptedMessage, key);

    expect(decryptedMessage).toBe(message);
  });
});
