import React from 'react';
import { Link } from "react-router";

export class Games extends React.Component {

    constructor(props) {
        super(props);
        //this.state = {employees: ['Roma','Shora','Goring']};
    }

    componentDidMount() {
    }
    // loadFromServer(pageSize) {
    //     follow(client, root, [
    //         {rel: 'employees', params: {size: pageSize}}]
    //     ).then(employeeCollection => {
    //         return client({
    //             method: 'GET',
    //             path: employeeCollection.entity._links.profile.href,
    //             headers: {'Accept': 'application/schema+json'}
    //         }).then(schema => {
    //             this.schema = schema.entity;
    //             this.links = employeeCollection.entity._links;
    //             return employeeCollection;
    //         });
    //     }).then(employeeCollection => {
    //         this.page = employeeCollection.entity.page;
    //         return employeeCollection.entity._embedded.employees.map(employee =>
    //             client({
    //                 method: 'GET',
    //                 path: employee._links.self.href
    //             })
    //         );
    //     }).done(employees => {
    //         this.setState({
    //             page: this.page,
    //             employees: employees,
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
                </td>
                <td>
                    Game Admin 
                </td>
            </tr>
        )
    }
}