import React from 'react';
import { Link } from "react-router";
import ReactCountdownClock  from "react-countdown-clock";

import { GamePlayStorm } from "./game-play-component/game-play-storm.jsx";

const ajaxUtils = require('../utils/utils.jsx');
const moment = require('moment');

export class GamePlay extends React.Component {

    constructor(props) {
       super(props);
        this.state = {
            currentGame: {}
        };

        this.renderByGameType = this.renderByGameType.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

    loadFromServer() {
        ajaxUtils.executeGetAction('/api/getGameForPlay/' + this.props.params.gameId,
            (data) => {this.setState({ currentGame:data })},
            (e) => console.error(e)
        );
    }

    renderByGameType(){
        const currentGame = this.state.currentGame;
        console.info("typeGame ", currentGame.typeGame );
        const timeNow =  new Date;
        if(currentGame.dateStart > timeNow.getTime()){
            const seconds = (currentGame.dateStart - timeNow.getTime())/1000;
            return (<ReactCountdownClock seconds={seconds}
                                         color="#000"
                                         alpha={0.9}
                                         size={300}
                                         onComplete={this.loadFromServer.bind(this)} />)
        }else if(currentGame.typeGame == 0){
            return (<GamePlayStorm props={this.props} gameId={currentGame.id} />)
        }

        return (<div></div>)

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-8">

                        {this.renderByGameType()}

                    </div>

                </div>

            </div>
        )
    }
}

