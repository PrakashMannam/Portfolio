// In-browser SIMULATION of MiniRedis commands (PING, SET, GET, DEL, EXISTS, KEYS).
// Mirrors the Java server implementation (MiniRedisServer.java) running on port 6379.
// To connect to a live backend, replace `execute` with an HTTP/WebSocket adapter.

export type SimResult = { output: string; ok: boolean };

export function createMiniRedisSim() {
  const store = new Map<string, string>();
  const expiryMap = new Map<string, number>();

  function pruneExpired() {
    const now = Date.now();
    for (const [k, exp] of expiryMap.entries()) {
      if (now > exp) {
        store.delete(k);
        expiryMap.delete(k);
      }
    }
  }

  function isExpired(key: string): boolean {
    const exp = expiryMap.get(key);
    if (exp !== undefined && Date.now() > exp) {
      store.delete(key);
      expiryMap.delete(key);
      return true;
    }
    return false;
  }

  function execute(line: string): SimResult {
    const parts = line.trim().split(/\s+/).filter(Boolean);
    const cmd = parts[0]?.toUpperCase();
    if (!cmd) return { output: "", ok: true };

    switch (cmd) {
      case "PING":
        return { output: parts.length > 1 ? parts.slice(1).join(" ") : "+PONG", ok: true };

      case "SET": {
        if (parts.length < 3) {
          return { output: "-ERR wrong number of arguments for 'set'", ok: false };
        }
        const key = parts[1]!;

        // Check for optional TTL: SET key value EX seconds
        if (parts.length >= 5 && parts[parts.length - 2]?.toUpperCase() === "EX") {
          const sec = Number(parts[parts.length - 1]);
          if (isNaN(sec) || sec <= 0) {
            return { output: "-ERR value is not an integer or out of range", ok: false };
          }
          const val = parts.slice(2, parts.length - 2).join(" ");
          store.set(key, val);
          expiryMap.set(key, Date.now() + sec * 1000);
          return { output: "+OK", ok: true };
        }

        const val = parts.slice(2).join(" ");
        store.set(key, val);
        expiryMap.delete(key);
        return { output: "+OK", ok: true };
      }

      case "GET": {
        if (parts.length !== 2) {
          return { output: "-ERR wrong number of arguments for 'get'", ok: false };
        }
        const key = parts[1]!;
        if (isExpired(key)) {
          return { output: "(nil)", ok: true };
        }
        const val = store.get(key);
        return { output: val !== undefined ? val : "(nil)", ok: true };
      }

      case "DEL": {
        if (parts.length < 2) {
          return { output: "-ERR wrong number of arguments for 'del'", ok: false };
        }
        let deleted = 0;
        for (let i = 1; i < parts.length; i++) {
          const k = parts[i]!;
          if (!isExpired(k) && store.delete(k)) {
            deleted++;
          }
          expiryMap.delete(k);
        }
        return { output: `:${deleted}`, ok: true };
      }

      case "EXISTS": {
        if (parts.length < 2) {
          return { output: "-ERR wrong number of arguments for 'exists'", ok: false };
        }
        let existing = 0;
        for (let i = 1; i < parts.length; i++) {
          const k = parts[i]!;
          if (!isExpired(k) && store.has(k)) {
            existing++;
          }
        }
        return { output: `:${existing}`, ok: true };
      }

      case "KEYS": {
        pruneExpired();
        if (store.size === 0) {
          return { output: "(empty list or set)", ok: true };
        }
        const formatted = [...store.keys()].map((k, i) => `${i + 1}) "${k}"`).join("\n");
        return { output: formatted, ok: true };
      }

      default:
        return {
          output: `-ERR unknown command '${parts[0]}' (try PING, SET, GET, DEL, EXISTS, KEYS)`,
          ok: false,
        };
    }
  }

  return { execute };
}
