import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    
  constructor(){
    super();
    // console.log("hello i am a constructor from the news component");
    this.state={
        articles : [],
        loading : false,
        page : 1
    }
  }

  async componentDidMount(){
    
    let dataUrl = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=b251a1f92409451583dfe3d890becd2a&page=1&pageSize=${this.props.pageSize}`);
    let parsedData = await dataUrl.json();
    // console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

  handlePrevClick = async ()=>{
 console.log("previous")
 let dataUrl = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=b251a1f92409451583dfe3d890becd2a&page=${this.state.page -1}&pageSize=${this.props.pageSize}`);
   this.setState({loading:true});
 let parsedData = await dataUrl.json();
    // console.log(parsedData);
    
    this.setState({
      page : this.state.page-1,
      articles: parsedData.articles,
      loading: false
    })
  }

  handleNextClick = async ()=>{
console.log("next")
if( !(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

let dataUrl = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=b251a1f92409451583dfe3d890becd2a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);
this.setState({loading:true});    
let parsedData = await dataUrl.json();
    // console.log(parsedData);
    
    this.setState({
      page : this.state.page+1,
      articles: parsedData.articles,
      loading:false
    })
  }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">My NewsApp - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row my-3 ">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsURL={element.url} />
            </div>
        })}  
        </div> 
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &laquo; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
      </div>
      </div>

      
    )
  }
}

export default News
