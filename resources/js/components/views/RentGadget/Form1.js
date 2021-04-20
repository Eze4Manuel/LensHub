import React from 'react';
import ImageUploader from 'react-images-upload';
import { API_BASE_URL, USER_ID } from '../../config';
import Loader from "../../assets/img/loader.gif";
import Alert from '@material-ui/lab/Alert';


class Form1 extends React.Component{
  constructor(props) {
    super(props);
    this.state = { name: '',email: '', phone: '',
                   loading: false,
                   alert:{status: false, severity: 'error', message: '' }};
  }


  componentDidMount(){
    M.updateTextFields();

    var select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});

    $.ajax({
       url: API_BASE_URL + '/getUserProfile/'+ USER_ID,
       method: 'GET',
     })
     .done( res => {
        this.setState({ name: res.name, email: res.email, phone: res.phone})
     })
     .fail(err => {console.log(err.responseText); });
  }

  handleSubmit = e =>{
    e.preventDefault();
  }

  handleSubmitProp = (stateProp) => {
    this.setState(prevState => ({ prevState, loading: true }));
    this.setState({alert: {status: false}})

     $.ajax({
      url: API_BASE_URL + '/putProduct/'+ USER_ID,
      method: 'POST',
      data: stateProp
    })
    .done(res => {
       this.setState({alert: {status: true, severity: 'success', message: 'Details Saved Successfully.'}})
       this.props.handleDisable({form1: true, form2: false, form3: true});
       this.setState(prevState => ({ loading: false }));
       this.props.handleProductId(res);
       setTimeout( e => {
         this.props.handleTribute(1);
         var elmnt = document.getElementById("form2");
         elmnt.scrollIntoView(false);
       }, 2000)

    })
    .fail(err => {
      console.log(err);
      this.setState(prevState => ({ loading: false }));
      this.setState({alert: {status: true, severity: 'error', message: 'Submission Failed'}})
    })

   }

  render(){
    return(
      <>
          <form className="col s12" id="rentform1" onSubmit={this.handleSubmit}>
               <div className="row">
                 <h4>Personal</h4>
                 <div className="input-field col s12 m10">
                  <i className="material-icons prefix">person</i>
                  <input id="full_name" name='name' value={this.state.name} type="text" className="validate" readOnly/>
                  <label  className="exempt" htmlFor="first_name">Full Name</label>
                 </div>

              </div>

              <div className="row">
               <div className="input-field col s12 m6">
                 <i className="material-icons prefix">phone</i>
                 <input id="phone" name="phone" type="tel" value={this.state.phone} className="validate" readOnly/>
                 <label  className="exempt" htmlFor="phone">Phone</label>
                </div>

                <div className="input-field col s12 m6">
                  <i className="material-icons prefix">mail</i>
                  <input id="email" name="email" type="email" value={this.state.email} className="validate" readOnly/>
                  <label  className="exempt" htmlFor="email">Email</label>
                  <span className="helper-text" data-error="wrong" data-success="right">Email to contact you with</span>
                </div>
              </div>

            <hr/>
            <Form1A handleSubmitProp={this.handleSubmitProp} loader={this.state.loading} alert={this.state.alert} />
          </form>
        </>

    )
  }
}


class Form1A extends React.Component{
    state = {
      product_name: "",
      product_price: 0,
      category: "camera",
      condition: "working",
      location: "",
      negotiable: 0,
      specification: "",
    }

    handleChange = e => {
      this.setState({ [e.target.id]: e.target.value});
    }
    handleCheck = e => {
      this.setState(prevState => ({ negotiable: (prevState.negotiable) ? 0 : 1 }))
    }
    Submit = e => {
      this.props.handleSubmitProp(this.state)

     }
  render(){
    return(
      <>
       <div className="row">
        <h4>Product</h4>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">group_work</i>
          <input  id="product_name" name='product_name' type="text" value={this.state.product_name} className="validate" onChange={this.handleChange}/>
          <label htmlFor="product_name">Gadget Name</label>
          <span className="helper-text" data-error="wrong" data-success="right">less than 50 characters. First 15 used</span>
        </div>
        <div className="input-field col s12 m6">
          <i className="material-icons prefix">polymer</i>
          <input id="product_price" type="text" name="product_price" value={this.state.product_price} className="validate" onChange={this.handleChange}/>
          <label htmlFor="product_price">Price per day in Naira</label>
          <span className="helper-text" data-error="wrong" data-success="right">Enter price figure</span>
        </div>
      </div>

        <div className="row">
             <div className="input-field col s12 m6">
              <i className="material-icons prefix">location_on</i>
              <input id="location" type="text" name="location" value={this.state.location} className="validate" onChange={this.handleChange}/>
              <label htmlFor="location">Location(State)</label>
             </div>
         </div>


        <div className="row">
          <div className="input-field col s12 m6 l5 select-field">
           <label>Category
           <select className="browser-default" name="category" id="category" value={this.state.category}  onChange={this.handleChange}>
              <option value="camera">Camera</option>
              <option value="lens">Lens</option>
              <option value="drones">Drones</option>
              <option value="sound">Sound</option>
              <option value="light">Light</option>
              <option value="camera_support">Camera Support</option>
              <option value="camera_accessories">Camera Accessories</option>
              <option value="camera_personnel">Camera Personnel</option>
           </select>
           </label>
          </div>

          <div className="input-field col s12 m6 l5 select-field">
           <label>Condition
           <select className="browser-default" id='condition' value={this.state.condition}  onChange={this.handleChange}>
              <option value="working">Working</option>
              <option value="refurbished">Refurbished</option>
              <option value="usable">Usable</option>
              <option value="not_working">Not Working</option>
           </select>
           </label>
          </div>
        </div>

          <div className="row check">
            <div className="input-field col s12 m6">
                  <p>
                     <label>
                    <input type="checkbox" id="negotiable"  onChange={this.handleCheck} />
                    <span>Negotiable Price</span>
                    </label>
                  </p>
               </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <textarea id="specification" name='specification' className="materialize-textarea browser-default" value={this.specification} onChange={this.handleChange}></textarea>
              <label  className="exempt" htmlFor="specification">Gadget Specifiaction </label>
            </div>
          </div>

          <div>
            <button className='btn' onClick={this.Submit}>Save</button>
            { this.props.loader ? <img src={Loader} alt="loader" /> : null }
            {this.props.alert.status ? <Alert severity={this.props.alert.severity}>{this.props.alert.message}</Alert>: null}
          </div>

      </>
    )
  }

}

export default Form1;
