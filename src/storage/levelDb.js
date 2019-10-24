const level = require('level');

class LevelProvider {
  constructor({ path }) {
    this.client = level(path, { valueEncoding: 'json' });
  }

  store(key, value) {
    return this.client.put(key, value);
  }

  get(key) {
    return this.client.get(key);
  }

  delete(key) {
    return this.client.del(key);
  }
}

module.exports = LevelProvider;
