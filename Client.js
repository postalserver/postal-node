var Promise = require('promise');
var https = require('https');
var concatStream = require('concat-stream');

function Client(host, serverKey) {
  this.host = host;
  this.serverKey = serverKey;
}

Client.prototype.makeRequest = function makeRequest(controller, action, parameters) {
  return new Promise(function (resolve, reject) {
    var data = JSON.stringify(parameters);

    var request = https.request({
      headers: {
        'Content-Type': 'application/json',
        'X-Server-API-Key': this.serverKey
      },
      host: this.host,
      method: 'POST',
      path: '/api/v1/' + controller + '/' + action
    }, function (response) {
      response.pipe(concatStream(function (content) {
        var json = JSON.parse(content);
        if (json.status === 'success') {
          resolve(json.data);
        } else {
          reject(json.data);
        }
      }));
    });

    request.on('error', function (error) {
      reject(error);
    });

    request.write(data);

    request.end();
  }.bind(this));
};

module.exports = Client;
