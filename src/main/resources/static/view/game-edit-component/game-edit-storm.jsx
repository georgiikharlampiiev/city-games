import React from 'react';
import { Link, browserHistory } from "react-router";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Button, Collapse } from 'react-bootstrap';
import ReactSummernote from 'react-summernote';
let DateTimeField = require('react-datetime');
let ajaxUtils =  require ('../../utils/utils.jsx');
let moment = require('moment');

import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        question_name:"Question name",
        description:"Description",
        game_image:"Game image",
        delete_question:"Delete Question",
        add_answer:"Add Answer",
        delete_answer:"Delete Answer"
    },
    ru: {
        question_name:"Question name",
        description:"Description",
        game_image:"Game image",
        delete_question:"Удалить задание",
        add_answer:"Add Answer",
        delete_answer:"Delete Answer"
    },
    ua: {
        question_name:"Question name",
        description:"Description",
        game_image:"Game image",
        delete_question:"Game image",
        add_answer:"Add Answer",
        delete_answer:"Delete Answer"
    }
});

export class GameEditStorm extends React.Component {

    constructor(props) {
       super(props);

       this.state = {
           currentGame: props.currentGame,
           currentUser: props.currentUser,
           isUserGameEditor: props.isUserGameEditor,
           open: [],
           openAnswer: []
       };

       this.onInputChange = this.onInputChange.bind(this);
       this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
       this.onImageInputChange = this.onImageInputChange.bind(this);
       this.onSortEnd = this.onSortEnd.bind(this);
       this.addQuestion = this.addQuestion.bind(this);
       this.removeQuestion = this.removeQuestion.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            this.setState({
                currentGame: nextProps.currentGame,
                currentUser: nextProps.currentUser,
                isUserGameEditor: nextProps.isUserGameEditor
            })
        }
    }

    sendChangesOnServer(){
        var currentGame = this.state.currentGame;
        currentGame.questions.forEach(this.setQuestionOrder);
        this.setState({currentGame});
        ajaxUtils.executePostAction(
            "/api/addGame",
            JSON.stringify(currentGame),
            (data) => {
                if(data.id != 0){
                    const tmpQuestions = data.questions;
                    data['questions'] = tmpQuestions.sort((a, b) => {return a.orderInGame-b.orderInGame});
                    this.setState({currentGame: data},
                        () => {$('#success_message').show()});
                    browserHistory.push('#/game-edit/' + data.id);
                }
            },
            (e) => {console.info(e)}
        );
    }

    addQuestion(){
        const currentGame = this.state.currentGame;
        var questions = [];
        if(!this.state.currentGame.questions) {
            questions.push({
                name: strings.question_name,
                description: strings.description,
                orderInGame: 0,
                score: 0,
                autoStartSeconds: 0,
                autoFinishSeconds: 0
            });
        }else {
            questions = this.state.currentGame.questions;
            questions.push({
                name: strings.question_name,
                description: strings.description,
                orderInGame: this.state.currentGame.questions.length,
                score: 0,
                autoStartSeconds: 0,
                autoFinishSeconds: 0});
        }

        currentGame['questions'] = questions;
        this.setState({currentGame});
    }

    setQuestionOrder(element, index, array) {
        element.orderInGame = index;
    }

    formatMillisecondsToDate(milliseconds) {
        if ( milliseconds ) {
            return moment(milliseconds).format("DD/MM/YYYY hh:mm");
        } else {
            return "";
        }
    }

    onInputChange(fieldName, e){
        const currentGame = this.state.currentGame;
        currentGame[fieldName] = e.target.value;
        this.setState(currentGame);
    }

    onDateInputChange(fieldName, e){
        const currentGame = this.state.currentGame;
        currentGame[fieldName] = e;
        this.setState(currentGame);
    }

    onImageInputChange(e){
        const thisRef = this;
        const currentGame = thisRef.state.currentGame;
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            currentGame['image']       = e.target.result;
            thisRef.setState(currentGame);
        };
        const files = e.target.files;
        fileReader.readAsDataURL(files[0]);
    }

    onSortEnd ({oldIndex, newIndex}) {
        const currentGame = this.state.currentGame;
        const currentGameQuestions = this.state.currentGame.questions;
        currentGame['questions'] = arrayMove(currentGameQuestions, oldIndex, newIndex);
        this.setState({ currentGame });
        console.info("currentGame", this.state.currentGame);
    }

    removeQuestion (index) {
        const currentGame = this.state.currentGame;
        const currentGameQuestions = this.state.currentGame.questions;
        currentGame['questions'] = currentGameQuestions.slice(index);
        this.setState({ currentGame });
        console.info("currentGame", this.state.currentGame);
    }

    render() {
        return (
            <div>
                {/*<!-- Form Name -->*/}
                <legend>Create/edit game type storm</legend>

                {/*<!-- Text input-->*/}
                <div className="form-group">
                    <label className="col-md-3 control-label">{strings.game_image}</label>
                    <div className="col-md-9 inputGroupContainer">
                        <div className="input-group">
                            <img src={this.state.currentGame.image} className="img-responsive fixedHeightImage img-rounded"/>
                            <input id="imageinput" name="file_name" className="form-control" type="file" onChange={this.onImageInputChange}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-3 control-label">Game name</label>
                    <div className="col-md-9 inputGroupContainer">
                        <div className="input-group">
                            <input name="first_name" className="form-control"  type="text" value={this.state.currentGame.name} onChange={this.onInputChange.bind(this, "name")}/>
                        </div>
                    </div>
                </div>

                {/*<!-- Text input-->*/}
                <div className="form-group">
                    <label className="col-md-3 control-label">Description</label>
                    <div className="col-md-9 inputGroupContainer">
                        <textarea className="form-control" rows="9" value={this.state.currentGame.description} onChange={this.onInputChange.bind(this, "description")}/>
                    </div>
                </div>

                {/*<!-- Text input-->*/}
                <div className="form-group">
                    <label className="col-md-3 control-label">Start time</label>
                    <div className="col-md-9 inputGroupContainer">
                        <DateTimeField value={this.state.currentGame.dateStart} onChange={this.onDateInputChange.bind(this, "dateStart")} dateFormat="DD/MM/YYY" timeFormat="HH:mm:ss"/>
                    </div>
                </div>

                {/*<!-- Text input-->*/}
                <div className="form-group">
                    <label className="col-md-3 control-label">Finish time</label>
                    <div className="col-md-9 inputGroupContainer">
                        <DateTimeField value={this.state.currentGame.dateFinish} onChange={this.onDateInputChange.bind(this, "dateFinish")} dateFormat="DD/MM/YYY" timeFormat="HH:mm:ss"/>
                    </div>
                </div>


                {/*<!-- Success message -->*/}
                <div className="alert alert-success" role="alert" id="success_message">Success <i className="glyphicon glyphicon-thumbs-up" /> All changes have been saved.</div>
                {/*<!-- Error message -->*/}
                <div className="alert alert-danger" role="alert" id="error_message">Error <i className="glyphicon glyphicon-warning-sign" /> {this.state.errorMessage} </div>

                {/*<!-- Button -->*/}
                <div className="form-group">
                    {/*<label className="col-md-4 control-label"></label>*/}
                    <div className="col-md-4">
                        <div className="btn btn-warning" onClick={this.sendChangesOnServer}>Send <span className="glyphicon glyphicon-send" /></div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-3 control-label">Questions</label>
                    <div className="col-md-9 inputGroupContainer">
                        <SortableList items={{items: this.state.currentGame.questions, owner: this}} onSortEnd={this.onSortEnd} pressDelay={200} />
                    </div>
                </div>

                <div className="form-group">
                    {/*<label className="col-md-4 control-label"></label>*/}
                    <div className="col-md-4">
                        <div className="btn btn-success" onClick={this.addQuestion}>Add question <span className="glyphicon glyphicon-plus" /></div>
                    </div>
                </div>

            </div>
        )
    }
}


