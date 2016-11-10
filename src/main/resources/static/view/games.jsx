import React from 'react';
import { Link } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');

export class Games extends React.Component {

    constructor(props) {
       super(props);
       this.state = { gameUsers: [] };
    }

    componentDidMount() {
        this.loadFromServer();
    }

    loadFromServer() {
        ajaxUtils.executeGetAction('/api/getGames',
            (data) => { this.setState({ gameUsers:data })},
            (e) => console.error(e)
        );
    }

    parseGame(game) {
        var image = "http://placehold.it/900x300";
        if(game.image) {
            image = "data:image/png;base64," + game.image;
        }
        return (
            <div key={ game.name } className="row">
                <div className="col-md-12 portfolio-item">
                    <a href="#">
                        <img className="img-responsive" src={ image } alt=""/>
                    </a>
                    <h3>
                        <a href={ "#/game-view/" + game.id } >{ game.name }</a>
                    </h3>
                    <p>{ game.description }</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.state.gameUsers.map( this.parseGame ) }
            </div>
        )
    }
}

