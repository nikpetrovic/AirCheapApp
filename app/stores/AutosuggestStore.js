import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';

class AutosuggestStore extends ReduceStore {
  getInitialState() {
    return {
      to: '',
      from: '',
      suggestions: []
    };
  }

  reduce(state, action) {
    switch(action.type) {
      case "toValueChanged":
        return update(state, {
          to: {
            $set: action.payload
          }
        });
      case "fromValueChanged":
        return update(state, {
          from: {
            $set: action.payload
          }
        });
      case "updateRequested":
        return update(state, {
          suggestions: {
            $set: action.payload
          }
        });
      default:
        return state;
    }

    return state;
  }
}

export default new AutosuggestStore(AppDispatcher);
