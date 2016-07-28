import AppDispatcher from '../AppDispatcher';

let AutosuggestActions = {
  toValueChanged(newValue) {
    AppDispatcher.dispatch({
      type: "toValueChanged",
      payload: newValue
    });
  },

  fromValueChanged(newValue) {
    AppDispatcher.dispatch({
      type: "fromValueChanged",
      payload: newValue
    });
  },
  
  updateRequested(value) {
    AppDispatcher.dispatch({
      type: "updateRequested",
      payload: value
    });
  }
}

export default AutosuggestActions;
