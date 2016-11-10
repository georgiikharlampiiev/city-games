import React from 'react';
import { Link } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GameView extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: [],
           currentUser: null,
           isUserAppliedGame: false,
           isUserGameEditor: false
       };
       this.applyGame = this.applyGame.bind(this);
       this.deleteApplyGame = this.deleteApplyGame.bind(this);
       this.checkIsUserAppliedGame = this.checkIsUserAppliedGame.bind(this);
       this.checkIsUserGameEditor = this.checkIsUserGameEditor.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
        this.checkIsUserAppliedGame();
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
        var params = this.props.params;
        ajaxUtils.executeGetAction('/api/applyGameByCurrentUser/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame: data })},
            (e) => console.error(e)
        );
    }

    deleteApplyGame() {
        var params = this.props.params;
        ajaxUtils.executeGetAction('/api/deleteApplyGameByCurrentUser/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame: !data })},
            (e) => console.error(e)
        );
    }

    checkIsUserAppliedGame() {
        var params = this.props.params;
        ajaxUtils.executeGetAction('/api/isUserAppliedGame/' + params.gameId,
            (data) => {this.setState({ isUserAppliedGame: data })},
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

    checkIsUserGameEditor() {
        var params = this.props.params;
        ajaxUtils.executeGetAction('/api/isUserGameEditor/' + params.gameId,
            (data) => {this.setState({ isUserGameEditor: data })},
            (e) => console.error(e)
        );
    }

    joinGameButtonRender() {
        const user = this.state.currentUser;
        const isUserAppliedGame = this.state.isUserAppliedGame;
        const gameId = this.props.params.gameId;
        if(user && user.teamId){
            if(isUserAppliedGame) {
                return (<div>
                    <button type="button" className="btn btn-default" onClick={this.deleteApplyGame}>Delete game apply</button>
                    <a href={ "#/game-play/" + gameId } type="button" className="btn btn-default" >Open current game</a></div>
                )
            }else {
                return (<button type="button" className="btn btn-default" onClick={this.applyGame}>Join game</button>)
            }

        } else {
            return (<div className="alert alert-warning">
                You are not a team member! Only team members can enter the game. Please, join in team ore create you own.</div>)
        }
    }

    editButtonRender() {
        const isUserGameEditor = this.state.isUserGameEditor;
        const gameId = this.props.params.gameId;
        if(isUserGameEditor) {
            return (<p><a href={ "#/game-edit/" + gameId } type="button" className="btn btn-default" >Edit game</a></p>);
        }else {
            return (<p></p>);
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
                    
                    <div className="col-lg-12">
                        <p><span className="glyphicon glyphicon-time"></span> Start at { this.formatMillisecondsToDate(game.dataStart) } </p>
                        <p><span className="glyphicon glyphicon-time"></span> Finish at { this.formatMillisecondsToDate(game.dataStop) } </p>
                        { this.editButtonRender() }

                        <hr/>
                        
                        <img className="img-responsive" src={ image } alt=""/>
                        
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

