

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Alert from '@material-ui/lab/Alert';
import Loader from "../../assets/img/loader.gif";


import { API_BASE_URL, APP_URL, USER_ID } from '../../config';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function DeleteAccount() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const toggle = () => {
     setState({ ...state, bottom: false });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
     >
     <DelPass toggle={toggle} />

    </div>
  );

  return (
    <div>
        <div>
          <React.Fragment key={'bottom'}>
           <div className="row">
              <button className='btn red' id='deleteaccountbutton' onClick={toggleDrawer('bottom', true)}> Delete Account </button>
              <p className="helper-text" data-error="wrong" data-success="right">All Files and data will be deleted</p>

           </div>
              <Drawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
               {list('bottom')}
             </Drawer>
           </React.Fragment>
        </div>

    </div>
  );
}



class DelPass extends React.Component {

  state = {
      loader: false,
      accountdeletesuccess: false
  }

  handleClick = e => {
    this.props.toggle();
  }
  handleSubmit = e => {
    this.setState({ loader: true });
    e.preventDefault();
    $.ajax({
       url: API_BASE_URL + '/deleteaccount/'+ USER_ID,
       method: "POST",

     })
     .done( res => {
        this.setState({accountdeletesuccess: true});
       this.setState({ loader: false });

       setTimeout(()=>{
         this.props.toggle();
         window.location.href = APP_URL + '/logoutuser';
       },3000)

     })
     .fail(err => {
        this.setState({ loader: false });
     });
   }



  render(){
    return(
      <form onSubmit={this.handleSubmit} className="deleteaccount">
         <div className="row">
         {(this.state.accountdeletesuccess) ? <Alert severity="success">Account Deleted Successfully</Alert> : null}
           <div className="input-field col s12">
             <h4 className='red-text'>Are you sure you want to delete account</h4>

           <span>{(this.state.loader) ? <img className='loader' src={Loader} /> : null} <button className='btn red' id="delete">Delete</button></span>
           <span><a className='btn blue' onClick={this.handleClick}>Cancel</a></span>
           </div>
         </div>
      </form>
    );
  };
}
