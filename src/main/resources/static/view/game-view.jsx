import React from 'react';
import { Link } from "react-router";
var executeGetAction =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GameView extends React.Component {

    constructor(props) {
        super(props);
       this.state = {
           currentGame: [],
           currentUser: null
       };
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         this.setState({
             currentGame: executeGetAction('/api/getGame/' + this.props.params.gameId),
             currentUser: executeGetAction('/api/getUserProfile')
         });
    }

    formatMillisecondsToDate(milliseconds) {
        if ( milliseconds ) {
            return moment(milliseconds).format("DD/MM/YYYY hh:mm");
        } else {
            return "";
        }
    }

    joinGameButtonRender() {
        const user = this.state.currentUser
        if(user && user.teamId){
            return (<button type="button" className="btn btn-default">Join game</button>)
        } else {
            return (<div className="alert alert-warning">
                You are not a team member! Only team members can enter the game. Please, join in team ore create you own.</div>)
        }
    }

    render() {
        const game = this.state.currentGame;
        return (
            <div>
                {/*{this.state.gameusers.map(this.parseGame)}*/}
                <div className="row">
                    
                    <div className="col-lg-8">
                        <p><span className="glyphicon glyphicon-time"></span> Start at { this.formatMillisecondsToDate(game.dataStart) } </p>
                        <p><span className="glyphicon glyphicon-time"></span> Finish at { this.formatMillisecondsToDate(game.dataStop) } </p>

                        <hr/>
                        
                        <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
                        
                        <hr/>
                        
                        <p className="lead"> {game.name }</p>
                        <p>{ game.description }</p>
                        { this.joinGameButtonRender() }
                        <hr/>

                    </div>
                </div>
            </div>
        )
    }
}

