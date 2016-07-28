import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

let AutosuggestActions = {
  toValueChanged(newValue) {
    AppDispatcher.dispatch({
      type: constants.TO_VALUE_CHANGED,
      payload: newValue
    });
  },

  fromValueChanged(newValue) {
    AppDispatcher.dispatch({
      type: constants.FROM_VALUE_CHANGED,
      payload: newValue
    });
  },
  
  updateRequested(value) {
    AppDispatcher.dispatch({
      type: constants.UPDATE_REQUESTED,
      payload: value
    });
  }
}

export default AutosuggestActions;
