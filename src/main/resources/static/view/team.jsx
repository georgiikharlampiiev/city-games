import React from 'react';
import { Link } from "react-router";
var ajaxUtils = require ('../utils/utils.jsx');


export class Team extends React.Component {

  constructor(props) {
          super(props);
         this.state = {teams: []};
      }

      componentDidMount() {
          this.loadFromServer();
      }

       loadFromServer() {

           ajaxUtils.executeGetAction('/api/getAllTeams',
                (data) => {this.setState({teams:data})},
                (e) => console.error(e)
           );
      }
       render() {
       var options = this.state.teams.map(function(opt, i){
           			return <option key={opt.id} value={opt.name}>{opt.name}</option>;
           		}, this);
          return (
                           <div>
                               <form className="well form-horizontal" action=" " method="post"  id="contact_form" autoComplete="off">
                                   <fieldset>
                                       <div className="form-group">
                                           <label className="col-md-4 control-label">Team</label>
                                           <div className="col-md-4 selectContainer">
                                               <div className="input-group">
                                                   <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                                                   <select name="team" className="form-control selectpicker" >
                                                        <option value=" " >Please select your team</option>
                                                        {options}
                                                   </select>
                                               </div>
                                           </div>
                                       </div>

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

