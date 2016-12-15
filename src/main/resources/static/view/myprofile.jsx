import React from 'react';
import { Link } from "react-router";
var ajaxUtils = require ('../utils/utils.jsx');

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        name_login:"Name/Login",
        new_password:"New Password",
        my_profile:"My Profile",
        save_changes:"Save Changes",
        success:"Success",
        error:"Error",
        success_message: "All changes have been saved.",
        my_team:"My team",
        teams:"Choose the team",
        team:"Team name",
        send_request_to_team:"Send request to team"
    },
    ru: {
        name_login:"Имя/Логин",
        new_password:"Новый пароль",
        my_profile:"Мой профиль",
        save_changes:"Сохранить изменения",
        success:"Успешно",
        error:"Ошибка",
        success_message: "Все изменения сохранены.",
        my_team:"Моя команда",
        teams:"Выбор команды",
        team:"Имя команды",
        send_request_to_team:"Отправить заявку в команду",
        approve:"Approve",
        delete_approve:"Delete approve"
    },
    ua: {
        name_login:"Ім'я/Логін",
        new_password:"Новий пароль",
        my_profile:"Мiй профіль",
        save_changes:"Зберегти змiни",
        success:"Успiшно",
        error:"Помилка",
        success_message: "Всi змiни збережено.",
        my_team:"Моя команда",
        teams:"Choose the team",
        team:"Team name",
        send_request_to_team:"Send request to team"
    }
});

