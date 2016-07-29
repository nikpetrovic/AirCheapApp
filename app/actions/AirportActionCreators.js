import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI'

let AirportActionCreators = {
	fetchAirports() {
		AppDispatcher.dispatchAsync(AirCheapAPI.fetchAirports(), {
			request: constants.FETCH_AIRPORTS,
			success: constants.FETCH_AIRPORTS_SUCCESS,
			failure: constants.FETCH_AIRPORTS_ERROR
		});
	}
}

export default AirportActionCreators;