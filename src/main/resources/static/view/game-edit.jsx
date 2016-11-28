import React from 'react';
import { Link, browserHistory } from "react-router";
import { GameEditStorm } from './game-edit-component/game-edit-storm.jsx';
import { GameEditLiner } from './game-edit-component/game-edit-liner.jsx';

let ajaxUtils =  require ('../utils/utils.jsx');

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        game_type:"Game type"
    },
    ru: {
        game_type:"Game type"
    },
    ua: {
        game_type:"Game type"
    }
});

export class GameEdit extends React.Component {

    constructor(props) {
       super(props);
        this.state = {
            currentGame: {},
            currentUser: null,
            isUserGameEditor: false
        };
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
                                <select name="team" className="form-control selectpicker" >
                                    <option value="1" >Storm</option>
                                    <option value="2" >Liner</option>
                                    <option value="3" >Pub quiz</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <GameEditStorm
                        params={this.props.params}
                        currentGame={this.state.currentGame}
                        currentUser={this.state.currentUser}
                        isUserGameEditor={this.state.isUserGameEditor}
                    />
                </fieldset>
            </form>)
    }
}

