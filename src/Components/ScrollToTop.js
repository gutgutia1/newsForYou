import React, { Component } from 'react'

export class ScrollToTop extends Component {
     scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
      };
    
  render() {
    return (
      <div className="text-center">
        <button onClick={this.scrollToTop} type="button" className="btn btn-default btn-lg">Scroll to Top </button>
      </div>
    )
  }
}

export default ScrollToTop
