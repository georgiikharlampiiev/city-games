import React from 'react';
import { Link, browserHistory } from "react-router";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Button, Collapse } from 'react-bootstrap';
var DateTimeField = require('react-datetime');
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GameEdit extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: {},
           currentUser: null,
           isUserGameEditor: false,
           items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
           open: false
       };

       this.onInputChange = this.onInputChange.bind(this);
       this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
       this.onImageInputChange = this.onImageInputChange.bind(this);
       this.onSortEnd = this.onSortEnd.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
        // $('.click2edit').summernote({
        //     focus: true,
        //     toolbar: [
        //         ['style', ['bold', 'italic', 'underline', 'clear']],
        //         ['font', ['strikethrough', 'superscript', 'subscript']],
        //         ['fontsize', ['fontsize']],
        //         ['color', ['color']],
        //         ['para', ['ul', 'ol', 'paragraph']],
        //         ['height', ['height']]
        //     ]
        // });
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

    sendChangesOnServer(){
        var currentGame = this.state.currentGame;
        // currentGame['description'] = $('.click2edit').summernote('code');
        ajaxUtils.executePostAction(
            "/api/addGame",
            JSON.stringify(currentGame),
            (data) => {
                if(data.id != 0){
                    this.setState({currentGame: data},
                        () => {$('#success_message').show()});
                    browserHistory.push('#/game-edit/' + data.id);
                }
            },
            (e) => {console.info(e)}
        );
    }

    formatMillisecondsToDate(milliseconds) {
        if ( milliseconds ) {
            return moment(milliseconds).format("DD/MM/YYYY hh:mm");
        } else {
            return "";
        }
    }

    onInputChange(fieldName, e){
        var currentGame = this.state.currentGame;
        currentGame[fieldName] = e.target.value;
        this.setState(currentGame);
    }

    onDateInputChange(fieldName, e){
        var currentGame = this.state.currentGame;
        currentGame[fieldName] = e;
        this.setState(currentGame);
    }

    onImageInputChange(e){
        var thisRef = this;
        var currentGame = thisRef.state.currentGame;
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            currentGame['image']       = e.target.result;
            thisRef.setState(currentGame);
        };
        var files = e.target.files;
        fileReader.readAsDataURL(files[0]);
    }

    onSortEnd ({oldIndex, newIndex}) {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };

    changeQuestionField(name, index, e){
            // var currentGame = this.state.currentGame.qu;
            // currentGame[fieldName] = e.target.value;
            // this.setState(currentGame);
    }

    render() {
        return (
            <div>
                <form className="well form-horizontal" action=" " method="post"  id="contact_form" autoComplete="off">
                    <fieldset>

                        {/*<!-- Form Name -->*/}
                        <legend>Create/edit game</legend>

                        {/*<!-- Text input-->*/}
                        <div className="form-group">
                            <label className="col-md-3 control-label">Game image</label>
                            <div className="col-md-9 inputGroupContainer">
                                <div className="input-group">
                                    <img src={this.state.currentGame.image} className="img-responsive"/>
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
                        <div className="alert alert-success" role="alert" id="success_message">Success <i className="glyphicon glyphicon-thumbs-up"></i> All changes have been saved.</div>
                        {/*<!-- Error message -->*/}
                        <div className="alert alert-danger" role="alert" id="error_message">Error <i className="glyphicon glyphicon-warning-sign"></i> {this.state.errorMessage} </div>

                        {/*<!-- Button -->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <div className="btn btn-warning" onClick={this.sendChangesOnServer}>Send <span className="glyphicon glyphicon-send"></span></div>
                            </div>
                        </div>

                        <SortableList items={{items: this.state.currentGame.questions, owner: this}} onSortEnd={this.onSortEnd} pressDelay={200} />

                    </fieldset>
                </form>
            </div>
        )
    }
}


const SortableItem = SortableElement(({value}) =>{
    if(value){
       return (<li>
               <Button onClick={ ()=> value.owner.setState({ open: !value.owner.state.open })}>
                   click
               </Button>
               <Collapse in={value.owner.state.open}>
                   <div>

                           Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                           Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.

                   </div>
               </Collapse>
               {/*<!-- Form Name -->*/}
               {/*<a href={'#'+value.id} data-toggle="collapse"><legend>Create/edit game</legend></a>*/}
                   {/*<div id={value.id} className="collapse">*/}
                       {/*<fieldset>*/}
                            {/*/!*<!-- Text input-->*!/*/}
                            {/*<div className="form-group">*/}
                                {/*<label className="col-md-3 control-label">Game name</label>*/}
                                {/*<div className="col-md-9 inputGroupContainer">*/}
                                    {/*<div className="input-group">*/}
                                        {/*<input name="question_name" className="form-control"  type="text" value={value.name} />*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        {/*</fieldset>*/}
                   {/*</div>*/}
               </li>
       )}
    else {return (<li></li>)}
});

const SortableList = SortableContainer(({items}) => {
    if(items.items){
        return (
            <ul>
                {items.items.map((value, index) =>
                    <SortableItem key={`item-${index}`} index={index} value={{value: value, owner: items.owner} } />
                )}
            </ul>
        );
    }else {
        return (<ul></ul>)
    }
});
