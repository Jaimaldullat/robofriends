import React, { Component } from "react";
import Searchbox from "./Searchbox";
import CardList from "./CardList";
import Scroll from "./Scroll";
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
			.then(users => this.setState({ robots: users }));
	}
	onSearchChange = event => {
		this.setState({ searchField: event.target.value });
	};

	render() {
		const filteredArray = this.state.robots.filter(robots => {
			return robots.name
				.toLowerCase()
				.includes(this.state.searchField.toLowerCase());
		});
		if (this.state.robots.length === 0) {
			return <h1 className="f1"> Loading</h1>;
		} else {
			return (
				<div className="tc">
					<h1 className="f1"> RoboFriends</h1>

					<Searchbox searchChange={this.onSearchChange} />
					<Scroll>
						<CardList robots={filteredArray} />
					</Scroll>
				</div>
			);
		}
	}
}

export default App;
