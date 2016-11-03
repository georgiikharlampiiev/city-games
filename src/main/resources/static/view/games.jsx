import React from 'react';
import { Link } from "react-router";

const follow = require('../follow');
const when = require('when');
const client = require('../client');
const root = '/api';
const $ = require ('jquery')

export class Games extends React.Component {

    constructor(props) {
        super(props);
       this.state = {gameusers: []};
    }

    componentDidMount() {
        this.loadFromServer(1);
    }

     loadFromServer(pageSize) {
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
             url: '/allapi/getGames',
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

    render() {
        return (
            <tr>
                <td>Name</td>
                <td>Discription</td>
                <td>DataStart</td>
                <td>DataFinish</td>
                <td>
                    /**
                    * Creat class team 
                    */
                    Team
                    {this.state.gameusers}
                </td>
                <td>
                    Game Admin 
                </td>
            </tr>
        )
    }
}