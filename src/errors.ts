export class StatePatternError extends Error {
  name: string;
  constructor(...args: any[]) {
    super(...args);
    this.name = 'StatePatternError';
  }
}
