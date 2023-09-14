// logRequests.js
const fs = require('fs');
const path = require('path');

// Define the middleware function
function logRequests(req, res, next) {
  const logFilePath = path.join(__dirname, 'log.txt');
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  // Append the log message to the log.txt file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  // Continue with the request
  next();
}

module.exports = logRequests;
