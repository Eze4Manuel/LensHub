
import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Footer extends Component {

  render () {
      return (
      <div className="footer">
        <div className="row">
          <div className="col s6 m6 l3">
            <h3>About LensHub</h3>
             <ul>
                <li> <a href=""> What is ? </a></li>
                <li> <a href=""> Mission </a></li>
                <li> <a href=""> How to  </a></li>
                <li> <a href=""> Meet The Team </a></li>
                <li> <a href=""> Testimonials </a></li>
                <li> <a href=""> Faq </a></li>
                <li> <a href=""> Terms and Conditions </a></li>
                <li> <a href=""> Privacy Policy </a></li>
             </ul>
          </div>
          <div className="col s6 m6 l3">
            <h3>Locations </h3>
            <ul>
               <li> <a href="#"> Lagos </a></li>
               <li> <a href="#"> Kano </a></li>
               <li> <a href="#"> Accra  </a></li>
               <li> <a href="#"> Imo </a></li>
               <li> <a href="#"> Abuja </a></li>
               <li> <a href="#"> Jos</a></li>
               <li> <a href="#"> PHarcourt</a></li>
            </ul>
          </div>
          <div className="col s6 m6 l3">
             <h3>Connect </h3>
             <ul>
                <li> <a href="#"> Contact Us </a></li>
                <li> <a href="#"> Blog </a></li>
                <li> <a href="#"> +234 8104 4342 434 </a></li>
                <li> <a href="#"> +234 903 4354 434 </a></li>

             </ul>
          </div>
          <div className="col s6 m6 l3">
              <h3>Stay Linked </h3>
              <ul>
                  <form>
                      <input className="search" type="text" />
                      <input className='button btn' type="submit" value="Subscribe" />
                   </form>

                 <li> <a href="#"> lenshubng@gmail.com</a></li>
               </ul>
          </div>
        </div>
        <p> Copyright © {new Date().getFullYear()} | All rights Reserved</p>
      </div>
    )
  }
}
export default Footer;

if (document.getElementById('foot')) {
     ReactDOM.render(<Footer/>, document.getElementById('foot'));
}
