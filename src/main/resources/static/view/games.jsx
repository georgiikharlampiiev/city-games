import React from 'react';
import { Link } from "react-router";
const $ = require ('jquery')

export class Games extends React.Component {

    constructor(props) {
        super(props);
       this.state = {gameusers: []};
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
        // follow(client, root, [
        //     {rel: 'getGames', params: {size: pageSize}}]
        // ).then(gameusersCollection => {
        //     return client({
        //         method: 'GET',
        //         path: gameusersCollection.entity._links.profile.href,
        //         headers: {'Accept': 'application/schema+json'}
        //     }).then(schema => {
        //         this.schema = schema.entity;
        //         this.links = employeeCollection.entity._links;
        //         return gameusersCollection;
        //     });
        // }).then(gameusersCollection => {
        //     this.page = gameusersCollection.entity.page;
        //     return gameusersCollection.entity._embedded.employees.map(gameuser =>
        //         client({
        //             method: 'GET',
        //             path: gameuser._links.self.href
        //         })
        //     );
        // }).done(gameusers => {
        //     this.setState({
        //         page: this.page,
        //         employees: gameusers,
        //         attributes: Object.keys(this.schema.properties),
        //         pageSize: pageSize,
        //         links: this.links
        //     });
        // });

         $.ajax({
             url: '/api/getGames',
             dataType: 'json',
             success: function (data) {
                 console.info(data);
                 this.setState({gameusers: data});
             }.bind(this),
             error: function (xhr, status, err) {
                 console.error(this.props.url, status, err.toString());
             }.bind(this)
         });
         console.info(this.state.gameusers)
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
                {this.state.gameusers.map(this.parseGame)}
            </div>
        )
    }
}

