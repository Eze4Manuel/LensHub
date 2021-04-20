
import React, { Component }  from "react";
import ReactDOM from "react-dom";

import Pagination from './homeviews/Pagination';

   // core components
import Admin from "./layouts/Admin.js";

import "./assets/css/material-dashboard-react.css";
import { ITEMPRODUCT, ITEMPRODUCT_API_BASE_URL, ITEMPRODUCT_APP_URL } from './config';

class ItemProduct extends Component {
  state = {
    totalItems: 0,
    skip: 0,
    take: 2,
    item: {}
  }
  componentDidMount() {
    $.ajax({
      url: ITEMPRODUCT_API_BASE_URL + '/getUniqueProduct/?product_id='+ ITEMPRODUCT , method: "GET", })
      .done(res =>{
       this.setState({item: res})
       console.log(res.photos);
       console.log(Object.values(res.photos));
      })
      .fail(err => console.log(err))
  }


  render(){

      return(
         <div className="itemProduct">
            <div className="row">
              {(this.state.item.photos != null) ? Object.values(this.state.item.photos).map( (val, ind)=>{
                <div className="col s4" style={{
                                                        backgroundImage: "url(" + ITEMPRODUCT_APP_URL + '/storage/' + val.slice(7) + ")",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        height: '200px'
                                                      }}>

                </div>
              }) : null
              }
            </div>
            <div className="row">
                <div className="col s12 m6">
                  <ul>
                  <li>{this.state.item.product_name} </li>
                  <li>N {this.state.item.product_price} </li>
                  <li>{this.state.item.category} </li>
                  <li>{(this.state.item.condition == 0)} </li>
                  <li>{this.state.item.negotiable ? this.state.item.negotiable.replace('_', ' '): ''} </li>
                  <li>{this.state.item.specifications ? this.state.item.specifications: ''} </li>
                  </ul>
                </div>
                <div className="col s12 m6">
                <ul>
                <li>{this.state.item.useremail} </li>
                <li>{this.state.item.userphone} </li>
                <li>{this.state.item.location} </li>
                 </ul>
                </div>
            </div>
         </div>
      );
  };
}
export default ItemProduct;

if (document.getElementById('itemProduct')) {
     ReactDOM.render(<ItemProduct/>, document.getElementById('itemProduct'));
}
