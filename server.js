const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const publicVapidKey = 'BDS8OZ5C7T6cg3tN7S1MfB6kuEQjZ_dO39gcxon_DNpOS2NLO_4bSgKc4M8d3Aw3HjelKckeTi9SiPOuX7wL7CU';
const privateVapidKey = 'tg9wPySCj0mk4qXK9EZCDOlGxDaJLqKUMmINxY38iQA';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey,
);

let subscription;

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Notifications connected!' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.post('/send', (req, res) => {
  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: req.body.title });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
