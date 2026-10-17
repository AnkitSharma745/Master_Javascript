const aborted = signal => signal?.reason ?? new DOMException("Aborted", "AbortError");

export async function mapLimit(items, limit, fn, { signal } = {}) {
  if (!Array.isArray(items) || !Number.isInteger(limit) || limit < 1 || typeof fn !== "function") {
    throw new TypeError("Expected array, positive integer limit, and function");
  }
  if (signal?.aborted) throw aborted(signal);
  let next = 0, failed = false, failure;
  const results = new Array(items.length);
  const fail = error => { if (!failed) { failed = true; failure = error; } };
  const worker = async () => {
    while (!failed && next < items.length) {
      if (signal?.aborted) { fail(aborted(signal)); return; }
      const index = next++;
      try { results[index] = await fn(items[index], index, signal); }
      catch (error) { fail(error); }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  if (signal?.aborted) throw aborted(signal);
  if (failed) throw failure;
  return results;
}

export function createCachedLoader(load, {
  ttlMs = 1000, maxEntries = 100, maxInFlight = 100, now = () => performance.now()
} = {}) {
  if (typeof load !== "function" || !Number.isFinite(ttlMs) || ttlMs < 0 ||
      !Number.isInteger(maxEntries) || maxEntries < 1 ||
      !Number.isInteger(maxInFlight) || maxInFlight < 1 || typeof now !== "function") {
    throw new TypeError("Invalid cache configuration");
  }
  const values = new Map(), inFlight = new Map();
  let active = 0;
  function read(key) {
    if (values.has(key)) {
      const entry = values.get(key);
      if (entry.expires > now()) {
        values.delete(key); values.set(key, entry); // LRU touch.
        return Promise.resolve(entry.value);
      }
      values.delete(key);
    }
    if (inFlight.has(key)) return inFlight.get(key);
    if (active >= maxInFlight) return Promise.reject(new Error("Too many active loads"));
    active += 1;
    const promise = Promise.resolve().then(() => load(key)).then(value => {
      if (inFlight.get(key) === promise && ttlMs > 0) {
        for (const [oldKey, entry] of values) if (entry.expires <= now()) values.delete(oldKey);
        values.set(key, { value, expires: now() + ttlMs });
        while (values.size > maxEntries) values.delete(values.keys().next().value);
      }
      return value;
    }).finally(() => {
      active -= 1;
      if (inFlight.get(key) === promise) inFlight.delete(key);
    });
    inFlight.set(key, promise);
    return promise;
  }
  return {
    read,
    invalidate(key) { values.delete(key); inFlight.delete(key); },
    clear() { values.clear(); inFlight.clear(); },
    stats() { return { entries: values.size, active }; }
  };
}

export function sleep(ms, signal) {
  if (!Number.isFinite(ms) || ms < 0) return Promise.reject(new TypeError("Invalid delay"));
  if (signal?.aborted) return Promise.reject(aborted(signal));
  return new Promise((resolve, reject) => {
    const cleanup = () => signal?.removeEventListener("abort", cancel);
    const timer = setTimeout(() => { cleanup(); resolve(); }, ms);
    const cancel = () => { clearTimeout(timer); cleanup(); reject(aborted(signal)); };
    signal?.addEventListener("abort", cancel, { once: true });
  });
}

export async function retry(operation, {
  attempts = 3, baseMs = 100, capMs = 2000, shouldRetry = () => false,
  random = Math.random, wait = sleep, signal
} = {}) {
  if (typeof operation !== "function" || !Number.isInteger(attempts) || attempts < 1 ||
      !Number.isFinite(baseMs) || baseMs < 0 || !Number.isFinite(capMs) || capMs < 0) {
    throw new TypeError("Invalid retry configuration");
  }
  for (let attempt = 1; attempt <= attempts; attempt++) {
    if (signal?.aborted) throw aborted(signal);
    try {
      const value = await operation(attempt, signal);
      if (signal?.aborted) throw aborted(signal);
      return value;
    } catch (error) {
      if (signal?.aborted || attempt === attempts || !shouldRetry(error)) throw error;
      const fraction = random();
      if (!Number.isFinite(fraction) || fraction < 0 || fraction > 1) throw new TypeError("Invalid jitter");
      const maximum = Math.min(capMs, baseMs * 2 ** (attempt - 1));
      await wait(maximum * fraction, signal);
    }
  }
}
