
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import CountUp from 'react-countup';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Owl from './homeviews/Owl';
import Pagination from './homeviews/Pagination';
import {Owl2} from './homeviews/Owl';
import img1 from '../../../public/images/slider/img1.jpg'
import img2 from '../../../public/images/slider/img2.jpg'
import img3 from '../../../public/images/slider/img3.jpg'
import img4 from '../../../public/images/slider/img4.jpg'

import camera from '../../../public/images/categories/camera.png'
import drones from '../../../public/images/categories/drones.png'
import mic from '../../../public/images/categories/mic.png'
import lights from '../../../public/images/categories/lights.png'
import lens from '../../../public/images/categories/lens.png'
import camAcces from '../../../public/images/categories/cam-acces.jpg'
import camSupport from '../../../public/images/categories/cam-support.png'

import { HOME_API_BASE_URL } from './config';


class Slider extends Component{
  componentDidMount() {
    let slides = document.querySelectorAll('.slider');
    let parallax = document.querySelectorAll('.parallax');
    let dropdown = document.querySelectorAll('.dropdown-trigger');
      M.Slider.init(slides, {});
      M.Parallax.init(parallax, {});
      }
  render () {
      return (
         <div className="slider">
             <ul className="slides">
               <li>
                 <img src={img1} alt="imageslide"/>
                 <div className="caption center-align">
                 <h3> Be Independent and Progressive </h3>
                 </div>
               </li>
               <li>
               <img src={img4} alt="imageslide"/>
               <div className="caption center-align">
                 <h3>Make Products with Ease</h3>
                </div>
               </li>
               <li>
                 <img src={img2} alt="imageslide"/>
                 <div className="caption center-align">
                   <h3>  Photos, Films, Pictures</h3>
                  </div>
               </li>

             </ul>
           </div>
     )
  }
}

function Text(){
  return(
    <div className='rent-text'>
        <h2>Rent your shots. Rent your films. Rent all the equipment you need.</h2>
        <p>Search a lot of tech gadgets placed for offer by various branding and production companies, rental shops, vintage houses and personal owner-operators. Get the best for your money</p>
    </div>
  )
}


class Category extends Component {
  state = {
    image: [camera, lens, drones, mic, lights, camSupport, camAcces, mic],
    title: ["Cameras", "Lens", "Drones", "Sound", "Light", "Camera Support", "Camera Accessories", "Camera Personnel"],
    link: ["camera", "lens", "drones", "sound", "light", "camera_support", "camera_accessories", "Camera Personnel"],
    responsive:{   0: { items: 1,}, 550: {items: 2,},800: {items: 3},1000: {items: 4,} },
  }

  handleClick = e => {

  }

  render(){
    const cats = this.state.title.map( ( val, ind ) => (
      <a href={"item/" + this.state.link[ind]}  onClick={this.handleClick}  key={ind} style={{cursor: "pointer"}}>
         <div className='cat'>
           <img id={this.state.link[ind]} src={this.state.image[ind]} alt="val"/>
           <p id={this.state.link[ind]} className="center"> {val}  </p>
         </div>
      </a>
    ));

    return(
      <OwlCarousel className="owl-carousel owl-theme categories"
      center startPosition={2} loop margin={40} nav items={4} responsive={this.state.responsive}>
          {cats}
     </OwlCarousel>
    )
  }
}


class Products extends Component{
     state = {
          category: 'all',
          loader: false,
       };



  componentDidMount(){

  }

  handleCategory = (category) => {
    this.setState({ category: category }, this.handleBatch(1, category));
  }



render(){
  return (
    <div className='products'>
      <div className="filter">
        <h4>Top Categories</h4>

        <Category handleCategory = { this.handleCategory } />


      </div>

     </div>
  )
 }
}


function Sect1 () {
  return (
    <div className="sect1">
      <div className="rowed">
         <div className="col s12 m6">
             <h3>Turn your gear into cash. </h3>
             <p>List your gear on LensHub and rent to other professionals in need</p>
             <p className="btn"> Rent Already </p>
         </div>
         <div className="col s12 m6">
             <img src={img4} alt="rent image" />
         </div>
      </div>

      <div className="col s12 m12 subtext">
        <p> LensHub is Trusted Daily by Photographers, Filmmakers, Video Producers, Cinematographers and Individuals
        Become an independent gear owner anyday. Use LensHub economically viable solution to the suit your visual, audio and tech needs</p>
      </div>
    </div>
  )
}


///////////////////////////////////////////////////////////////////////////////

class Home extends Component {
  render () {
      return (
         <div className='wrapper'>
            <Slider/>
             <Text />
             <Products />
             <Sect1 />
           </div>
     )
  }
}
export default Home;

if (document.getElementById('home')) {
     ReactDOM.render(<Home/>, document.getElementById('home'));
}
