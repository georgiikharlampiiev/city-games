import React from 'react';
import { Router, hashHistory, Link} from "react-router";

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
	en:{
		games:"Games",
		statistic:"Statistic",
		my_profile:"My Profile",
		team:"Team",
		about:"About",
		logout:"Logout"
	},
	ru: {
		games:"Игры",
		statistic:"Статистика",
		my_profile:"Мой профиль",
		team:"Моя команда",
		about:"Об игре",
		logout:"Выйти"
	},
	ua: {
		games:"Ігри",
		statistic:"Статистика",
		my_profile:"Мій профіль",
		team:"Моя команда",
		about:"Про гру",
		logout:"Вийти"
	}
});

export default class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (


			<div>

				{/*<!-- Navigation -->*/}
				<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<div className="container">
						{/*<!-- Brand and toggle get grouped for better mobile display -->*/}
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link to="/" activeClassName="navbar-brand">
								City games
							</Link>
						</div>
						{/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li>
									<Link to="/games">
										{strings.games}
									</Link>
								</li>
								<li>
									<Link to="/statistic">
										{strings.statistic}
									</Link>
								</li>
								<li>
									<Link to="/myprofile">
										{strings.my_profile}
									</Link>
								</li>
								<li>
                                	<Link to="/team">
										{strings.team}
                                	</Link>
                             	</li>
								<li>
									<Link to="/about">
										{strings.about}
									</Link>
								</li>
								<li>
									<a href="/logout">
										{strings.logout}
									</a>
								</li>
							</ul>
						</div>
						{/*<!-- /.navbar-collapse -->*/}
					</div>
				</nav>
				<div className="container">
					{this.props.children}
					<footer>
						<div className="row">
							<div className="col-lg-12">
								<p>Copyright &copy; City Games 2016</p>
							</div>
						</div>
					</footer>
					{/*<!-- /.container -->*/}
				</div>

				<div id="loader"></div>

			</div>
		)
	}
}
