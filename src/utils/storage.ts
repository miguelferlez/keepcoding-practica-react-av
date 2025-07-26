type StorageKey = "auth";

export default {
  get(key: StorageKey) {
    const value = localStorage.getItem(key);
    return value ? value : null;
  },
  set(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  },
  remove(key: StorageKey) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
