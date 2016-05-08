import AppDispatcher from '../AppDispatcher';
import ReduceStore from 'flux/utils';
import constants from '../constants';

class AirportStore extends ReduceStore {
  getInitialState() {
    return[];
  }

  reduce(state, action) {
    swith(action.type) {
      case constants.FETCH_AIROPRTS_SUCCESS:
        return action.payload.response;
      default:
        return state;
    }
  }
}

export default AirportStore(AppDispatcher);