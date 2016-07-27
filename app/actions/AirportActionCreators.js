import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI'

let AirportActionCreators = {
	fetchAirports() {
		AirCheapAPI.fetchAirports();
		AppDispatcher.dispatch({
			type: constants.FETCH_AIRPORTS
		});
	},

	fetchAirportsSuccess(data) {
		AppDispatcher.dispatch({
			type: constants.FETCH_AIRPORTS_SUCCESS,
			payload: { data }
		});
	},

	fetchAirportsError(error) {
		AppDispatcher.dispatch({
			type: constants.FETCH_AIRPORTS_ERROR,
			payload: { error }
		});
	}
}

export default AirportActionCreators;