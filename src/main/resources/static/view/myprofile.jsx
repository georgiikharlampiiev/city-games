import React from 'react';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';
const ajaxUtils = require ('../utils/utils.jsx');

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
        send_request_to_team:"Send request to team",
        approve_admin:"Approve Admin",
        approve_player:"Approve Player",
        delete_approve:"Delete approve",
        leave_team:"Leave team"
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
        approve_admin:"Approve Admin",
        approve_player:"Approve Player",
        delete_approve:"Delete approve",
        leave_team:"Leave team"
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
        send_request_to_team:"Send request to team",
        approve_admin:"Approve Admin",
        approve_player:"Approve Player",
        delete_approve:"Delete approve",
        leave_team:"Leave team"
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
            yourNameTeam: "",
            teamUsers: []
        };
        this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
        this.sendRequestToTeamOnServer = this.sendRequestToTeamOnServer.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.renderTeamMembers = this.renderTeamMembers.bind(this);
        this.approveUserForTeam = this.approveUserForTeam.bind(this);
        this.updateTeamFromServer = this.updateTeamFromServer.bind(this);
        this.renderTeamMembersWithApprove = this.renderTeamMembersWithApprove.bind(this);
        this.leaveTeam = this.leaveTeam.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
        this.createTeamForCurrentUser = this.createTeamForCurrentUser.bind(this);
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
         this.updateTeamFromServer();
    }

    updateTeamFromServer(){
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
        this.setState({team:e.target.value});
    }

    approveUserForTeam(userId, roleId) {
        ajaxUtils.executeGetAction('/api/approveUserForTeam/'+ userId + '/' + roleId,
            (data) => {this.updateTeamFromServer()},
            (e) => console.error(e)
        );
    }

    leaveTeam() {
        ajaxUtils.executeGetAction('/api/leaveTeamForUser/'+ this.state.currentUser.id,
            (data) => {this.loadFromServer()},
            (e) => console.error(e)
        );
    }

    renderTeamMembersWithApprove(user){
        if(user.id == this.state.currentUser.id){
            return (
                <li key={user.id} className="list-group-item">
                    {user.name}
                    <Button onClick={ () =>  this.leaveTeam() }> { strings.leave_team } </Button>
                </li>
            )
        }else if(user.roleTeam.id != 3 ){
            return (
                <li key={user.id} className="list-group-item">
                    {user.name}
                    <Button onClick={ () => this.approveUserForTeam(user.id, 3) }> { strings.delete_approve } </Button>
                </li>
            )
        }else {
            return (
                <li key={user.id} className="list-group-item">
                    {user.name}
                    <Button onClick={ () =>  this.approveUserForTeam(user.id, 1) }> { strings.approve_admin } </Button>
                    <Button onClick={ () =>  this.approveUserForTeam(user.id, 2) }> { strings.approve_player } </Button>
                </li>
            )
        }

    }

    renderTeamMembers(user){
        if(user.id == this.state.currentUser.id){
            return (
                <li key={user.id} className="list-group-item">
                    {user.name}
                    <Button onClick={ () =>  this.leaveTeam() }> { strings.leave_team } </Button>
                </li>
            )
        }else {
            return (
                <li key={user.id} className="list-group-item">
                    {user.name}
                </li>
            )
        }
    }

    generateMyTeamGroup() {
        const currentUser = this.state.currentUser;
        const options = this.state.teams.map(function(opt, i){
            return <option key={opt.id} value={opt.id}>{opt.name}</option>;
        }, this);

        if (!currentUser.teamId){
            return (
                <div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Team</label>
                        <div className="col-md-4 selectContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-list"/></span>
                                <select name="team" className="form-control selectpicker" onChange={this.changeTeam.bind(this)}>
                                    <option value=" " >Please select your team</option>
                                    {options}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label"/>
                        <div className="col-md-4">
                            <div className="btn btn-warning" onClick={this.sendRequestToTeamOnServer}>{strings.send_request_to_team} <span className="glyphicon glyphicon-send"/></div>
                        </div>
                    </div>
                    {this.createTeamButtonRender()}
                </div>)
        } else if (currentUser.roleTeam.id == 1){
            if(this.state.team.users){
                return(<div>
                    {this.state.team.name}
                    <ul className="col-md-9">
                       {this.state.team.users.map(this.renderTeamMembersWithApprove)}
                    </ul>
                </div>)
            }else {
                return(<div>
                    {this.state.team.name}
                </div>)
            }
        } else if (currentUser.roleTeam.id == 2) {
            return(<div>
                {this.state.team.name}
                <ul className="col-md-9">
                    {this.state.team.users.map(this.renderTeamMembers)}
                </ul>
            </div>)
        } else if (currentUser.roleTeam.id == 3) {
            return(<div>
                You sent request to team
                <Button onClick={ () =>  this.leaveTeam() }> { strings.leave_team } </Button>
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
            currentUser.teamId = this.state.team;
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

    createTeamForCurrentUser() {
        ajaxUtils.executeGetAction('/api/createTeamForCurrentUser/'+ this.state.yourNameTeam,
            (data) => {this.loadFromServer()},
            (e) => console.error(e)
        );

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
            return(<div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Your team name</label>
                        <div className="col-md-4 inputGroupContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"/></span>
                                <input name="yourteamname" placeholder="Your team name" className="form-control"  type="text" value={this.state.yourNameTeam} onChange={(e) => {this.setState({yourNameTeam: e.target.value})}} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label"/>
                        <div className="col-md-4 ">
                            <Button bsStyle="warning" onClick={ () =>  this.createTeamForCurrentUser() }> Create team <span className="glyphicon glyphicon-plus"/> </Button>
                        </div>
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

                        <div className="form-group">
                            <label className="col-md-4 control-label">{strings.new_password}</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input name="password"  className="form-control" type="password" onChange={this.onFieldChange.bind(this, "password")}/>
                                </div>
                            </div>
                        </div>

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

