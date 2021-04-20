import React, {useEffect, useState} from "react";
import M from "materialize-css";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

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



export default class Dashboard extends React.Component {
  state = {
    products: { products: [], skip: 0, take: 2, loader: false },
    activeProducts: { activeProducts: [], skip: 0, take: 2, loader: false },
    reviewingProducts: { reviewingProducts: [], skip: 0, take: 2, loader: false },
    declinedProducts: { declinedProducts: [], skip: 0, take: 2, loader: false },

  }
  // classes = useStyles();

  componentDidMount() {
  

    };



render(){
  return (
    <div>
      <GridContainer>
       <CustomTabs
         title=""
         headerColor="primary"
         tabs={[
           {
             tabName: "Reviewing",
             tabIcon: FlipCameraAndroidIcon,
             tabContent: (
               <Reviewer />
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
