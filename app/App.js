import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import Autosuggest from 'react-autosuggest';
import AirportStore from './stores/AirportStore';
import AirportActionCreators from './actions/AirportActionCreators';

export class App extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			suggestions: this.getSuggestions('')
		};
	}

	componentDidMount() {
		AirportActionCreators.fetchAirports();
	}

	getSuggestions(input) {
		const escapedInput = input.trim().toLowerCase();
		const airportMatchRegex = new RegExp('\\b' + escapedInput + 'i');

		console.log(JSON.stringify(this.state));

		if (typeof this.state === 'undefined' || typeof this.state.airports === 'undefined') {
			console.log('izlaz');
			return [];
		}

		console.log('nastavak');

		const suggestions = this.state.airports
					.filter(airport => airportMatchRegex.test(airport.city))
					.sort((airport1, airport2) => {
						airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput);
					})
					.slice(0, 7)
					.map(airport => `${airport.city} - ${airport.country} ${airport.code}`);

		console.log(JSON.stringify(suggestions));

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
		this.setState({
			value: newValue
		});
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
						<Autosuggest id='origin' inputProps={ { placeholder: 'From', value: '', onChange: this.onChange.bind(this) } } suggestions={ this.state.suggestions }
							onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)} getSuggestionValue={this.getSuggestionValue} renderSuggestion={this.renderSuggestion} />

					</div>
				</header>
			</div>
		);
	}
}

App.getStores = () => ([ AirportStore ]);
App.calculateState = (prevState) => {{
	airports: AirportStore.getState()
}};

const AppContainer = Container.create(App);

render(<AppContainer />, document.getElementById('root'));

/*	constructor() {
		super();

		this.state = {
			value: '',
			suggestions: this.getSuggestions('')
		}
	}

	getSuggestions(input) {
		return ['1', '2', '3'];
	}

	getSuggestionValue(suggestion) {
		return suggestion;
	}

	renderSuggestion(suggestion, { value, valueBeforeUpDown }) {
		return <span>{suggestion}</span>;
	}

	onChange(event, { newValue }) {
		this.setState({
			value: newValue
		});
	}

	render() {
		const inputProps = {
			value: this.state.value,
			placeholder: 'some placeholder',
			onChange: this.onChange.bind(this)
		};

		return (
			<div>
				<h1>Hello</h1>
				<br />

				<Autosuggest suggestions = { this.state.suggestions } inputProps = { { value: this.state.value, placeholder: 'place', onChange: this.onChange.bind(this) } } getSuggestionValue = {this.getSuggestionValue} renderSuggestion = {this.renderSuggestion} />
			</div>
		);
	}
}*/

render(<App />, document.getElementById('root'));
