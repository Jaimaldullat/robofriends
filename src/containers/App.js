import React, { Component } from "react";
import Searchbox from "../components/Searchbox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchField: ""
		};
	}
	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(response => response.json())
			.then(users =>
				this.setState({
					robots: users
				})
			);
	}
	onSearchChange = event => {
		this.setState({
			searchField: event.target.value
		});
	};

	render() {
		const { robots, searchField } = this.state;
		const filteredArray = robots.filter(robots => {
			return robots.name
				.toLowerCase()
				.includes(searchField.toLowerCase());
		});
		return !robots.length ? (
			<h1 className="f1"> Loading </h1>
		) : (
			<div className="tc">
				<h1 className="f1"> RoboFriends </h1>
				<Searchbox searchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredArray} />
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
}

export default App;
