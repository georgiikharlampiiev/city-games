import React from 'react';
import { Link } from "react-router";
var executeGetAction =  require ('../utils/utils.jsx');


export class MyProfile extends React.Component {

    constructor(props) {
        super(props);
       this.state = {currentUser: []};
    }

    componentDidMount() {
        this.loadFromServer();
    }

     loadFromServer() {

        console.info("executeGetAction('/api/getUserProfile')", executeGetAction('/api/getUserProfile'))
         // this.setState({currentUser:executeGetAction('/api/getUserProfile')})
    }


    render() {
        return (
            <div>
                <form className="well form-horizontal" action=" " method="post"  id="contact_form">
                    <fieldset>

                        {/*<!-- Form Name -->*/}
                        <legend>My profile</legend>

                        {/*<!-- Text input-->*/}

                        <div className="form-group">
                            <label className="col-md-4 control-label">Name/Login</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input  name="first_name" placeholder="First Name" className="form-control"  type="text"/>
                                </div>
                            </div>
                        </div>


                        {/*<!-- Text input-->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label">E-Mail</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                    <input name="email" placeholder="E-Mail Address" className="form-control"  type="text"/>
                                </div>
                            </div>
                        </div>


                        {/*<!-- Text input-->*/}

                        <div className="form-group">
                            <label className="col-md-4 control-label">Phone #</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                                    <input name="phone" placeholder="(845)555-1212" className="form-control" type="text"/>
                                </div>
                            </div>
                        </div>

                        {/*<!-- Text input-->*/}

                        <div className="form-group">
                            <label className="col-md-4 control-label">New Password</label>
                            <div className="col-md-4 inputGroupContainer">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input name="address" placeholder="Address" className="form-control" type="password"/>
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
                        <div className="alert alert-success" role="alert" id="success_message">Success <i className="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>

                        {/*<!-- Button -->*/}
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-warning" >Send <span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </div>
        )
    }
}

