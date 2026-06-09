function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

module.exports = { normalizeWhitespace };