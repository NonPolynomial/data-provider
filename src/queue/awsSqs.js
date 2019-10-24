const sqs = require('aws-sdk/clients/sqs');

class AwsSimpleQueueServiceProvider {
  constructor({ accessKeyId, secretAccessKey, region, url }) {
    this.queueUrl = url;
    this.client = new sqs({
      accessKeyId,
      secretAccessKey,
      region,
    });
  }

  store(value, { messageGrouId: MessageGroupId = 'message' } = {}) {
    return this.client
      .sendMessage({
        QueueUrl: this.queueUrl,
        MessageGroupId,
        MessageBody: JSON.stringify(value),
      })
      .promise();
  }

  receive({ limit = 10 } = {}) {
    return this.client
      .receiveMessage({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: limit,
      })
      .promise()
      .then(({ Messages }) => Messages)
      .then(messages => {
        return (messages || []).map(({ ReceiptHandle, Body }) => ({
          ReceiptHandle,
          Item: JSON.parse(Body),
        }));
      });
  }

  delete(ReceiptHandle) {
    return this.client.deleteMessage({
      ReceiptHandle,
      QueueUrl: this.queueUrl,
    }).promise();
  }
}

module.exports = AwsSimpleQueueServiceProvider;
