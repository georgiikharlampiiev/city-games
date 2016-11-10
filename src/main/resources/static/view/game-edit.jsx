import React from 'react';
import { Link } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GameEdit extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: [],
           currentUser: null,
           isUserGameEditor: false
       };
    }

    componentDidMount() {
        this.loadFromServer();
        $('.click2edit').summernote({focus: true});
    }

     loadFromServer() {
         const gameId = this.props.params.gameId;
         if(gameId != 0) {
             ajaxUtils.executeGetAction('/api/getGame/' + gameId,
                 (data) => {this.setState({ currentGame:data })},
                 (e) => console.error(e)
             );
         }
         ajaxUtils.executeGetAction('/api/getUserProfile',
             (data) => {this.setState({ currentUser: data })},
             (e) => console.error(e)
         );
         ajaxUtils.executeGetAction('/api/isUserGameEditor/' + gameId,
             (data) => {this.setState({ isUserGameEditor: data })},
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

    render() {
        return (
            <div>
                <div className="row">
                    
                    <div className="col-lg-12">
                        <div className="click2edit">click2edit</div>
                    </div>
                </div>
            </div>
        )
    }
}

