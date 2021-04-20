import React, { Component } from 'react'
import ReactDOM from 'react-dom';




export default class Pagination extends React.Component {
  state = {
    active: 1,
   }
  componentDidMount(){

  }
  handleClick = e => {
     this.setState({active: e.target.id})
    this.props.handleBatch(e.target.id);
  }

  handlePrev = (e, active) => {
     if (this.state.active != 1) {
      this.setState(prevState => ({
        active: prevState.active - 1
      }))
      this.props.handleBatch( this.state.active - 1 );
    }
  }

  handleNext = ( e, active) => {
      if(this.state.active != e){
      this.setState(prevState => ({
        active: prevState.active + 1
      }))
      this.props.handleBatch( this.state.active + 1 );
    }
  }


  render(){
     const pages = Math.ceil(this.props.totalItems / this.props.take) ;
    const arr = [];
    for (var i = 0; i < pages; i++){
         arr[i] = <li key={i+1}  onClick={this.handleClick} className={(  (this.state.active == (i+1) )? "active" : "waves-effect")}><a href="#!" id={i+1}> {i+1}</a></li>;
      }

     return(
       (pages > 0)?
          <ul className="pagination" style={{textAlign: "center"}}>
            <li onClick={()=> this.handlePrev(1, this.state.active)} className={this.state.active === 1 ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
             {arr}
            <li onClick={() => this.handleNext(pages, this.state.active)} className={ (this.state.active === pages) ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        : null
    )
  }
}
