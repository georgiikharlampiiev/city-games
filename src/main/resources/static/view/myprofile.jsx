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
        success_message: "All changes have been saved."
    },
    ru: {
        name_login:"Имя/Логин",
        new_password:"Новый пароль",
        my_profile:"Мой профаил",
        save_changes:"Сохранить изменения",
        success:"Успешно",
        error:"Ошибка",
        success_message: "Все изменения сохранены."
    },
    ua: {
        name_login:"Имя/Логин",
        new_password:"Новий пароль",
        my_profile:"Мiй профаил",
        save_changes:"Зберегти змiни",
        success:"Успiшно",
        error:"Помилка",
        success_message: "Всi змiни збереженi."
    }
});

export class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: [],
            errorMessage: ""
        };
        this.sendChangesOnServer = this.sendChangesOnServer.bind(this);
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {
         ajaxUtils.executeGetAction('/api/getUserProfile',
             (data) => {this.setState({ currentUser:data })},
             (e) => console.error(e)
         );
    }

    onFieldChange(fieldName, e){
        var currentUser = this.state.currentUser;
        currentUser[fieldName] = e.target.value;
        this.setState( currentUser );
    }

    sendChangesOnServer() {
        var currentUser = this.state.currentUser;
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
            $('#error_message').hide()
            ajaxUtils.executePostAction("/api/setUserProfile",
                currentUser,
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
            </div>
        )
    }
}