var AnswerListItem  = ({value, index, parent}) =>{

    if(value){
        return (<li className="list-group-item">

            <Button onClick={ ()=> {
                console.info("index ", index);
                console.info("parrentIndex ", parent.index);
                const openAnswer = parent.owner.state.openAnswer;
                openAnswer[parent.index +'+'+ index] = !parent.owner.state.openAnswer[parent.index +'+'+ index];
                parent.owner.setState({ openAnswer: openAnswer })
            }}>
                {value.name}
            </Button>

            <Collapse in={ parent.owner.state.openAnswer[parent.index +'+'+ index] }>
                <div>
                    <fieldset>
                        {/*<!-- Text input-->*/}
                        <div className="form-group">
                            <label className="col-md-2 control-label">Game name</label>
                            <div className="col-md-10 inputGroupContainer">
                                <div className="input-group">
                                    <input name={ "question_name"+value.index } className="form-control"  type="text"
                                           value={ value.name }
                                           onChange={() => {} } />
                                </div>
                            </div>
                        </div>


                        <Button onClick={ ()=> {
                        }}>
                            {strings.delete_answer}
                        </Button>
                    </fieldset>

                </div>
            </Collapse>
        </li>)}
    else {return (<li></li>)}
};

var SortableQuestion = SortableElement(({value}) =>{

    function changeQuestionField(index, name, e){
        // console.info("name", name)
        // console.info("index", index)
        // console.info("e", e)
        // console.info("e.target.value", e.target.value)
        if(name == "description"){
            value.item[name] = e;
        }else {
            value.item[name] = e.target.value;
        }

        const currentGame = value.owner.state.currentGame;
        const questions = value.owner.state.currentGame.questions;
        questions[index] = value.item;
        currentGame['questions'] = questions;
        value.owner.setState({ currentGame });
        console.info("currentGame", value.owner.state.currentGame);
    };

    if(value){
       return (<li className="list-group-item">

                   <Button onClick={ ()=> {
                       const open = value.owner.state.open;
                       open[value.index] = !value.owner.state.open[value.index];
                       value.owner.setState({ open: open })}}>
                        {value.item.name}
                   </Button>

                   <Collapse in={ value.owner.state.open[value.index] }>
                       <div>
                           <fieldset>
                               {/*<!-- Text input-->*/}
                               <div className="form-group">
                                   <label className="col-md-2 control-label">Game name</label>
                                   <div className="col-md-10 inputGroupContainer">
                                       <div className="input-group">
                                            <input name={ "question_name"+value.index } className="form-control"  type="text"
                                                   value={ value.item.name }
                                                   onChange={ changeQuestionField.bind(this, value.index, "name") } />
                                       </div>
                                   </div>
                               </div>

                               <div className="form-group">
                                   <label className="col-md-2 control-label">Score</label>
                                   <div className="col-md-10 inputGroupContainer">
                                       <div className="input-group">
                                           <input name={ "score"+value.index } className="form-control"  type="text"
                                                  value={ value.item.score }
                                                  onChange={ changeQuestionField.bind(this, value.index, "score") } />
                                       </div>
                                   </div>
                               </div>

                               <div className="form-group">
                                   <label className="col-md-2 control-label">Auto Start Seconds</label>
                                   <div className="col-md-10 inputGroupContainer">
                                       <div className="input-group">
                                           <input name={ "autoStartSeconds"+value.index } className="form-control"  type="text"
                                                  value={ value.item.autoStartSeconds }
                                                  onChange={ changeQuestionField.bind(this, value.index, "autoStartSeconds") } />
                                       </div>
                                   </div>
                               </div>

                               <div className="form-group">
                                   <label className="col-md-2 control-label">Auto Finish Seconds</label>
                                   <div className="col-md-10 inputGroupContainer">
                                       <div className="input-group">
                                           <input name={ "autoFinishSeconds"+value.index } className="form-control"  type="text"
                                                  value={ value.item.autoFinishSeconds }
                                                  onChange={ changeQuestionField.bind(this, value.index, "autoFinishSeconds") } />
                                       </div>
                                   </div>
                               </div>

                               <div className="form-group">
                                   <label className="col-md-2 control-label">Description</label>
                                   <div className="col-md-10 inputGroupContainer">
                                       <div className="input-group">
                                           <ReactSummernote
                                               value={value.item.description}
                                               options={{
                                                   lang: 'ru-RU',
                                                   height: 350,
                                                   dialogsInBody: true,
                                                   toolbar: [
                                                       ['style', ['style']],
                                                       ['font', ['bold', 'underline', 'clear']],
                                                       ['fontname', ['fontname']],
                                                       ['para', ['ul', 'ol', 'paragraph']],
                                                       ['table', ['table']],
                                                       ['insert', ['link', 'picture', 'video']],
                                                       ['view', ['fullscreen', 'codeview']]
                                                   ],
                                                   codemirror: {
                                                       htmlMode: true,
                                                       lineNumbers: true,
                                                       mode: 'text/html'
                                                   }
                                               }}
                                               onChange={ changeQuestionField.bind(this, value.index, "description") }
                                           />

                                       </div>
                                   </div>
                               </div>
                               <div className="form-group">
                                   <label className="col-md-2 control-label">Answers</label>
                                   <div className="col-md-10 inputGroupContainer">
                                       <div className="input-group">
                                           <ul>
                                                {value.item.answers.map((ans, index) => {return(<AnswerListItem key={ans.id} value={ans} parent={value} index={index} />)})}
                                            </ul>
                                       </div>

                                       <Button onClick={ ()=> {}}>
                                           {strings.add_answer}
                                       </Button>

                                   </div>
                               </div>



                               <Button onClick={ ()=> {
                                   const currentGame = value.owner.state.currentGame;
                                   const currentGameQuestions = value.owner.state.currentGame.questions;
                                   currentGameQuestions.splice(value.index, 1);
                                   currentGame['questions'] = currentGameQuestions;
                                   value.owner.setState({ currentGame });
                               }}>
                                   {strings.delete_question}
                               </Button>
                           </fieldset>

                       </div>
                   </Collapse>
               </li>
       )}
    else {return (<li></li>)}
});

const SortableList = SortableContainer(({items}) => {
    if(items.items){
        return (
            <ul>
                {items.items.map((value, index) =>
                    <SortableQuestion key={`item-${index}`} index={index} value={ {item: value, owner: items.owner, index: index} } />
                )}
            </ul>
        );
    }else {
        return (<ul></ul>)
    }
});
