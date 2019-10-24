const level = require('level');
const cuid = require('cuid');

class LevelProvider {
  constructor({ path }) {
    this.client = level(path, { valueEncoding: 'json' });
    this._queue = [];
    this.client.get('queue', (err, results) => {
      if (results) {
        this._queue = results;
        console.log(this._queue);
      }
    });
  }

  store(item) {
    this._queue.push({ Item: item, ReceiptHandle: cuid() });
    return this.client.put('queue', this._queue);
  }

  receive({ limit = -1 } = {}) {
    return Promise.resolve(
      this._queue.slice(0, limit === -1 ? this._queue.length : limit),
    );
  }

  delete(receiptHandle) {
    const foundIndex = this._queue.findIndex(
      ({ ReceiptHandle }) => ReceiptHandle === receiptHandle,
    );

    if (foundIndex === -1) {
      throw Error('No entry found!');
    }

    this._queue.splice(foundIndex, 1);
    return this.client.put('queue', this._queue);
  }
}

module.exports = LevelProvider;
