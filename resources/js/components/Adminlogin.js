
import React, { Component }  from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
 // core components
import Head from "./layouts/Head.js";

import "./assets/css/material-dashboard-react.css";




class Adminlogin extends Component {

  componentDidMount(){

  }

  render(){

  const hist = createBrowserHistory();
    return(
      <Router history={hist}>
        <Switch>
          <Route path="/head" component={Head} />
           <Redirect from="/" to="/head/dashboard" />
        </Switch>
      </Router>
     );
 };
}
export default Adminlogin;

if (document.getElementById('adminloginview')) {
     ReactDOM.render(<Adminlogin/>, document.getElementById('adminloginview'));
}
