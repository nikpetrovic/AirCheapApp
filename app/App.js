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
		AirportActionCreators.fetchAirports();
	}

	getSuggestions(input) {
		const escapedInput = input.trim();
		const airportMatchRegex = new RegExp(escapedInput, 'i');

		if (typeof this.state == 'undefined' || this.state == null) {
			return [];
		}


		const suggestions = this.state.airports
					.filter(airport => airportMatchRegex.test(airport.city.toLowerCase()))
					.sort((airport1, airport2) => {
						return airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput);
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
			<span>{suggestion}</span>
		);
	}

	onToChange(event, { newValue }) {
		AutosuggestActions.toValueChanged(newValue);
	}

	onFromChange(event, { newValue }) {
		AutosuggestActions.fromValueChanged(newValue);
	}

	onSuggestionsUpdateRequested({ value }) {
		AutosuggestActions.updateRequested(this.getSuggestions(value));
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
						<Autosuggest id='origin' inputProps={ { placeholder: 'From', value: this.state.from, onChange: this.onFromChange.bind(this) } } suggestions={ this.state.suggestions }
							onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)} getSuggestionValue={this.getSuggestionValue} renderSuggestion={this.renderSuggestion} />
						<Autosuggest id='destination' inputProps={ { placeholder: 'To', value: this.state.to, onChange: this.onToChange.bind(this) } } suggestions={ this.state.suggestions }
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
		suggestions: AutosuggestStore.getState().suggestions,
		from: AutosuggestStore.getState().from,
		to: AutosuggestStore.getState().to
	}
};

const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));
