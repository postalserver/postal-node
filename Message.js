function Message(client, attributes) {
  this.client = client;
  this.attributes = attributes;
}

Message.prototype.id = function id() {
  return this.attributes.id;
}

Message.prototype.token = function token() {
  return this.attributes.token;
}

module.exports = Message;
