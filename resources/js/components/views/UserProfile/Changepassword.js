

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
 import Alert from '@material-ui/lab/Alert';
import Loader from "../../assets/img/loader.gif";


import { API_BASE_URL, USER_ID } from '../../config';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Changepassword() {
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
     <Pass toggle={toggle} />

    </div>
  );

  return (
    <div>
        <div>
          <React.Fragment key={'bottom'}>
           <div className="row">
              <button  onClick={toggleDrawer('bottom', true)} className='btn blue' id="changepasswordbutton"> Change Password</button>
           </div>
              <Drawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
               {list('bottom')}
             </Drawer>
           </React.Fragment>
        </div>

    </div>
  );
}



class Pass extends React.Component {

  state = {
      oldpass : "",
      newpass: "",
      confirmpass: "",
      passwordwrong: false,
      passwordconfirmwrong: false,
      passwordchangesuccess: false,
      loader: false,

  }

  handleChange = e => {
    this.setState({
    ...this.state, [e.target.id] : e.target.value
  })
  }

  handleSubmit = e => {
    this.setState({ loader: true });
    e.preventDefault();
    $.ajax({
       url: API_BASE_URL + '/changepassword/'+ USER_ID,
       method: "POST",
       data: this.state
     })
     .done( res => {
       console.log(res);
       if(!res){
         this.setState({passwordconfirmwrong: true});
         setTimeout(()=>{
           this.setState({passwordconfirmwrong: false});
         },5000)
         this.setState({ loader: false });

       }else if(res == 1){
         this.setState({passwordwrong: true});
         setTimeout(()=>{
           this.setState({passwordwrong: false});
         },5000)
         this.setState({ loader: false });

        }else{
          this.setState({passwordchangesuccess: true});
          setTimeout(()=>{
            this.props.toggle();
          },3000)
          this.setState({ loader: false });
       }
     })
     .fail(err => {

        });
   }



  render(){
    return(
      <form onSubmit={this.handleSubmit} className="changepassword">
         <div className="row">
         {(this.state.passwordchangesuccess) ? <Alert severity="success">Password Change Sucessful</Alert> : null}

           <div className="input-field col s12">
             <i className="material-icons prefix">lock</i>
             <input id="oldpass" type="text" className="validate" value={this.state.oldpass} onChange={this.handleChange} autoComplete="false" />
             <label htmlFor="oldpass">Old Password</label>
             {(this.state.passwordwrong)? <span className='red-text'>Old Password Incorrect</span>: null}
           </div>

           <div className="input-field col s12">
             <i className="material-icons prefix">lock</i>
             <input id="newpass" type="password" className="validate" value={this.state.newpass} onChange={this.handleChange} autoComplete="false" pattern=".{8,}" title="Atleast 8 characters"/>
             <label htmlFor="newpass">New Password (Atleast 8 characters)</label>
           </div>
           <div className="input-field col s12">
             <i className="material-icons prefix">lock</i>
             <input id="confirmpass" type="password" className="validate" value={this.state.confirmpass} onChange={this.handleChange} autoComplete="false"/>
             <label htmlFor="confirmpass">Confirm Password</label>
              {(this.state.passwordconfirmwrong)? <span className='red-text'>Password Confirm Failed</span>: null}
           </div>
           {(this.state.loader) ? <img className='loader' src={Loader} /> : <button className='btn blue' id="change">Change</button>}



         </div>
      </form>
    );
  };
}
