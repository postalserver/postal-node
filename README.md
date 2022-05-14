# Postal for Node

This library helps you send e-mails through the open source mail delivery
platform, [Postal](https://github.com/postalserver/postal) in Node.

## Installation

Install the library using [NPM](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/):

```
$ npm install @atech/postal
$ yarn install @atech/postal
```

## Usage

Sending an email is very simple. Just follow the example below. Before you can
begin, you'll need to login to your installation's web interface and generate
new API credentials. This package assumes you are on Postal v2.

```javascript
// Include the Postal library
const Postal = require('@atech/postal').default; // CommonJS
// OR
import Postal from '@atech/postal' // ES6 import

// Create a new Postal client using a server key generated using your installation's web interface
const client = new Postal({
    hostname: 'https://postal.yourdomain.com',
    apiKey: 'your-api-key',
});

// This must be in an async function
try {
    // Send a new message
    const message = await client.sendMessage({
        // Set the subject
        subject: 'Hi there!',
        // Specify who the message should be from - this must be from a verified domain on your mail server
        from: 'test@test.postal.io',
        // Add some recipients
        to: ['john@example.com', 'mary@example.com'],
        cc: ['mike@example.com'],
        bcc: ['secret@awesomeapp.com'],
        // Set the content for the e-mail
        plain_body: 'Hello world!',
        html_body: '<p>Hello world!</p>',
        // Add any custom headers
        headers: {
            'X-PHP-Test': 'value',
        },
        // Attach any files
        attachments: [
            {
                content_type: 'text/plain',
                data: Buffer.from('Hello world!').toString('base64'),
                name: 'textmessage.txt',
            },
        ],
    });

    // Do something with the returned data
    console.log(message);
} catch (error) {
    // Handle the error
    console.log(error);
}
```
