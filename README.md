# Postal for Node

This library helps you send e-mails through the open source mail delivery
platform, [Postal](https://github.com/atech/postal) in Node.

## Installation

Install the library using [NPM](https://www.npmjs.com/):

```
$ npm install @atech/postal --save
```

## Usage

Sending an email is very simple. Just follow the example below. Before you can
begin, you'll need to login to your installation's web interface and generate
new API credentials.

```javascript
// Include the Postal library
var Postal = require('@atech/postal');

// Create a new Postal client using a server key generated using your
// installation's web interface
var client = new Postal.Client('https://postal.yourdomain.com', 'your-api-key');

// Create a new message
var message = new Postal.SendMessage(client);

// Add some recipients
message.to('john@example.com');
message.to('mary@example.com');
message.cc('mike@example.com');
message.bcc('secret@awesomeapp.com');

// Specify who the message should be from - this must be from a verified domain
// on your mail server
message.from('test@test.postal.io');

// Set the subject
message.subject('Hi there!');

// Set the content for the e-mail
message.plainBody('Hello world!');
message.htmlBody('<p>Hello world!</p>');

// Add any custom headers
message.header('X-PHP-Test', 'value');

// Attach any files
message.attach('textmessage.txt', 'text/plain', 'Hello world!');

// Send the message and get the result
message.send()
  .then(function (result) {
    var recipients = result.recipients();
    // Loop through each of the recipients to get the message ID
    for (var email in recipients) {
      var message = recipients[email];
      console.log(message.id());    // Logs the message ID
      console.log(message.token()); // Logs the message's token
    }
  }).catch(function (error) {
    // Do something with the error
    console.log(error.code);
    console.log(error.message);
  });
```
