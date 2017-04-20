var SendResult = require('./SendResult');

function SendMessage(client) {
  this.attributes = {
    to: [],
    cc: [],
    bcc: [],
    headers: {},
    attachments: []
  };
  this.client = client;
}

SendMessage.prototype.to = function to(address) {
  this.attributes.to.push(address);
};

SendMessage.prototype.cc = function cc(address) {
  this.attributes.cc.push(address);
};

SendMessage.prototype.bcc = function bcc(address) {
  this.attributes.bcc.push(address);
};

SendMessage.prototype.from = function from(address) {
  this.attributes.from = address;
};

SendMessage.prototype.sender = function sender(address) {
  this.attributes.sender = address;
};

SendMessage.prototype.subject = function subject(_subject) {
  this.attributes.subject = _subject;
};

SendMessage.prototype.tag = function tag(_tag) {
  this.attributes.tag = _tag;
};

SendMessage.prototype.replyTo = function replyTo(_replyTo) {
  this.attributes.reply_to = _replyTo;
};

SendMessage.prototype.plainBody = function plainBody(content) {
  this.attributes.plain_body = content;
};

SendMessage.prototype.htmlBody = function htmlBody(content) {
  this.attributes.html_body = content;
};

SendMessage.prototype.header = function header(key, value) {
  this.attributes.headers[key] = value;
};

SendMessage.prototype.attach = function attach(filename, contentType, data) {
  var attachment = {
    content_type: contentType,
    data: new Buffer(data).toString('base64'),
    name: filename
  };
  this.attributes.attachments.push(attachment);
};

SendMessage.prototype.send = function send() {
  return this.client.makeRequest('send', 'message', this.attributes)
    .then(function (result) {
      return new SendResult(this.client, result);
    }.bind(this));
};

module.exports = SendMessage;
