class Cache {

    static cache = {};

    static put(key, value) {
        Cache.cache[key] = value;
    }

    static get(key) {
        return Cache.cache[key];
    }
}

export default Cache;