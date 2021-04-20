
import React, { Component }  from "react";
import ReactDOM from "react-dom";

import Pagination from './homeviews/Pagination';

// core components
import Admin from "./layouts/Admin.js";

import "./assets/css/material-dashboard-react.css";
import { ITEM, ITEM_API_BASE_URL, ITEM_APP_URL } from './config';

class Item extends Component {
  state = {
    totalItems: 0,
    skip: 0,
    take: 2,
    item: [],
    category: "",
    filtered: false,
    price: 10000000000,
    location: ""

  }
  componentDidMount(){
     this.state.category = ITEM;

    $.ajax({
      url: ITEM_API_BASE_URL + '/getItem/?skip='+ this.state.skip +'&take='+ this.state.take + '&category='+ ITEM, method: "GET", })
      .done(res =>{
        this.setState( prevState => ({
          item: res,
          totalItems: res.length,
         }) )

      })
      .fail(err => console.log(err))

      $.ajax({
        url: ITEM_API_BASE_URL + '/getTotalItem/?category='+ ITEM, method: "GET", })
        .done(res =>{
          this.setState({ totalItems: res })
         console.log(res)
       })
        .fail(err => console.log(err))
  }

  handleBatch = (e) => {
    (!this.state.filtered)? (
    $.ajax({
      url: ITEM_API_BASE_URL + '/getItem/?skip='+( (this.state.take * e) - this.state.take) + '&take='+ this.state.take + '&category='+ this.state.category, method: "GET", })
      .done(res =>{
        console.log(res);
        this.setState( prevState => ({
          item: res,
         }) )
      })
      .fail(err => console.log(err))
    )
    :
    (
      $.ajax({
        url: ITEM_API_BASE_URL + '/getFilterItem/?skip='+( (this.state.take * e) - this.state.take) + '&take='+ this.state.take + '&price='+ this.state.price + '&location='+ this.state.location + '&category='+ this.state.category, method: "GET", })
        .done(res =>{
          console.log(res);
          this.setState( prevState => ({
            item: res.product,
           }) )
        })
        .fail(err => console.log(err))
    )


  }

  handleFilter = ( price, location ) => {
    this.setState({ filtered: true, price: price, location: location });

    $.ajax({
      url: ITEM_API_BASE_URL + '/getFilterItem/?skip='+this.state.skip  + '&take='+ this.state.take + '&price='+ price + '&location='+ location + '&category='+ this.state.category, method: "GET", })
      .done(res =>{

        console.log(res);
        console.log(res.product);
        this.setState({
          item: res.product,
          totalItems: res.total
        })

      })
      .fail(err => console.log(err))
  }


  render(){
    const list = this.state.item.map( (card, index) => {
      return(
        <div className="col s6 m4 l3" key={index}>
        <div className="card">
        <div className="card-image" style={{
                                                backgroundImage: "url(" + ITEM_APP_URL + '/storage/' + card.photos[0].slice(7) + ")",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                height: '200px'
                                              }}>
            <a href={"product/" + card.product_id} className="btn-floating halfway-fab waves-effect red"><i className="material-icons">add</i></a>
          </div>
          <div className="card-content">
            <p className="tip" style={{fontSize: "13px", fontWeight: ""}}>{card.product_name}</p>

            <p ><b>N </b>{card.product_price}</p>
          </div>
          <div className="card-action">
             <a>{card.renterName}</a>
            <a>{card.category}</a>
          </div>
        </div>
        </div>
      )
    })


      return(
         <div className="items">
            <Filter handleFilter = { this.handleFilter}/>
            <div className="row">
              {list}
            </div>

            <Pagination
            totalItems = {this.state.totalItems}
            handleBatch = {this.handleBatch}
            take = { this.state.take }
            category = {this.state.category}
            />

         </div>
      );
  };
}


class Filter extends React.Component {
   state = {
     price: 10000000000,
     location: "",

   }
   componentDidMount(){
     this.setState({take: this.props.take})
   }


     handlePriceChange = (event) => {
      this.setState({price: event.target.value});
     }

      handleLocationChange = (event) => {
       this.setState({location: event.target.value});

      }

    handleSubmit = (event) => {
       event.preventDefault();
       this.props.handleFilter(this.state.price, this.state.location);



    }

   render(){
     return(
       <div className="filter">
           <form onSubmit={this.handleSubmit}>
             <label>Price</label>
            <select onChange={this.handlePriceChange}>
                <option value="10000000000">All</option>
                <option value="5000">Less than N5,000</option>
                <option value="10000">Less than N10,000</option>
                <option value="50000">Less than N50,000</option>
                <option value="1000000">Less than N100,000</option>
                <option value="10000000000">more than N100,000</option>
            </select>
            <label>Location</label>
             <select onChange={this.handleLocationChange}>
                <option value="">All</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="kano">Kano</option>
              </select>
             <input className='button btn' type="submit" value="Filter"/>
           </form>
       </div>
     )
   }
}





export default Item;

if (document.getElementById('item')) {
     ReactDOM.render(<Item/>, document.getElementById('item'));
}
