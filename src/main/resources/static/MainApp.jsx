import React from 'react';
import { Router, hashHistory, Link} from "react-router";

export default class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}

	
	render() {
		return (
			<div>
				<Link to="/statistic">
					Statistic
				</Link>
				<Link to="/users">
					Users
				</Link>
				{this.props.children}

			</div>
		)
	}
}
