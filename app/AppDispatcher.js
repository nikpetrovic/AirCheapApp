import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
	dispatch(action = {}) {
		console.debug("Dispatched", action.type);
		super.dispatch(action);
	}

	dispatchAsync(promise, types, payload) {
		const {request, success, failure} = types;

		this.dispatch({
			action: request,
			payload: Object.assign({}, payload)
		});

		promise
			.then(
				response => this.dispatch({
					type: success,
					payload: Object.assign({}, payload, { response })
				}),
				error => this.dispatch({
					type: failure,
					payload: Object.assign({}, payload, { error })
				})
			);
	}
}

export default new AppDispatcher();