var SendResult = require('./SendResult');

function SendRawMessage(client) {
  this.attributes = {};
  this.client = client;
}

SendRawMessage.prototype.mailFrom = function mailFrom(address) {
  this.attributes.mail_from = address;
};

SendRawMessage.prototype.rcptTo = function rcptTo(address) {
  this.attributes.rcpt_to = (this.attributes.rcpt_to || []);
  this.attributes.rcpt_to.push(address);
};

SendRawMessage.prototype.data = function data(content) {
  this.attributes.data = new Buffer(content).toString('base64');
};

SendRawMessage.prototype.send = function send(callback) {
  return this.client.makeRequest('send', 'raw', this.attributes)
    .then(function (result) {
      return new SendResult(this.client, result);
    }.bind(this));
};

module.exports = SendRawMessage;
