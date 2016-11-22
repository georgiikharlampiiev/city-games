import React from 'react';
import { Link } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GamePlay extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentQuestions: []
       };
       this.applyAnswer = this.applyAnswer.bind(this);
       this.mapQuestion = this.mapQuestion.bind(this);
       this.mapDescription = this.mapDescription.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         ajaxUtils.executeGetAction('/api/getQuestionsForCurrentGame/' + this.props.params.gameId,
             (data) => {this.setState({currentQuestions:data})},
             (e) => console.error(e)
         );
    }

    applyAnswer() {
        console.info("Apply answer stub")
    }

    formatMillisecondsToDate(milliseconds) {
        if ( milliseconds ) {
            return moment(milliseconds).format("DD/MM/YYYY hh:mm");
        } else {
            return "";
        }
    }

    mapQuestion(question){
        return (
            <div key={`question-view-${question.orderInGame}`}>
            {/*<!-- Question -->*/}
                <p className="lead">
                    {question.name}
                </p>
                <hr/>

                    <div dangerouslySetInnerHTML={this.mapDescription(question.description)} />

                <hr/>
            </div>
        )
    }

    mapDescription(description){
        return (
            {__html: description}
        )
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-8">

                        {this.state.currentQuestions.map(this.mapQuestion)}

                    </div>
                </div>
            </div>
        )
    }
}

