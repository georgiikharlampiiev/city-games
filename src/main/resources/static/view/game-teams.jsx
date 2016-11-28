import React from 'react';
import { Link, browserHistory } from "react-router";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Button, Collapse } from 'react-bootstrap';

let ajaxUtils =  require ('../utils/utils.jsx');

import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        game_teams:"Teams who apply"
    },
    ru: {
        game_teams:"Команды, которые подали заявку"
    },
    ua: {
        game_teams:"Команди, які подали заявку"
    }
});

export class GameTeams extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: {},
           teams: []
       };

       this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
       this.renderTeam = this.renderTeam.bind(this);
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
         ajaxUtils.executeGetAction('/api/getTeamsForGame/' + gameId,
             (data) => {this.setState({ teams: data })},
             (e) => console.error(e)
         );
    }

    sendChangesOnServer(){
        var currentGame = this.state.currentGame;
        currentGame.questions.forEach(this.setQuestionOrder);
        this.setState({currentGame});
        ajaxUtils.executePostAction(
            "/api/addGame",
            JSON.stringify(currentGame),
            (data) => {
                if(data.id != 0){
                    const tmpQuestions = data.questions;
                    data['questions'] = tmpQuestions.sort((a, b) => {return a.orderInGame-b.orderInGame});
                    this.setState({currentGame: data},
                        () => {$('#success_message').show()});
                    browserHistory.push('#/game-edit/' + data.id);
                }
            },
            (e) => {console.info(e)}
        );
    }

   renderTeam(team){
        return (
            <li key={team.id} className="list-group-item">
                {team.name}
            </li>
        )
   }

    render() {
        return (
            <div>
                <form className="well form-horizontal" action=" " method="post"  id="contact_form" autoComplete="off">
                    <fieldset>

                        {/*<!-- Form Name -->*/}
                        <legend>{strings.game_teams}</legend>

                        {/*<!-- Text input-->*/}
                        <ul className="col-md-9">
                            {this.state.teams.map(this.renderTeam)}
                        </ul>

                    </fieldset>
                </form>
            </div>
        )
    }
}

