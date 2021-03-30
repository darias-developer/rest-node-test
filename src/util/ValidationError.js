/**
 * Custom exception utilizada para validadores
 */
module.exports = class ValidationError extends Error {
  /**
   * @param {text} message Mensaje de error.
   */
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
};
