import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import Autosuggest from 'react-autosuggest';
import AirportStore from './stores/AirportStore';
import AutosuggestStore from './stores/AutosuggestStore';
import AirportActionCreators from './actions/AirportActionCreators';
import AutosuggestActions from './actions/AutosuggestActions';

class App extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		console.log("componentDidMount")
		AirportActionCreators.fetchAirports();
	}

	getSuggestions(input) {
		const escapedInput = input.trim().toLowerCase();
		const airportMatchRegex = new RegExp('\\b' + escapedInput + 'i');

		if (typeof this.state == 'undefined' || this.state == null) {
			return [];
		}

		const suggestions = this.state.airports
					.filter(airport => airportMatchRegex.test(airport.city))
					.sort((airport1, airport2) => {
						airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput);
					})
					.slice(0, 7)
					.map(airport => `${airport.city} - ${airport.country} ${airport.code}`);

		return suggestions;
	}

	getSuggestionValue(suggestion) {
		return suggestion;
	}

	renderSuggestion(suggestion) {
		return (
			<span>{suggestion.name}</span>
		);
	}

	onChange(event, { newValue }) {
		AutosuggestActions.valueChanged(newValue);
	}

	onSuggestionsUpdateRequested({ value }) {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	}

	render() {
		return (
			<div>
				<header>
					<div>
						<img src="logo.png" height="35" />
						<p>Check discount ticket prices and pay using your AirCheap points</p>
					</div>
					<div className="header-route">
						<Autosuggest id='origin' inputProps={ { placeholder: 'From', value: this.state.value, onChange: this.onChange.bind(this) } } suggestions={ this.state.airports }
							onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)} getSuggestionValue={this.getSuggestionValue} renderSuggestion={this.renderSuggestion} />
					</div>
				</header>
			</div>
		);
	}
}

App.getStores = () => ([ AirportStore, AutosuggestStore ]);
App.calculateState = (prevState) => {
	return {
		airports: AirportStore.getState(),
		value: AutosuggestStore.getState()
	}
};

const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));
