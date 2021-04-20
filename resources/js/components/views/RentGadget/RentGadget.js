import React, { useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
 import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
 import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Code from "@material-ui/icons/Code";

import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

import { bugs, website, server } from "../../variables/general.js";

import done from "../../assets/img/done.png";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function RentGadget() {
  const [disabled, setDisabled] = useState({form1: false, form2: true, form3: true});
  const [productId, setProductId] = useState();
  const [tribute, setTribute] = useState(0);
   const classes = useStyles();
   const input = document.querySelectorAll('#dashboardindex .MuiTabs-flexContainer button');

  const handleDisable = (e) => {
    setDisabled(e);
   }
   const handleProductId = (e) => {
     setProductId(e);
     console.log(e);
    }

    const handleTribute = (e) => {
      input[e].click();
      }

  return (
     <GridContainer>
       <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          headerColor="primary"
          tribute = {tribute}
          tabs={[
            {
              tabName: "Step 1",
              tabIcon: LooksOneIcon,
              disabled: disabled.form1,
              tabContent: (
                <Form1 handleDisable={handleDisable} handleProductId={handleProductId} handleTribute={handleTribute}/>
              )
            },
            {
              tabName: "Step 2",
              tabIcon: LooksTwoIcon,
              disabled: disabled.form2,
               tabContent: (
                <Form2 handleDisable={handleDisable} productId={productId}  handleTribute={handleTribute}/>
              )
            },
            {
              tabName: "Finish",
              tabIcon: CheckCircleOutlineIcon,
              disabled: disabled.form3,
              tabContent: (
                <Form3 handleDisable={handleDisable} productId={productId}  handleTribute={handleTribute}/>


              )
            }
          ]}
        />
      </GridItem>

    </GridContainer>

  );
}
