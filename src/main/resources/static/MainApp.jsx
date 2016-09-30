import React from 'react';
import { Router, hashHistory, Link} from "react-router";

export default class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}

	
	render() {
		return (
			<div>
				<p><Link to="/statistic">
					Statistic
				</Link></p>
				<p><Link to="/games">
					Games
				</Link></p>
					<p><Link to="/users">
					Users
				</Link></p>
				{this.props.children}

			</div>
		)
	}
}
