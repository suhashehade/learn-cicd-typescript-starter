import { describe, it, expect } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  it("should return API key when header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("my-secret-key");
  });

  it("should return null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return null if format is incorrect", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-secret-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  it("should return null if no key after ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });
});
