var AWS = require("aws-sdk");
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

exports.handler = async function(event) {
  var count = event.count || 1;

  for (var i = 0; i < count; i++) {
    var params = {
      DelaySeconds: 0,
      MessageAttributes: {
        Title: {
          DataType: "String",
          StringValue: `Batch Message ${i}`
        }
      },
      MessageBody: `This is the message body of message ${i}`,
      QueueUrl: process.env.QUEUE_URL
    };

    const message = await sqs.sendMessage(params).promise();
    console.log(`Created message ${message.MessageId} (${i})`);
  }

  return null;
};
