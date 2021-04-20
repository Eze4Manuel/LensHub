import React from 'react';
import ImageUploader from 'react-images-upload';
import { API_BASE_URL, USER_ID } from '../../config';
import Loader from "../../assets/img/loader.gif";
import Alert from '@material-ui/lab/Alert';


class Form3 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      lga: "",
      account_name: "",
      account_number: "",
      bank: "",
      productId: this.props.productId,
      loader: false,
      alert: {status: false, severity: 'error', message: '' },

    }
  }


  componentDidMount(){
    M.updateTextFields();

    var select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});

  }

  handleSubmit = e =>{
    e.preventDefault();
  }
  handleRestart = e =>{
    this.setState({loader: true})

    $.ajax({
      url: API_BASE_URL + '/removeProduct/'+ USER_ID,
      method: "POST",
      data: this.state,
    })
    .done( res => {
      this.setState({alert: {status: true, severity: 'info', message: 'Details Cleared.'}})
       this.setState({loader: false})
      window.location.reload();

    })
    .fail( err => {
      console.log(err);
      this.setState({loader: false})

    })

  }
  handleComplete= e => {
    this.setState({loader: true})
    this.setState({alert: {status: false}})

    $.ajax({
      url: API_BASE_URL + '/furtherProductDetails/'+ USER_ID,
      method: "POST",
      data: this.state,
    })
    .done( res => {
      console.log(res);
      this.setState({alert: {status: true, severity: 'success', message: 'Details Saved Successfully.'}})
      this.setState({loader: false})
      setTimeout(e => {window.location.reload()}, 2000)
    })
    .fail( err => {console.log(err);  this.setState({loader: false, alert: {status: true, severity: 'error', message: 'Details Upload Failed!'}}) } )
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value});
  }


  render(){
    return(
      <>
          <form className="col s12" id="rentform3" onSubmit={this.handleSubmit}>
               <div className="row">
                 <h4>Further Details</h4>
                 <div className="input-field col s12 m8">
                  <i className="material-icons prefix">location_city</i>
                  <input id="address" name='address' value={this.state.address} type="text" onChange={this.handleChange} className="validate"/>
                  <label htmlFor="address">Address</label>
                 </div>
                 <div className="input-field col s12 m4">
                  <i className="material-icons prefix">location_searching</i>
                  <input id="lga" name='lga' value={this.state.lga} type="text" onChange={this.handleChange} className="validate" />
                  <label htmlFor="lga">LGA</label>
                 </div>
              </div>

              <div className="row">
               <div className="input-field col s12 m10">
                 <i className="material-icons prefix">account_circle</i>
                 <input id="account_name" name="account_name" type="text" value={this.state.account_name} onChange={this.handleChange} className="validate"  />
                 <label htmlFor="account_name">Account Name</label>
                </div>
              </div>

              <div className="row">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">account_balance_wallet</i>
                <input id="account_number" name="account_number" type="text" value={this.state.account_number} onChange={this.handleChange} className="validate"/>
                <label htmlFor="account_number">Account Number</label>
               </div>

               <div className="input-field col s12 m">
                 <i className="material-icons prefix">account_balance</i>
                 <input id="bank" name="bank" type="text" value={this.state.bank} onChange={this.handleChange} className="validate"  />
                 <label htmlFor="bank">Bank</label>
                </div>
              </div>
              <div className="loader">
              { this.state.loader ? <img src={Loader} alt="loader" /> : null }
              </div>
              <div>
                <button className="chiwell" onClick={this.handleRestart}>Restart</button>
                <button className="chiwell chill" onClick={this.handleComplete}>Complete</button>
              </div>
              {this.state.alert.status ? <Alert severity={this.state.alert.severity}>{this.state.alert.message}</Alert>: null}

            </form>
        </>

    )
  }
}


export default Form3;
