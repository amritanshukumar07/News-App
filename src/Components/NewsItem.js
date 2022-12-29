import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      
    let {title,description,imageUrl,newsURL} = this.props;
     
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://images.news18.com/ibnlive/uploads/2022/10/iphone-se-2022-price-166589570916x9.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a rel="noreferrer" href={newsURL} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
