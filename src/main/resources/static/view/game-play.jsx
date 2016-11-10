import React from 'react';
import { Link } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GamePlay extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: [],
           currentUser: null,
           isUserAppliedGame: false
       };
       this.applyGame = this.applyGame.bind(this);
       this.checkIsUserAppliedGame = this.checkIsUserAppliedGame.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
        this.checkIsUserAppliedGame();
    }

     loadFromServer() {
         ajaxUtils.executeGetAction('/api/getGame/' + this.props.params.gameId,
             (data) => {this.setState({currentGame:data})},
             (e) => console.error(e)
         );
         ajaxUtils.executeGetAction('/api/getUserProfile',
             (data) => {this.setState({currentUser:data})},
             (e) => console.error(e)
         );
    }

    applyGame() {
        var params = this.props.params;
        ajaxUtils.executeGetAction('/api/applyGameByCurrentUser/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame:data })},
            (e) => console.error(e)
        );
    }

    checkIsUserAppliedGame() {
        var params = this.props.params;
        ajaxUtils.executeGetAction('/api/isUserAppliedGame/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame:data })},
            (e) => console.error(e)
        );
    }

    formatMillisecondsToDate(milliseconds) {
        if ( milliseconds ) {
            return moment(milliseconds).format("DD/MM/YYYY hh:mm");
        } else {
            return "";
        }
    }


    render() {
        const game = this.state.currentGame;
        var image = "http://placehold.it/900x300";
        if(game.image) {
            image = "data:image/png;base64," + game.image;
        }
        return (
            <div>
                <div className="row">
                    
                    <div className="col-lg-8">
                        <p><span className="glyphicon glyphicon-time"></span> Start at { this.formatMillisecondsToDate(game.dataStart) } </p>
                        <p><span className="glyphicon glyphicon-time"></span> Finish at { this.formatMillisecondsToDate(game.dataStop) } </p>

                        <hr/>
                        
                        <img className="img-responsive" src={ image } alt=""/>
                        
                        <hr/>
                        
                        <p className="lead"> JUST STUB FOR GAME PLAY!!!!!</p>


                    </div>
                </div>
            </div>
        )
    }
}

