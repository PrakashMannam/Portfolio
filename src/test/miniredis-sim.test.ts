import { describe, expect, it } from "vitest";
import { createMiniRedisSim } from "@/lib/miniredis-sim";

describe("MiniRedis simulation", () => {
  it("responds to PING with +PONG", () => {
    const sim = createMiniRedisSim();
    const res = sim.execute("PING");
    expect(res.ok).toBe(true);
    expect(res.output).toBe("+PONG");
  });

  it("echoes custom PING argument", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("PING hello").output).toBe("hello");
    expect(sim.execute("PING hello world").output).toBe("hello world");
  });

  it("handles SET and GET", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("SET name prakash").ok).toBe(true);
    expect(sim.execute("SET name prakash").output).toBe("+OK");
    const get = sim.execute("GET name");
    expect(get.ok).toBe(true);
    expect(get.output).toBe("prakash");
  });

  it("handles multi-word values in SET", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("SET bio Systems and Backend Engineer").output).toBe("+OK");
    expect(sim.execute("GET bio").output).toBe("Systems and Backend Engineer");
  });

  it("handles SET with EX (TTL expiry)", async () => {
    const sim = createMiniRedisSim();
    // Expiry in 1 second
    expect(sim.execute("SET temp session123 EX 1").output).toBe("+OK");
    expect(sim.execute("GET temp").output).toBe("session123");
    expect(sim.execute("EXISTS temp").output).toBe(":1");

    // Wait 1.1s for expiration
    await new Promise((r) => setTimeout(r, 1100));

    expect(sim.execute("GET temp").output).toBe("(nil)");
    expect(sim.execute("EXISTS temp").output).toBe(":0");
  });

  it("rejects invalid TTL values in SET EX", () => {
    const sim = createMiniRedisSim();
    const res = sim.execute("SET key val EX invalid");
    expect(res.ok).toBe(false);
    expect(res.output).toContain("-ERR value is not an integer or out of range");
  });

  it("returns (nil) for missing key", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("GET missing").output).toBe("(nil)");
  });

  it("handles DEL command (single and multi-key)", () => {
    const sim = createMiniRedisSim();
    sim.execute("SET k1 v1");
    sim.execute("SET k2 v2");
    expect(sim.execute("DEL k1").output).toBe(":1");
    expect(sim.execute("GET k1").output).toBe("(nil)");
    expect(sim.execute("DEL k1").output).toBe(":0");

    // Multi-key DEL
    sim.execute("SET k3 v3");
    expect(sim.execute("DEL k2 k3 nonexistent").output).toBe(":2");
  });

  it("handles EXISTS command (single and multi-key)", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("EXISTS k1").output).toBe(":0");
    sim.execute("SET k1 v1");
    sim.execute("SET k2 v2");
    expect(sim.execute("EXISTS k1").output).toBe(":1");
    expect(sim.execute("EXISTS k1 k2 k3").output).toBe(":2");
  });

  it("handles KEYS command", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("KEYS *").output).toBe("(empty list or set)");
    sim.execute("SET a 1");
    sim.execute("SET b 2");
    const keys = sim.execute("KEYS *");
    expect(keys.ok).toBe(true);
    expect(keys.output).toContain('"a"');
    expect(keys.output).toContain('"b"');
  });

  it("returns error for unknown commands", () => {
    const sim = createMiniRedisSim();
    const res = sim.execute("FLUSHALL");
    expect(res.ok).toBe(false);
    expect(res.output).toContain("-ERR unknown command");
  });

  it("returns error for wrong argument count", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("SET").ok).toBe(false);
    expect(sim.execute("SET key").ok).toBe(false);
    expect(sim.execute("GET").ok).toBe(false);
    expect(sim.execute("GET k1 k2").ok).toBe(false);
    expect(sim.execute("DEL").ok).toBe(false);
    expect(sim.execute("EXISTS").ok).toBe(false);
  });

  it("is case-insensitive for command names", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("ping").ok).toBe(true);
    expect(sim.execute("set k v").ok).toBe(true);
    expect(sim.execute("get k").output).toBe("v");
    expect(sim.execute("exists k").output).toBe(":1");
    expect(sim.execute("del k").output).toBe(":1");
  });

  it("handles empty or whitespace input gracefully", () => {
    const sim = createMiniRedisSim();
    expect(sim.execute("").output).toBe("");
    expect(sim.execute("   ").output).toBe("");
  });
});
