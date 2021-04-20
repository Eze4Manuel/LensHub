import React, { Component } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import img1 from '../../../../public/images/slider/img1.jpg'
import img2 from '../../../../public/images/slider/img2.jpg'
import img3 from '../../../../public/images/slider/img3.jpg'
import img4 from '../../../../public/images/slider/img4.jpg'

import { HOME_APP_URL } from '../config';



export default class Owl extends Component{
  state = {
    responsive:{
            0: { items: 1,}, 550: {items: 2,},800: {items: 3},1000: {items: 4,},
        },
     }

  render(){
    const cards = this.props.items.map((card, ind) => {
      return(
        <div className="card" key={ind}>
          <div className="card-image" style={{
                                                  backgroundImage: "url(" + HOME_APP_URL + '/storage/' + card.photos[0].slice(7) + ")",
                                                  backgroundPosition: 'center',
                                                  backgroundSize: 'cover',
                                                  backgroundRepeat: 'no-repeat'
                                                }}>
             <a className="btn-floating halfway-fab waves-effect red-text"><i className="material-icons">visibility</i></a>
          </div>
          <div className="card-content">
            <p className="tip">{card.product_name}</p>

            <p><b>N </b>{card.product_price}</p>
          </div>
          <div className="card-action">
          <a>{card.location}</a>
          <a>{card.category}</a>
           </div>
        </div>
      )}
    )

    return (
      <>
      {(this.props.items.length != 0)?
        <OwlCarousel className="owl-carousel owl-theme"
        center nav dots startPosition={2} loop margin={40} nav items={4} responsive={this.state.responsive}>
         {cards}
       </OwlCarousel>
        : null }

      </>
    )
  }
}



export class Owl2 extends Component{
  state = {  responsive:{ 0: { items: 1,}, 550: {items: 2,},800: {items: 3},1000: {items: 4,},  }, }

  render(){
    const cards2 = this.props.items2.map((card, ind) => {
      return(
        <div className="card" key={ind}>
          <div className="card-image" style={{
                                                  backgroundImage: "url(" + HOME_APP_URL + '/storage/' + card.photos[0].slice(7) + ")",
                                                  backgroundPosition: 'center',
                                                  backgroundSize: 'cover',
                                                  backgroundRepeat: 'no-repeat'
                                                }}>
             <a className="btn-floating halfway-fab waves-effect red"><i className="material-icons">add</i></a>
          </div>
          <div className="card-content">
            <p className="tip">{card.product_name}</p>

            <p><b>N </b>{card.product_price}</p>
          </div>
          <div className="card-action">
          <a>{card.location}</a>
          <a>{card.category}</a>
           </div>
        </div>
      )}
    )

    return (
      <>
      {(this.props.items2.length != 0) ?
        <OwlCarousel className="owl-carousel owl-theme"
        center margin={40} startPosition={2} nav responsive={this.state.responsive}>
           {cards2}
       </OwlCarousel>
        : null }

      </>
    )
  }
}





class RowTwo extends Component{
  state = {
    responsive:{
            0: { items: 1,}, 550: {items: 2,},800: {items: 3},1000: {items: 4,},
        },
    cards : [
      {productImage: img2, productName: "Cayon Case Membrane", price: 23.4, renterName: "Emeka Nwanem", renterImage: img4},
      {productImage: img4, productName: "Cayon Case Membrane", price: 23.4, renterName: "Emeka Nwanem", renterImage: img4},
      {productImage: img1, productName: "Cayon Case Membrane", price: 23.4, renterName: "Emeka Nwanem", renterImage: img4},
      {productImage: img2, productName: "Cayon Case Membrane", price: 23.4, renterName: "Emeka Nwanem", renterImage: img4},
      {productImage: img3, productName: "Cayon Case Membrane", price: 23.4, renterName: "Emeka Nwanem", renterImage: img4},
    ]
  }

  render(){
    return(
         <OwlCarousel className="owl-carousel owl-theme"
         center  margin={40} nav responsive={this.state.responsive} >

             <Card cards={this.state.cards} />
        </OwlCarousel>
     )
  }
}




//////////////////////////////////////////////////////////////////////////////
class Card extends Component{
  render(){
    const { cards } = this.props;
    const cardList = cards.map((card, index) => {
      return(
        <div className="card" key={index}>
          <div className="card-image">
            <img src={card.productImage}/>
            <a className="btn-floating halfway-fab waves-effect red"><i className="material-icons">add</i></a>
          </div>
          <div className="card-content">
            <p className="tip">{card.productName}</p>

            <p><b>N </b>{card.price} per day</p>
          </div>
          <div className="card-action">
            <img className='responsive-img' src={card.renterImage} alt='avartar' />
            <a>{card.renterName}</a>
            <a>{card.renterLocation}</a>
          </div>
        </div>
      )
    });

    return(
      <>
        {cardList}
      </>
    )
  }
}
