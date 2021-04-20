import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Accessibility from "@material-ui/icons/Accessibility";
import Update from "@material-ui/icons/Update";


import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
 import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Pagination from '@material-ui/lab/Pagination';

import Aller from "./All.js";
import Activer from "./Active.js";
import Reviewer from "./Reviewing.js";
import Decliner from "./Declined.js";
import DeleteProduct from "./DeleteProduct";

import Loader from "../../assets/img/loader.gif";

import { API_BASE_URL, APP_NAME, USER_ID } from '../../config';

import { bugs, website, server } from "../../variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

import img1 from "../../assets/img/sidebar-1.jpg";

import icon1 from "../../assets/img/icon1.png";
import icon2 from "../../assets/img/icon2.png";
import icon3 from "../../assets/img/icon3.png";
import icon4 from "../../assets/img/icon4.png";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles((theme) => ({
  showmore: {
    fontSize: "15px",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
    color: "black"
   },
}));


  function Upload (){
    const [uploads, setUploads] = useState(0);

    useEffect(() => {
      //Fetching Data for Uploaded Gadgets Completion
        document.title = APP_NAME + ' | Dashboard';
        $.ajax({
          url: API_BASE_URL + '/getTotalUploads/'+ USER_ID,
          method: "GET",
        })
        .done( res => {
            setUploads(res);
        })
        .fail( err => { console.log(err) })
      })

      return (
        <>
          <div className="col s12 m6 l4">
            <div className="card ">
              <div className="card-content black-text">
                <img src={icon1} alt='prof' />
                <span className="card-title">Total Uploads</span>
                <p>
                  <span>{uploads}</span> gadgets
                </p>
              </div>
              <div className="card-action">   </div>
            </div>
          </div>
        </>
      )
  }

  function Messages(){
   useEffect(() => {
     //Fetching Data for Profile Completion
      $.ajax({
        url: API_BASE_URL + '/getUnreadNotifications/'+ USER_ID,
        method: "GET",
      })
      .done( res => {

       })
      .fail( err => { console.log(err) })
   })


    return(
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-content black-text">
            <img src={icon2} alt='prof' />
            <span className="card-title">Messages</span>
            <p>
              <span>0</span> unread
            </p>
          </div>
          <div className="card-action">  </div>
        </div>
      </div>
    )
  }


  function Profile(){
    const [percent, setPercent] = useState(0);

     useEffect(() => {
             //Fetching Data for Profile Completion
             $.ajax({
               url: API_BASE_URL + '/getProfileCompletion/'+ USER_ID,
               method: "GET",
             })
             .done( res => {
                 var arr = ['name', 'email', 'phone', 'address', 'company', 'about', 'photo'];
                 var array = Object.entries(res);
                 var temp = 0;
                 for (var i = 0; i < array.length; i++) {
                       if(arr.includes(array[i][0]) && (array[i][1] != null) ){
                        temp++;
                       continue;
                   }
                 }
                 setPercent(parseInt((temp/arr.length) * 100) );
              })
             .fail( err => { console.log(err) })
     })

    return (
      <div className="col s12 m6 l4">
       <div className="card">
         <div className="card-content black-text">
           <img src={icon4} alt='prof' />
           <span className="card-title">Profile Completion</span>
           <p>
             <span>{percent} %</span> Complete
           </p>
         </div>
         <div className="card-action">  </div>
       </div>
      </div>
    )
  }



export default class Dashboard extends React.Component {

  state = {
    products: { products: [], skip: 0, take: 2, loader: false },
    activeProducts: { activeProducts: [], skip: 0, take: 2, loader: false },
    reviewingProducts: { reviewingProducts: [], skip: 0, take: 2, loader: false },
    declinedProducts: { declinedProducts: [], skip: 0, take: 2, loader: false },

  }
   


render(){
  return (
    <div>
      <GridContainer>
       <div className="row">
          <Upload />
          <Messages />
          <Profile />
        </div>
      </GridContainer>

      <GridContainer>
       <CustomTabs
         title=""
         headerColor="primary"
         tabs={[
           {
             tabName: "All",
             tabIcon: AllInclusiveIcon,
             tabContent: (
               <Aller />
             )
           },
           {
             tabName: "Active",
            tabIcon: LocalActivityIcon,
            tabContent: (
              <Activer />
            )
          },
          {
            tabName: "Reviewing",
            tabIcon: FlipCameraAndroidIcon,
            tabContent: (
              <Reviewer />
            )
          },
          {
            tabName: "Declined",
            tabIcon: ThumbDownIcon,
            tabContent: (
              <Decliner />
             )
          }
        ]}
      />


      </GridContainer>

    </div>
  );
 }
}
