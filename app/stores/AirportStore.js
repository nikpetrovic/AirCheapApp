import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import constants from '../constants';

class AirportStore extends ReduceStore {
  getInitialState() {
    return[];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.FETCH_AIROPRTS_SUCCESS:
        JSON.stringify(action.payload.response);
        return action.payload.response;
      default:
        return state;
    }
  }
}

export default new AirportStore(AppDispatcher);
