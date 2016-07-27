import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import constants from '../constants';

class AirportStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.FETCH_AIRPORTS_SUCCESS:
        return action.payload.data != null ? action.payload.data : [];
      default:
        return state;
    }
  }
}

export default new AirportStore(AppDispatcher);
