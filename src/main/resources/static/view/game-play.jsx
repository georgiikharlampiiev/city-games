import React from 'react';
import { Link } from "react-router";

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
        ajaxUtils.executeGetAction('/api/getGame/' + this.props.params.gameId,
            (data) => {this.setState({ currentGame:data })},
            (e) => console.error(e)
        );
    }

    renderByGameType(){
        const currentGame = this.state.currentGame;
        console.info("typeGame ", currentGame.typeGame )
        console.info("currentGame.typeGame == 0 ", currentGame.typeGame == 0 )
        if(currentGame.typeGame == 0){
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

