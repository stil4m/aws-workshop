exports.handler = async function(event) {
  var total = event.key1 + event.key2 + event.key3;
  var message = `${event.key1} + ${event.key2} + ${event.key3} = ${total}`;

  return {
    message: message
  };
};
