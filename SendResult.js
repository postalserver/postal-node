var Message = require('./Message');

function SendResult(client, result) {
  this.client = client;
  this.result = result;
}

SendResult.prototype.recipients = function recipients() {
  var messages;

  if (!this._recipients) {
    this._recipients = {};
    messages = this.result.messages;
    for (var key in messages) {
      this._recipients[key.toLowerCase()] = new Message(this.client, messages[key]);
    }
  }

  return this._recipients;
};

SendResult.prototype.size = function size() {
  return this.recipients.length;
};

module.exports = SendResult;
