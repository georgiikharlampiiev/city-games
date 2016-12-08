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
           timer: null,
           counterHandler: null,
           counter: "",
           isFinished: false
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
        const counterHandler = setInterval(() => {
            const currentTime = new Date();
            if(currentTime.getTime() > that.props.dateFinish){
                that.setState({isFinished: true});
            }else {
                that.setState({
                    counter: (that.props.dateFinish - currentTime.getTime())
                });
            }
        } , 1000);
        this.setState({
            timer: intervalHandler,
            counterHandler: counterHandler
        })
    }

    componentWillUnmount() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            clearInterval(this.state.counterHandler);
            this.setState({
                timer: null,
                counterHandler: null
            });
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

    formatMillisecondsToCounter(milliseconds) {
        if ( milliseconds ) {
            const time = moment.duration(milliseconds);
            return time.days()+':'+time.hours()+':'+time.minutes()+':'+time.seconds();
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

    renderQuestions(currentQuestions){
        if(this.state.isFinished){
            return (<Link to={"/game-statistic/"+ this.props.gameId} className="btn btn-default " >Game is over click here for Statistic</Link>)
         }else {
            return (<div>{currentQuestions.map(this.mapQuestion)}</div>)
        }
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
                    <p><span className="glyphicon glyphicon-time"/> To end of the game: { this.formatMillisecondsToCounter(this.state.counter) } </p>
                    {this.renderQuestions(this.state.currentQuestions)}
                </div>

            </div>
        )
    }
}

