import AppDispatcher from '../AppDispatcher';

let AutosuggestActions = {
  valueChanged(newValue) {
    AppDispatcher.dispatch({
      action: "valueChanged",
      payload: newValue
    });
  }
}

export default AutosuggestActions;
