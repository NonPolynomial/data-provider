const dynamodb = require('aws-sdk/clients/dynamodb');

class AwsDynamoDbProvider {
  constructor({ accessKeyId, secretAccessKey, region, tableName }) {
    this.tableName = tableName;
    this.client = new dynamodb.DocumentClient({
      service: new dynamodb({
        accessKeyId,
        secretAccessKey,
        region,
      }),
    });
  }

  store(key, value) {
    return this.client
      .put({
        TableName: this.tableName,
        Item: {
          ...value,
          id: key,
        },
      })
      .promise();
  }

  get(key) {
    return this.client
      .get({
        TableName: this.tableName,
        Key: {
          id: key,
        },
      })
      .promise();
  }

  delete(key) {
    return this.client
      .delete({
        TableName: this.tableName,
        Key: {
          id: key,
        },
      })
      .promise();
  }
}

module.exports = AwsDynamoDbProvider;
