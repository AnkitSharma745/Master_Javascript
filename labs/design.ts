export type Pricing = (weightKg: number) => number;
export function shippingQuote(weightKg: number, pricing: Pricing): number {
  if (!Number.isFinite(weightKg) || weightKg < 0) throw new TypeError("Invalid weight");
  const result = pricing(weightKg);
  if (!Number.isSafeInteger(result) || result < 0) throw new TypeError("Invalid cents");
  return result;
}

export interface NameReader { read(): { name: string }; }
export function adaptName(legacy: { getName(): { full_name: string } }): NameReader {
  return { read: () => ({ name: legacy.getName().full_name }) };
}

// Synchronous, fail-fast notifications; unsubscribe is idempotent.
export class Topic<T> {
  #listeners = new Set<(value: T) => void>();
  subscribe(listener: (value: T) => void): () => void {
    this.#listeners.add(listener);
    return () => { this.#listeners.delete(listener); };
  }
  publish(value: T): void {
    for (const listener of [...this.#listeners]) listener(value);
  }
  get size(): number { return this.#listeners.size; }
}
