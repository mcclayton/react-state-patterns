export class StatePatternError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'StatePatternError';
  }
}
