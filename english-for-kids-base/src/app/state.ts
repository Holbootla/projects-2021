export default class State {
  private static instance: State;

  private constructor() {
  }

  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new State();
    }
    return State.instance;
  }
}
