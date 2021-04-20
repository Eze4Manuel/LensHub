
import React, { Component }  from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
 // core components
import Admin from "./layouts/Admin.js";

import "./assets/css/material-dashboard-react.css";

class DashboardIndex extends Component {

  render(){
    const hist = createBrowserHistory();

      return(
        <Router history={hist}> 
          <Switch>
            <Route path="/admin" component={Admin} />
             <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </Router>
      );
  };
}
export default DashboardIndex;

if (document.getElementById('dashboardindex')) {
     ReactDOM.render(<DashboardIndex/>, document.getElementById('dashboardindex'));
}
