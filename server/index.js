const express = require('express');
const app = express();

// Root route handler
app.get('/', (req, res) => {
  res.send('Hello, Server is running!');
});

// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});