interface RateLimit {
  count: number;
  startTime: number;
}

class MemoryStore {
  private store: Map<string, RateLimit>;

  constructor() {
    this.store = new Map();
  }

  async increment(key: string, windowSeconds: number): Promise<number> {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record) {
      this.store.set(key, { count: 1, startTime: now });
      return 1;
    }

    // Reset if window has passed
    if (now - record.startTime > windowSeconds * 1000) {
      this.store.set(key, { count: 1, startTime: now });
      return 1;
    }

    record.count += 1;
    return record.count;
  }

  async ttl(key: string): Promise<number> {
    const record = this.store.get(key);
    if (!record) return 0;

    const now = Date.now();
    const elapsed = (now - record.startTime) / 1000;
    return Math.max(60 - elapsed, 0);
  }
}


const memoryStore = new MemoryStore();
export { memoryStore };