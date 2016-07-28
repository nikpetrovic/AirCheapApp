import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';
import constants from '../constants';

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
      case constants.TO_VALUE_CHANGED:
        return update(state, {
          to: {
            $set: action.payload
          }
        });
      case constants.FROM_VALUE_CHANGED:
        return update(state, {
          from: {
            $set: action.payload
          }
        });
      case constants.UPDATE_REQUESTED:
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
