import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,desc,imgurl,url}=this.props
    return (
        <div className="card" >
        <img src={!imgurl?"https://images.mktw.net/im-624661/social":imgurl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <a href={url} target="_blank" rel="noreferrer"className="btn btn-dark">Read full News</a>
        </div>
      </div>
    )
  }
}

export default Newsitem
