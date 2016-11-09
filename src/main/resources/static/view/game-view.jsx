import React from 'react';
import { Link } from "react-router";
var executeGetAction =  require ('../utils/utils.jsx');

export class GameView extends React.Component {

    constructor(props) {
        super(props);
       this.state = {currentGame: []};
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         this.setState({
             currentGame:executeGetAction('/api/getGame/' + this.props.params.gameId)
         });
    }

    parseGame(game) {
        return (
            <div key={game.name} className="row">
                <div className="col-md-12 portfolio-item">
                    <a href="#">
                        <img className="img-responsive" src="http://placehold.it/700x400" alt=""/>
                    </a>
                    <h3>
                        <a href="#">{game.name}</a>
                    </h3>
                    <p>{game.description}</p>
                </div>
            </div>
        )
    }

    render() {
        const game = this.state.currentGame;
        return (
            <div>
                {/*{this.state.gameusers.map(this.parseGame)}*/}
                <div className="row">
                    
                    <div className="col-lg-8">
                        <p><span className="glyphicon glyphicon-time"></span> {game.dataStart} </p>
                        
                        <hr/>
                        
                        <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
                        
                        <hr/>
                        
                        <p className="lead">{game.name}</p>
                        <p>{game.description}</p>

                        <hr/>

                    </div>
                </div>
            </div>
        )
    }
}

