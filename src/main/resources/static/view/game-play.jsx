import React from 'react';
import { Link } from "react-router";
const ajaxUtils = require('../utils/utils.jsx');
const moment = require('moment');

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
                        <fieldset>
                            <div className="col-lg-6 affix">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Answer here..."/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-secondary" type="button">Send answer!</button>
                                    </span>
                                </div>
                            </div>
                        </fieldset>

                        <div style={{marginTop : "70px"}}>
                            {this.state.currentQuestions.map(this.mapQuestion)}
                        </div>

                    </div>



                </div>


            </div>
        )
    }
}

