import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
	fetchAirports() {
		return fetch('airports.json')
			.then((response) => response.json());
	}
};

export default AirCheapAPI;