export class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: [],
            errorMessage: "",
            teams: [],
            team: "",
            teamUsers: []
        };
        this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
        this.sendRequestToTeamOnServer = this.sendRequestToTeamOnServer.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.renderTeamMembers = this.renderTeamMembers.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         ajaxUtils.executeGetAction('/api/getUserProfile',
             (data) => {this.setState({ currentUser:data })},
             (e) => console.error(e)
         );
         ajaxUtils.executeGetAction('/api/getAllTeams',
             (data) => {this.setState({teams:data})},
             (e) => console.error(e)
         );
         ajaxUtils.executeGetAction('/api/getTeam',
             (data) => {this.setState({team:data})},
             (e) => console.error(e)
         );
    }

    onFieldChange(fieldName, e){
        const currentUser = this.state.currentUser;
        currentUser[fieldName] = e.target.value;
        this.setState( currentUser );
    }

    sendChangesOnServer() {
        const currentUser = this.state.currentUser;
        var errorMessage = "";
        if( currentUser.name.length < 3 ){
            errorMessage = "Your name is to short. Should be more 3 symbols.";
        }else if( currentUser.password.length < 6 && currentUser.password != ""){
            errorMessage = "Your password is to short. Should be more 6 symbols.";
        }else {
            errorMessage = "";
        }

        if( errorMessage != ""){
            this.setState({
                    errorMessage: errorMessage},
                    () => {$('#error_message').show()}
                );
        }else {
            $('#error_message').hide();

            ajaxUtils.executePostAction("/api/setUserProfile",
                JSON.stringify(currentUser),
                (currentUser) => {
                    this.setState(
                        {currentUser: currentUser},
                        () => {$('#success_message').show()}
                    );
                },
                (e) => {
                    this.setState(
                        {errorMessage: e},
                        () => {$('#error_message').show()}
                    );
                }
            )
        }
    }

    changeTeam(e){
        console.info("changeTeam ", e.target.value)
        this.setState({team:e.target.value});
        console.info("team ", this.state.team)
    }

    renderTeamMembers(){
        var buttonText = strings.approve;
        if(team.approved){
            buttonText = strings.delete_approve
        }
        return (
            <li key={team.id} className="list-group-item">
                {team.name}
                <Button onClick={ () => this.sendApplyOrUnapply(team.id) }> { buttonText } </Button>
            </li>
        )
    }


    generateMyTeamGroup() {
        var currentUser = this.state.currentUser;
        var options = this.state.teams.map(function(opt, i){
            return <option key={opt.id} value={opt.id}>{opt.name}</option>;
        }, this);

        if (currentUser.teamId == null){
            return (
                <div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Team</label>
                        <div className="col-md-4 selectContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                                <select name="team" className="form-control selectpicker" onChange={this.changeTeam.bind(this)}>
                                    <option value=" " >Please select your team</option>
                                    {options}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label"></label>
                        <div className="col-md-4">
                            <div className="btn btn-warning" onClick={this.sendRequestToTeamOnServer}>{strings.send_request_to_team} <span className="glyphicon glyphicon-send"></span></div>
                        </div>
                    </div>
                    {this.createTeamButtonRender()}
                </div>)
        } else if (currentUser.role_team_id == 1){
            return(<div>
                {this.state.team.name}
                <ul className="col-md-9">
                   {this.state.teams.map(this.renderTeamMembers)}
                </ul>

            </div>)
        } else if (currentUser.role_team_id == 2) {

        } else if (currentUser.role_team_id == 3) {
            return(<div>
                You sent request to team
            </div>)
        }

        return (<div> </div>);
    }


    sendRequestToTeamOnServer() {
        var currentUser = this.state.currentUser;
        var errorMessage = "";
        if (this.state.team == ""){
            errorMessage = "Select team";
        }

        if( errorMessage != ""){
            this.setState({
                    errorMessage: errorMessage},
                () => {$('#error_message').show()}
            );
        }else {
            currentUser.teamId['id'] = this.state.team;
            currentUser.roleTeam.id = "3";
            $('#error_message').hide()
            ajaxUtils.executePostAction("/api/setTeam",
                JSON.stringify(currentUser),
                (currentUser) => {
                    this.setState(
                        {currentUser: currentUser},
                        () => {
                            $('#success_message').show()
                        }
                    );
                },
                (e) => {
                    this.setState(
                        {errorMessage: e},
                        () => {
                            $('#error_message').show()
                        }
                    );
                }
            )
        }
    }


    sendRequestButtonRender() {
        const team = this.state.team;
        if(team == null) {
            return(
                <p><a href={ "#/game-edit/0" } type="button" className="btn btn-default" > Create new game</a></p>);
        }else {
            return (<p></p>);
        }
    }

    createTeamButtonRender() {
        const currentUser = this.state.currentUser;
        console.info("currentUser.teamId", currentUser.teamId)
        const team  = currentUser.teamId;
        if(team == undefined) {
            return(
                <div className="form-group">
                    <label className="col-md-4 control-label"></label>
                    <div className="col-md-4 ">
                        <a href={ "#/team-edit/0" } type="button" className="btn btn-warning" > Create team <span className="glyphicon glyphicon-plus"></span></a>
                    </div>
                </div>);
        }else {
            return (<p></p>);
        }
    }

    render() {

        return (
            <div>
                <form className="well form-horizontal" action=" " method="post"  id="contact_form" autoComplete="off">
                    <fieldset>

                        {/*<!-- Form Name -->*/}
                        <legend>{strings.my_profile}</legend>

                        {/*<!-- Text input-->*/}

                        <div className="form-group">
                            <label className="col-md-4 control-label">{strings.name_login}</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input name="first_name" className="form-control"  type="text" value={this.state.currentUser.name} onChange={this.onFieldChange.bind(this, "name")}/>
                                </div>
                            </div>
                        </div>


                        {/*<!-- Text input-->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label">E-Mail</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                    <input disabled name="email" placeholder="E-Mail Address" className="form-control"  type="text" value={this.state.currentUser.email} />
                                </div>
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

                        <div className="form-group">
                            <label className="col-md-4 control-label">{strings.new_password}</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input name="password"  className="form-control" type="password" onChange={this.onFieldChange.bind(this, "password")}/>
                                </div>
                            </div>
                        </div>

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
                                        {/*<option>Alabama</option>*/}
                                        {/*<option>Alaska</option>*/}
                                        {/*<option >Arizona</option>*/}
                                        {/*<option >Arkansas</option>*/}
                                        {/*<option >California</option>*/}
                                        {/*<option >Colorado</option>*/}
                                        {/*<option >Connecticut</option>*/}
                                        {/*<option >Delaware</option>*/}
                                        {/*<option >District of Columbia</option>*/}
                                        {/*<option> Florida</option>*/}
                                        {/*<option >Georgia</option>*/}
                                        {/*<option >Hawaii</option>*/}
                                        {/*<option >daho</option>*/}
                                        {/*<option >Illinois</option>*/}
                                        {/*<option >Indiana</option>*/}
                                        {/*<option >Iowa</option>*/}
                                        {/*<option> Kansas</option>*/}
                                        {/*<option >Kentucky</option>*/}
                                        {/*<option >Louisiana</option>*/}
                                        {/*<option>Maine</option>*/}
                                        {/*<option >Maryland</option>*/}
                                        {/*<option> Mass</option>*/}
                                        {/*<option >Michigan</option>*/}
                                        {/*<option >Minnesota</option>*/}
                                        {/*<option>Mississippi</option>*/}
                                        {/*<option>Missouri</option>*/}
                                        {/*<option>Montana</option>*/}
                                        {/*<option>Nebraska</option>*/}
                                        {/*<option>Nevada</option>*/}
                                        {/*<option>New Hampshire</option>*/}
                                        {/*<option>New Jersey</option>*/}
                                        {/*<option>New Mexico</option>*/}
                                        {/*<option>New York</option>*/}
                                        {/*<option>North Carolina</option>*/}
                                        {/*<option>North Dakota</option>*/}
                                        {/*<option>Ohio</option>*/}
                                        {/*<option>Oklahoma</option>*/}
                                        {/*<option>Oregon</option>*/}
                                        {/*<option>Pennsylvania</option>*/}
                                        {/*<option>Rhode Island</option>*/}
                                        {/*<option>South Carolina</option>*/}
                                        {/*<option>South Dakota</option>*/}
                                        {/*<option>Tennessee</option>*/}
                                        {/*<option>Texas</option>*/}
                                        {/*<option> Uttah</option>*/}
                                        {/*<option>Vermont</option>*/}
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
                        <div className="alert alert-success" role="alert" id="success_message">{strings.success} <i className="glyphicon glyphicon-thumbs-up"></i>{strings.success_message}</div>
                        {/*<!-- Error message -->*/}
                        <div className="alert alert-danger" role="alert" id="error_message">{strings.error} <i className="glyphicon glyphicon-warning-sign"></i> {this.state.errorMessage} </div>

                        {/*<!-- Button -->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <div className="btn btn-warning" onClick={this.sendChangesOnServer}>{strings.save_changes} <span className="glyphicon glyphicon-send"></span></div>
                            </div>
                        </div>

                    </fieldset>
                </form>
                <form className="well form-horizontal" action=" " method="post"  id="contact_form" autoComplete="off">
                    <fieldset>

                        {/*<!-- Form Name -->*/}
                        <legend>{strings.my_team}</legend>

                        {/*<!-- List select-->*/}
                        {this.generateMyTeamGroup()}

                        {/*<!-- Success message -->*/}
                        <div className="alert alert-success" role="alert" id="success_message">{strings.success} <i className="glyphicon glyphicon-thumbs-up"></i>{strings.success_message}</div>
                        {/*<!-- Error message -->*/}
                        <div className="alert alert-danger" role="alert" id="error_message">{strings.error} <i className="glyphicon glyphicon-warning-sign"></i> {this.state.errorMessage} </div>

                    </fieldset>
                </form>
            </div>
        )
    }
}

