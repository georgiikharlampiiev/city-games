import React from 'react';
import { Link } from "react-router";

export class Games extends React.Component {

    constructor(props) {
        super(props);
      //  this.state = {gameusers: []};
    }

    componentDidMount() {
    }
    //  loadFromServer(pageSize) {
    //     follow(client, root, [
    //         {rel: 'gameusers', params: {size: pageSize}}]
    //     ).then(gameusersCollection => {
    //         return client({
    //             method: 'GET',
    //             path: gameusersCollection.entity._links.profile.href,
    //             headers: {'Accept': 'application/schema+json'}
    //         }).then(schema => {
    //             this.schema = schema.entity;
    //             this.links = employeeCollection.entity._links;
    //             return gameusersCollection;
    //         });
    //     }).then(gameusersCollection => {
    //         this.page = gameusersCollection.entity.page;
    //         return gameusersCollection.entity._embedded.employees.map(gameuser =>
    //             client({
    //                 method: 'GET',
    //                 path: gameuser._links.self.href
    //             })
    //         );
    //     }).done(gameusers => {
    //         this.setState({
    //             page: this.page,
    //             employees: gameusers,
    //             attributes: Object.keys(this.schema.properties),
    //             pageSize: pageSize,
    //             links: this.links
    //         });
    //     });
    // }

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
                    {this.state.gameusers.gameuser.entity.name}
                </td>
                <td>
                    Game Admin 
                </td>
            </tr>
        )
    }
}