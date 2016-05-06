import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
	fetchAirports() {
		fetch('airports.json')
			.then((response) => response.json())
			.then((data) = > {
				// Call the AirportActionCreators success action with the parsed data
				AirportActionCreators.fetchAirportsSuccess(data);
			})
			.catch((error) => {
				// Call the AirportActionCreators error action with the error object
				AirportActionCreators.fetchAirportsError(error);
			});
	}
};

export default AirCheapAPI;