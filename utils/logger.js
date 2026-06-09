function logInfo(message, details = {}) {
  // Keep logging lightweight until the framework needs a structured logger dependency.
  console.log(JSON.stringify({ level: 'info', message, ...details }));
}

module.exports = { logInfo };