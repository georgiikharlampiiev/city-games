import React from 'react';
import { Link } from "react-router";
let ajaxUtils =  require ('../utils/utils.jsx');
const moment = require('moment');

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        start_at:"Start at",
        finish_at:"Start at",
        edit_game:"Edit game",
        teams_in_game:"Teams in game",
        you_are_not_a_team_member:"You are not a team member! Only team members can enter the game. Please, join in team ore create you own.",
        join_game:"Join game",
        open_current_game:"Open current game",
        delete_game_apply:"Delete game apply"
    },
    ru: {
        start_at:"Начало в",
        finish_at:"Окончание в",
        edit_game:"Редактировать игру",
        teams_in_game:"Команды в игре",
        you_are_not_a_team_member:"Вы не являетесь членом команды! Только члены команды могут принимать игры. Пожалуйста, вступите в команду или создайте свою",
        join_game:"Подать заявку в игру",
        open_current_game:"Открыть игру",
        delete_game_apply:"Отклонить заявку в игру"
    },
    ua: {
        start_at:"Початок о",
        finish_at:"Закiнчуэться о",
        edit_game:"Редагувати гру",
        teams_in_game:"Команды в игре",
        you_are_not_a_team_member:"Ви не член команди.",
        join_game:"Подати заявку в игру",
        open_current_game:"Вiдкрити гру",
        delete_game_apply:"Покинути гру"
    }
});


export class GameView extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: [],
           currentUser: null,
           isUserAppliedGame: false,
           isUserApprovedGame: false,
           isUserGameEditor: false
       };
       this.applyGame = this.applyGame.bind(this);
       this.deleteApplyGame = this.deleteApplyGame.bind(this);
       this.checkIsUserAppliedGame = this.checkIsUserAppliedGame.bind(this);
       this.checkIsUserApprovedForGame = this.checkIsUserApprovedForGame.bind(this);
       this.checkIsUserGameEditor = this.checkIsUserGameEditor.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
        this.checkIsUserAppliedGame();
        this.checkIsUserApprovedForGame();
        this.checkIsUserGameEditor();
    }

     loadFromServer() {
         ajaxUtils.executeGetAction('/api/getGame/' + this.props.params.gameId,
             (data) => {this.setState({ currentGame:data })},
             (e) => console.error(e)
         );
         ajaxUtils.executeGetAction('/api/getUserProfile',
             (data) => {this.setState({ currentUser: data })},
             (e) => console.error(e)
         );
    }

    applyGame() {
        const params = this.props.params;
        ajaxUtils.executeGetAction('/api/applyGameByCurrentUser/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame: data })},
            (e) => console.error(e)
        );
    }

    deleteApplyGame() {
        let params = this.props.params;
        ajaxUtils.executeGetAction('/api/deleteApplyGameByCurrentUser/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame: !data })},
            (e) => console.error(e)
        );
    }

    checkIsUserAppliedGame() {
        let params = this.props.params;
        ajaxUtils.executeGetAction('/api/isUserAppliedGame/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame: data })},
            (e) => console.error(e)
        );
    }

    checkIsUserApprovedForGame() {
        let params = this.props.params;
        ajaxUtils.executeGetAction('/api/isUserApprovedForGame/' + params.gameId,
            (data) => {this.setState({ isUserApprovedGame: data })},
            (e) => console.error(e)
        );
    }

    static formatMillisecondsToDate(milliseconds) {
        if ( milliseconds ) {
            return moment(milliseconds).format("DD/MM/YYYY hh:mm");
        } else {
            return "";
        }
    }

    checkIsUserGameEditor() {
        const params = this.props.params;
        ajaxUtils.executeGetAction('/api/isUserGameEditor/' + params.gameId,
            (data) => {this.setState({ isUserGameEditor: data })},
            (e) => console.error(e)
        );
    }

    joinGameButtonRender() {
        const user = this.state.currentUser;
        const isUserAppliedGame = this.state.isUserAppliedGame;
        const isUserApprovedGame = this.state.isUserApprovedGame;
        const gameId = this.props.params.gameId;
        if(user && user.teamId){
            if(isUserAppliedGame && isUserApprovedGame) {
                return (
                    <div>
                        <button type="button" className="btn btn-default" onClick={this.deleteApplyGame}>{strings.delete_game_apply}</button>
                        <a href={ "#/game-play/" + gameId } type="button" className="btn btn-default " >{strings.open_current_game}</a>
                    </div>
                )
            }if(isUserAppliedGame && !isUserApprovedGame) {
                return (<button type="button" className="btn btn-default" onClick={this.deleteApplyGame}>{strings.delete_game_apply}</button> )
            }
            else {
                return (<button type="button" className="btn btn-default" onClick={this.applyGame}>{strings.join_game}</button>)
            }

        } else {
            return (<div className="alert alert-warning">
                {strings.you_are_not_a_team_member}</div>)
        }
    }

    editButtonRender() {
        const isUserGameEditor = this.state.isUserGameEditor;
        const gameId = this.props.params.gameId;
        if(isUserGameEditor) {
            return (
                <p>
                    <a href={ "#/game-edit/" + gameId } type="button" className="btn btn-default" >{strings.edit_game}</a>
                    <a href={ "#/game-teams/" + gameId } type="button" className="btn btn-default" >{strings.teams_in_game}</a>
                </p>);
        }else {
            return (<p></p>);
        }


    }

    render() {
        const game = this.state.currentGame;
        var image = "http://placehold.it/900x300";
        if(game.image) {
            image = game.image;
        }
        return (
            <div>
                <div className="row">
                    
                    <div className="col-md-9">
                        <p><span className="glyphicon glyphicon-time"/> {strings.start_at} { GameView.formatMillisecondsToDate(game.dateStart) } </p>
                        <p><span className="glyphicon glyphicon-time"/> {strings.finish_at} { GameView.formatMillisecondsToDate(game.dateFinish) } </p>
                        { this.editButtonRender() }

                        <hr/>
                        
                        <img className="img-responsive fixedHeightImage img-rounded" src={ image } alt=""/>
                        
                        <hr/>
                        
                        <p className="lead"> { game.name }</p>
                        <p>{ game.description }</p>
                        { this.joinGameButtonRender() }
                        <hr/>

                    </div>
                </div>
            </div>
        )
    }
}

