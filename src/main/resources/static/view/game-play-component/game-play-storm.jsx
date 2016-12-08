import React from 'react';
import { Link } from "react-router";
const ajaxUtils = require('../../utils/utils.jsx');
const moment = require('moment');
const $ = require ('jquery');

export class GamePlayStorm extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentQuestions: [],
           gameId: 0,
           inputAnswer: "",
           cameBackAnswer:"",
           timer: null
       };
       this.applyAnswer = this.applyAnswer.bind(this);
       this.loadFromServer = this.loadFromServer.bind(this);
       this.onChangeAnswer = this.onChangeAnswer.bind(this);
       this.mapQuestion = this.mapQuestion.bind(this);
       this.mapDescription = this.mapDescription.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            this.setState({
                gameId: nextProps.gameId
            })
        }
    }

    componentDidMount() {
        this.loadFromServer();
        const that = this;
        const intervalHandler = setInterval(that.loadFromServer.bind(that), 10000);
        this.setState({
            timer: intervalHandler
        })
    }

    componentWillUnmount() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({timer: null});
        }
    }
     loadFromServer() {
         ajaxUtils.executeGetAction('/api/getQuestionsForCurrentGameStorm/' + this.props.gameId,
             (data) => {this.setState({ currentQuestions:data })},
             (e) => console.error(e),
             false
         );
    }

    applyAnswer() {
        console.info("inputAnswer ", this.state.inputAnswer);
        const answer = {
            id: 0,
            answer: this.state.inputAnswer,
            gameId: this.props.gameId,
            teamId:0,
            correct: false
        };

        ajaxUtils.executePostAction("/api/addAnswer",
            JSON.stringify(answer),
            (answer) => {
                this.setState({
                    cameBackAnswer: answer.answer,
                    inputAnswer: ""
                });
                if(answer.correct){
                    $('.text-success').removeClass('hidden');
                    $('.text-danger').addClass('hidden');
                }else {
                    $('.text-danger').removeClass('hidden');
                    $('.text-success').addClass('hidden');
                }
                this.loadFromServer();
            },
            (e) => {
                console.info("come back e ", e);
            }
        )
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
                <div dangerouslySetInnerHTML={this.mapDescription(question)} />
                <p>Your answers: </p>
                <u>
                    { question.answers.map((a) => <li key={a.id}>{a.name}</li>) }
                </u>
                <hr/>
            </div>
        )
    }

    mapDescription(question){
        if(question.answers.filter( (a) => a.name == "***").length > 0){
            return (
                {__html: question.description}
            )
        }else {
            <div></div>
        }
    }

    onChangeAnswer(e){
        this.setState({inputAnswer: e.target.value});
    }

    render() {
        return (
            <div>

                <fieldset>
                    <div className="col-lg-6 affix" style={{ backgroundColor : "#fff"}}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Answer here..." onChange={this.onChangeAnswer.bind(this)}/>
                            <span className="input-group-btn">
                                <button className="btn btn-secondary" type="button" onClick={this.applyAnswer.bind(this)}>Send answer!</button>
                            </span>
                        </div>
                        <p className="text-success hidden">Correct answer : {this.state.cameBackAnswer}</p>
                        <p className="text-danger hidden">Incorrect answer : {this.state.cameBackAnswer}</p>
                    </div>
                </fieldset>

                <div style={{marginTop : "70px"}}>
                    {this.state.currentQuestions.map(this.mapQuestion)}
                </div>

            </div>
        )
    }
}

