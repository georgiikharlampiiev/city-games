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
        game_teams:"Teams who apply",
        approve:"Approve",
        delete_approve:"Delete approve"
    },
    ru: {
        game_teams:"Команды которые подали заяку",
        approve:"Подтвердить",
        delete_approve:"Удалить подтверждение"
    },
    ua: {
        game_teams:"Команди, які подали заявку",
        approve:"Підтвердити",
        delete_approve:"Видалити підтвердження"
    }
});

export class GameTeams extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: {},
           teams: []
       };

       this.loadTeamsFromServer = this.loadTeamsFromServer.bind(this);
       this.renderTeam = this.renderTeam.bind(this);
       this.sendApplyOrUnapply = this.sendApplyOrUnapply.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         const gameId = this.props.params.gameId;
         if(gameId != 0) {
             ajaxUtils.executeGetAction('/api/getGame/' + gameId,
                 (data) => {
                     this.setState({ currentGame:data });
                 },
                 (e) => console.error(e)
             );
             this.loadTeamsFromServer();
         }
    }

    loadTeamsFromServer(){
        const gameId = this.props.params.gameId;
        ajaxUtils.executeGetAction('/api/getTeamsForGame/' + gameId,
            (data) => {this.setState({ teams: data })},
            (e) => console.error(e)
        );
    }

    sendApplyOrUnapply(idTeam){
        const thisRef = this;
        const gameId = thisRef.props.params.gameId;
        ajaxUtils.executeGetAction('/api/addApproveGameForTeam/' + gameId + '/' + idTeam,
            (data) => thisRef.loadTeamsFromServer(),
            (e) => console.error(e)
        );
    }

    renderTeam(team){
        var buttonText = strings.approve;
        if(team.approved){
            buttonText = strings.delete_approve
        }
        return (
            <li key={team.id} className="list-group-item">
                {team.name}
                <Button onClick={ () => this.sendApplyOrUnapply(team.id) }> { buttonText } </Button>
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

