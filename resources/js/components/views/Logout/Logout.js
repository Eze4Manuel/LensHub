/*eslint-disable*/
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import styles from "../../assets/jss/material-dashboard-react/views/logoutStyle.js";
import { APP_URL, APP_NAME, USER_ID } from '../../config';
import Loader from "../../assets/img/loader.gif";

const useStyles = makeStyles(styles);

export default class  Logout extends React.Component {

  componentDidMount() {
    $.ajax({
      url: APP_URL + '/logoutuser/',
      method: "GET",
    })
    .done( res => {
        console.log(res);
        if(res == 'logout') window.location.reload();
     })
    .fail( err => { console.log(err) })

  }

  render(){
    return (
       <>
          <div className="center"> <img  src={Loader} alt='loader'/> </div>
       </>
    );
  }
}
