import React from 'react';
import { Link } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        create_new_game:"Create new game"
    },
    ru: {
        create_new_game:"Создать новую игру"
    },
    ua: {
        create_new_game:"Створити нову гру"
    }
});

export class Games extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           games: [],
           isUserGameEditor: false
       };
    }

    componentDidMount() {
        this.loadFromServer();
        this.checkIsUserGameEditor();
    }

    loadFromServer() {
        ajaxUtils.executeGetAction('/api/getGames',
            (data) => { this.setState({ games:data }) },
            (e) => console.error(e)
        );
    }

    checkIsUserGameEditor() {
        ajaxUtils.executeGetAction('/api/isUserGameEditor/0',
            (data) => {this.setState({ isUserGameEditor: data })},
            (e) => console.error(e)
        );
    }

    parseGame(game) {
        var image = "http://placehold.it/900x300";
        if(game.image) {
            image = game.image;
        }
        return (
            <div key={ game.name } className="row">
                <div className="col-md-9 portfolio-item">
                    <hr/>
                    <a href={ "#/game-view/" + game.id }>
                        <img className="img-responsive img-rounded fixedHeightImage" src={ image } alt=""/>
                    </a>
                    <h3>
                        <a href={ "#/game-view/" + game.id }>{ game.name }</a>
                    </h3>
                    <p>{ game.description }</p>
                </div>
                <hr/>
            </div>
        )
    }

    editButtonRender() {
        const isUserGameEditor = this.state.isUserGameEditor;
        if(isUserGameEditor) {
            return (<p><a href={ "#/game-edit/0" } type="button" className="btn btn-default img-rounded" >{strings.create_new_game}</a></p>);
        }else {
            return (<p></p>);
        }
    }

    render() {
        return (
            <div>
                { this.editButtonRender() }
                { this.state.games.map( this.parseGame ) }
            </div>
        )
    }
}

