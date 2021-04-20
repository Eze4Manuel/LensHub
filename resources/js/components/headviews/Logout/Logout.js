/*eslint-disable*/
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import styles from "../../assets/jss/material-dashboard-react/views/logoutStyle.js";
import { HEAD_APP_URL, APP_NAME } from '../../config';
import Loader from "../../assets/img/loader.gif";

const useStyles = makeStyles(styles);

export default class  Logout extends React.Component {

  componentDidMount() {
    $.ajax({
      url: HEAD_APP_URL + '/headlogoutuser/',
      method: "GET",
    })
    .done( res => {
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
