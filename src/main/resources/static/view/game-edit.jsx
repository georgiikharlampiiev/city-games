import React from 'react';
import { Link, browserHistory } from "react-router";
var ajaxUtils =  require ('../utils/utils.jsx');
var moment = require('moment');

export class GameEdit extends React.Component {

    constructor(props) {
       super(props);
       this.state = {
           currentGame: {},
           currentUser: null,
           isUserGameEditor: false
       };

       this.onGameNameInputChange = this.onGameNameInputChange.bind(this);
       this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
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
        if(this.props.params.gameId == 0){
            currentGame['dataStart'] = new Date();
            currentGame['dataFinish'] = new Date();
            currentGame['teams'] = [];
            currentGame['gameAdmins'] = [];
            currentGame['image'] = "";
        }
        // console.info("currentGame ", currentGame)
        ajaxUtils.executePostAction(
            "/api/addGame",
            JSON.stringify(currentGame),
            (data) => {
                if(data.id != 0){
                    this.setState({currentGame: data});
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

    onGameNameInputChange(fieldName, e){
        var currentGame = this.state.currentGame;
        currentGame[fieldName] = e.target.value;
        this.setState(currentGame);
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
                            <label className="col-md-4 control-label">Game name</label>
                            <div className="col-md-8 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input name="first_name" className="form-control"  type="text" value={this.state.currentGame.name} onChange={this.onGameNameInputChange.bind(this, "name")}/>
                                </div>
                            </div>
                        </div>


                        {/*<!-- Text input-->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label">Description</label>
                            <div className="col-md-8 inputGroupContainer">
                                <textarea className="form-control" rows="9" id="description" value={this.state.currentGame.description} onChange={this.onGameNameInputChange.bind(this, "description")}></textarea>
                            </div>
                        </div>


                        {/*<!-- Text input-->*/}

                        {/*<div className="form-group">*/}
                        {/*<label className="col-md-4 control-label">Phone #</label>*/}
                        {/*<div className="col-md-4 inputGroupContainer">*/}
                        {/*<div className="input-group">*/}
                        {/*<span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>*/}
                        {/*<input name="phone" placeholder="(845)555-1212" className="form-control" type="text" autoComplete="false" />*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        {/*<!-- Text input-->*/}


                        {/*<!-- Text input-->*/}

                        {/*<div className="form-group">*/}
                        {/*<label className="col-md-4 control-label">City</label>*/}
                        {/*<div className="col-md-4 inputGroupContainer">*/}
                        {/*<div className="input-group">*/}
                        {/*<span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>*/}
                        {/*<input name="city" placeholder="city" className="form-control"  type="text"/>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        {/*<!-- Select Basic -->*/}

                        {/*<div className="form-group">*/}
                        {/*<label className="col-md-4 control-label">State</label>*/}
                        {/*<div className="col-md-4 selectContainer">*/}
                        {/*<div className="input-group">*/}
                        {/*<span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>*/}
                        {/*<select name="state" className="form-control selectpicker" >*/}
                        {/*<option value=" " >Please select your state</option>*/}
                        {/*<option>Virginia</option>*/}
                        {/*<option >Washington</option>*/}
                        {/*<option >West Virginia</option>*/}
                        {/*<option>Wisconsin</option>*/}
                        {/*<option >Wyoming</option>*/}
                        {/*</select>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        {/*<!-- Success message -->*/}
                        <div className="alert alert-success" role="alert" id="success_message">Success <i className="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>
                        <div className="alert alert-danger" role="alert" id="error_message">Error <i className="glyphicon glyphicon-warning-sign"></i> {this.state.errorMessage} </div>

                        {/*<!-- Button -->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <div className="btn btn-warning" onClick={this.sendChangesOnServer}>Send <span className="glyphicon glyphicon-send"></span></div>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </div>
        )
    }
}

