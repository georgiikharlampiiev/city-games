import React from 'react';
import { Link, browserHistory } from "react-router";
import { GameEditStorm } from './game-edit-component/game-edit-storm.jsx';
import { GameEditLiner } from './game-edit-component/game-edit-liner.jsx';
import { GameEditPubQuiz } from './game-edit-component/game-edit-pub-quiz.jsx';

let ajaxUtils =  require ('../utils/utils.jsx');

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        game_type:"Game type",
        storm: "Storm",
        liner: "Liner",
        pub_quiz: "Pub-quiz"
    },
    ru: {
        game_type:"Game type",
        storm: "Storm",
        liner: "Liner",
        pub_quiz: "Pub-quiz"
    },
    ua: {
        game_type:"Game type",
        storm: "Storm",
        liner: "Liner",
        pub_quiz: "Pub-quiz"
    }
});

export class GameEdit extends React.Component {

    constructor(props) {
       super(props);
        this.state = {
            currentGame: {},
            currentUser: null,
            isUserGameEditor: false,
            gameTypes: []
        };

        this.renderEditFields = this.renderEditFields.bind(this);
        this.changeGameTypeListener = this.changeGameTypeListener.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

    loadFromServer() {
        const gameId = this.props.params.gameId;
        if(gameId != 0) {
            ajaxUtils.executeGetAction('/api/getGame/' + gameId,
                (data) => {
                    const tmpQuestions = data.questions;
                    data['questions'] = tmpQuestions.sort((a, b) => {return a.orderInGame-b.orderInGame});
                    this.setState({ currentGame:data });
                },
                (e) => console.error(e)
            );
        }
        ajaxUtils.executeGetAction('/api/getUserProfile',
            (data) => {this.setState({ currentUser: data })},
            (e) => console.error(e)
        );
        ajaxUtils.executeGetAction('/api/isUserGameEditor/' + gameId,
            (data) => {this.setState({ isUserGameEditor: data })},
            (e) => console.error(e)
        );
        ajaxUtils.executeGetAction('/api/getTypeGames',
            (data) => {this.setState({ gameTypes: data })},
            (e) => console.error(e)
        );
    }

    changeGameTypeListener(e){
        console.info("changeGameTypeListener ", e.target.value)
        let currentGame = this.state.currentGame;
        currentGame['typeGame'] = e.target.value;
        this.setState({currentGame})
    }

    renderEditFields(){
        let typeGame = this.state.currentGame.typeGame;
        if (typeGame == '0') {
            return (
                <GameEditStorm
                    params={this.props.params}
                    currentGame={this.state.currentGame}
                    currentUser={this.state.currentUser}
                    isUserGameEditor={this.state.isUserGameEditor}
                />)
        } else if (typeGame == 1) {
            return (
                <GameEditLiner
                    params={this.props.params}
                    currentGame={this.state.currentGame}
                    currentUser={this.state.currentUser}
                    isUserGameEditor={this.state.isUserGameEditor}
                />)
        } else {
            return (
                <GameEditPubQuiz
                    params={this.props.params}
                    currentGame={this.state.currentGame}
                    currentUser={this.state.currentUser}
                    isUserGameEditor={this.state.isUserGameEditor}
                />)

        }
        return (<div></div>)
    }

    renderGameType(type){
        return (
            <option key={type.id} value={type.id}> {strings[type.type]} </option>
        )
    }

    render() {

        return (
            <form className="well form-horizontal" action=" " method="post"  id="contact_form" autoComplete="off">
                <fieldset>

                    <div className="form-group">
                        <label className="col-md-4 control-label">{strings.game_type}</label>
                        <div className="col-md-4 selectContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                                <select name="team" value={this.state.currentGame.typeGame} className="form-control selectpicker" onChange={this.changeGameTypeListener.bind(this)} >
                                    {this.state.gameTypes.map(this.renderGameType)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {this.renderEditFields()}

                </fieldset>
            </form>)
    }
}

