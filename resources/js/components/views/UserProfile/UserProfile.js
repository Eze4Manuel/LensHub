import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";



import Drawer from '@material-ui/core/Drawer';
 import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
 import Alert from '@material-ui/lab/Alert';
import Loader from "../../assets/img/loader.gif";



import avatar from "../../assets/img/faces/mark.png";

import { API_BASE_URL, USER_ID } from '../../config';

import UserForm from "./UserForm";
import Changepassword from "./Changepassword";
import DeleteAccount from "./DeleteAccount";
import UpdateImage from "./UpdateImage";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <ImageView/>
            </CardAvatar>
            <CardBody profile>
              <Name classes={classes}/>
             </CardBody>
          </Card>
        </GridItem>


        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>

             <UserForm/>
            </CardBody>

          </Card>
        </GridItem>


      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
        <Card profile>
          <CardHeader color="primary">
             <h4 className={classes.cardTitleWhite}>Change Password</h4>
           </CardHeader>
          <CardBody profile>
              <Changepassword />
          </CardBody>
        </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
        <Card profile>
          <CardHeader color="danger">
             <h4 className={classes.cardTitleWhite}>Delete Account</h4>
             <p className={classes.cardCategoryWhite}>Remove this account</p>
          </CardHeader>
          <CardBody profile>
               <DeleteAccount />
          </CardBody>
        </Card>
        </GridItem>
      </GridContainer>

    </div>
  );

}




class ImageView extends React.Component{
  state = {
      profileImage: avatar
    }

    componentDidMount(){
      $.ajax({
         url: API_BASE_URL + '/getProfileImage/'+ USER_ID,
         method: 'GET'
        })
       .done( res => {
          if (res) {
            res = 'storage/' + res
            this.setState({profileImage: res})
          }

       })
     };


  render(){
    return(
      <a onClick={e => e.preventDefault()}>
        <img src={this.state.profileImage} alt="..." />
      </a>
    )
  }
}


class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
           name: 'Your Name',
           bottom: false,
     };
  }
  componentDidMount(){
    //Getting User Profile with User logged in ID
     $.ajax({
        url: API_BASE_URL + '/getUserName/'+ USER_ID,
        method: 'POST',
      })
      .done( res => this.setState({...this.state,name : res}) )
     };

    toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ ...this.state, [anchor]: open });
    };

    toggle = () => {
       this.setState({ ...this.state, bottom: false });
    };


    render(){
    return(
      <div>
          <div>
            <React.Fragment key={'bottom'}>
             <div className="row">
             <h6 className={this.props.classes.cardCategory}> {this.state.name}</h6>
                <button  onClick={this.toggleDrawer('bottom', true)} className='btn blue' id="changepasswordbutton"> Change Image</button>
             </div>
                <Drawer anchor={'bottom'} open={this.state['bottom']} onClose={this.toggleDrawer('bottom', false)}>
                 <UpdateImage toggle={this.toggle} />
               </Drawer>
             </React.Fragment>
          </div>
      </div>

    )
  }
}
