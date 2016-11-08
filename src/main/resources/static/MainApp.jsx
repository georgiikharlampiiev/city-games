import React from 'react';
import { Router, hashHistory, Link} from "react-router";

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
										Games
									</Link>
								</li>
								<li>
									<Link to="/statistic">
										Statistic
									</Link>
								</li>
								<li>
									<Link to="/myprofile">
										My Profile
									</Link>
								</li>
								<li>
									<a href="/logout">
										Logout
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

			</div>
		)
	}
}
