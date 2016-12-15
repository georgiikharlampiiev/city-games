import React from 'react';
import { Link, browserHistory } from "react-router";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
var DateTimeField = require('react-datetime');
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class TeamEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
    }

    render() {
        return (
            <div>

                Team edit

            </div>
        )
    }

};
