import React from 'react';
import { Link } from "react-router";
var executeGetAction =  require ('../utils/utils.jsx');

export class GameView extends React.Component {

    constructor(props) {
        super(props);
       this.state = {gameusers: []};
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         console.info("this.props.params.gameId ", this.props.params.gameId)
         this.setState({gameusers:executeGetAction('/api/getGames')})
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
        return (
            <div>
                {/*{this.state.gameusers.map(this.parseGame)}*/}
                <div className="row">
                    
                    <div className="col-lg-8">
                        <p><span className="glyphicon glyphicon-time"></span> Posted on August 24, 2013 at 9:00 PM</p>
                        
                        <hr/>
                        
                        <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
                        
                        <hr/>
                        
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>

                        <hr/>

                    </div>
                </div>
            </div>
        )
    }
}

