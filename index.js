module.exports = {
  // simple storage
  levelDb: require('./src/storage/levelDb'),
  awsDynamo: require('./src/storage/awsDynamo'),

  // queues
  levelQueue: require('./src/queue/levelDb'),
  awsSqs: require('./src/queue/awsSqs'),
};
