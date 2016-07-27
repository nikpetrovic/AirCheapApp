import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';

class AutosuggestStore extends ReduceStore {
  getInitialState() {
    return '';
  }

  reduce(state, action) {
    switch(action.type) {
      case "valueChanged":
        return action.payload;
      default:
        return state;
    }
  }
}

export default new AutosuggestStore(AppDispatcher);
