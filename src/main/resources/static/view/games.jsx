import React from 'react';
import { Link } from "react-router";
var executeGetAction =  require ('../utils/utils.jsx');

export class Games extends React.Component {

    constructor(props) {
        super(props);
       this.state = {gameusers: []};
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
        //
        //  $.ajax({
        //      url: '/api/getGames',
        //      dataType: 'json',
        //      async: false,
        //      success: function (data) {
        //          console.info("data " ,data);
        //          this.setState({gameusers: data});
        //      }.bind(this),
        //      error: function (xhr, status, err) {
        //          console.error(this.props.url, status, err.toString());
        //      }.bind(this)
        //  });

         this.setState({gameusers:executeGetAction('/api/getGames')})
    }

    parseGame(game) {
        return (
            <div key={game.name} className="row">
                <div className="col-md-12 portfolio-item">
                    <a href="#">
                        <img className="img-responsive" src="http://placehold.it/700x400" alt=""/>
                    </a>
                    <h3>
                        <a href={"#/game-view/" + game.id} >{game.name}</a>
                    </h3>
                    <p>{game.description}</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.gameusers.map(this.parseGame)}
            </div>
        )
    }
}

