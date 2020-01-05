// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

exports.handler = async function(event) {
  var params = {
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: process.env.QUEUE_URL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
  };

  const response = await sqs.receiveMessage(params).promise();
  if (!response.Messages) {
    console.log(`No messages to be processed`);
    return;
  }
  console.log(`Received ${response.Messages.length} messages`);

  for (var i = 0; i < response.Messages.length; i++) {
    console.log(`Deleting message  ${i + 1}...`);
    const message = response.Messages[i];

    var deleteParams = {
      QueueUrl: process.env.QUEUE_URL,
      ReceiptHandle: message.ReceiptHandle
    };

    await sqs.deleteMessage(deleteParams).promise();
    console.log(`Deleted message  ${i + 1}!`);
  }

  console.log(`Deleted the whole batch.`);
};
