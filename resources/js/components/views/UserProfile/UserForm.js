import React from 'react';
import ImageUploader from 'react-images-upload';
import Button from "../../components/CustomButtons/Button.js";
import Loader from "../../assets/img/loader.gif";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { API_BASE_URL, USER_ID } from '../../config';

import $ from 'jquery';


class UserForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        userProfileForm: {
          name: '',
          phone: '',
          email: '',
          address: '',
          company: '',
          about: ''
        },
        loader: false,
        profilesuccess: false,
     };
  }


  componentDidMount(){
     M.updateTextFields();

    var select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //Getting User Profile with User logged in ID
      $.ajax({
        url: API_BASE_URL + '/getUserProfile/'+ USER_ID,
      })
      .done( res => {
         this.setState({ userProfileForm :  {
           ...this.state.userProfileForm,
           name : res.name,
           email: res.email,
           phone: res.phone,
           address: res.address,
           company: res.company,
           about: res.about
         }
       });
      })
      .fail(err => {console.log(err.responseText)});
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    componentWillUnmount(){

    }


  handleChange = (e) => {
     this.setState({
    userProfileForm:{ ...this.state.userProfileForm, [e.target.id] : e.target.value    }
   })
  }
  handleSubmit = (e) => {
    this.setState({ loader: true });
    e.preventDefault();
    $.ajax({
       url: API_BASE_URL + '/editProfile/'+ USER_ID,
       method: "POST",
       data: this.state.userProfileForm
     })
     .done( res => {
       this.setState({loader: false})
       this.setState({profilesuccess: true})
     })
     .fail(err => {
        console.log(err.responseText);
        this.setState({loader: false});
     });
   }




  render(){
    return(
        <form className="col s12" id="userprofileform" onSubmit={this.handleSubmit}>
           <div className="row">
             <div className="input-field col s12 m6">
              <i className="material-icons prefix">account_circle</i>
              <input  id="name" type="text" readOnly className="validate" value={this.state.userProfileForm.name} onChange={this.handleChange}/>
              <label htmlFor="name">Name</label>

             </div>
             <div className="input-field col s12 m6">
               <i className="material-icons prefix">phone</i>
               <input id="phone" type="tel" className="validate" value={this.state.userProfileForm.phone} onChange={this.handleChange}/>
               <label htmlFor="phone">Phone</label>
              </div>
            </div>

          <div className="row">

            <div className="input-field col s12 m6">
              <i className="material-icons prefix">mail</i>
              <input id="email" type="email" readOnly className="validate" value={this.state.userProfileForm.email} onChange={this.handleChange}/>
              <label htmlFor="email">Email</label>
              <span className="helper-text" data-error="wrong" data-success="right">Email to contact you with</span>
            </div>

            <div className="input-field col s12 m6">
             <i className="material-icons prefix">business</i>
             <input id="address" type="text" className="validate" value={this.state.userProfileForm.address} onChange={this.handleChange}/>
             <label htmlFor="address">Address</label>

            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m6">
              <i className="material-icons prefix">explicit</i>
              <input id="company" type="text" className="validate" value={this.state.userProfileForm.company} onChange={this.handleChange}/>
              <label htmlFor="company">Company/Individual</label>
              <span className="helper-text" data-error="wrong" data-success="right">Enter your Company Name or Individual</span>
            </div>
          </div>




              <div className="row">
                <div className="input-field col s12" >
                  <label htmlFor="about" id='textareatext'>About you (150 characters)</label>
                  <textarea id="about" className="materialize-textarea browser-default" maxLength="150" value={this.state.userProfileForm.about} onChange={this.handleChange}></textarea>
                </div>
              </div>

              <div className='submission'>
               {(this.state.loader) ? <img className='loader' src={Loader} /> : <Button type='submit' color="primary">Update Profile</Button>}
              </div>
              <div>
               {(this.state.profilesuccess) ? <Alert severity="success">Profile Update Sucessful</Alert> : null}
              </div>
      </form>

    )
  }
}


export default UserForm;
