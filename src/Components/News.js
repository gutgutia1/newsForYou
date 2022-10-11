import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "./ScrollToTop"
// import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    pagesize: 5,
    country: "in",
    category: "scinece",
  };

  constructor() {
    super();
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResults: 0,
      visible : false
    };
  }
  async componentDidMount() {
    this.props.setProgress(40)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${this.props.pagesize}&page=${this.state.page}`;
    this.setState({
      loading: true,
    });
    let resp = await fetch(url);
    let data = await resp.json();
    let totalResults = await data.totalResults;
    this.setState({
      article: data.articles,
      totalResults: totalResults,
      loading:false
    });
    this.props.setProgress(100)
    
  }

  // handleP = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${
  //     this.props.pagesize
  //   }&page=${this.state.page - 1}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let resp = await fetch(url);
  //   let data = await resp.json();
  //   let totalResults = await data.totalResults;
  //   this.setState({
  //     article: data.articles,
  //     page: this.state.page - 1,
  //     totalResults: totalResults,
  //     loading: false,
  //   });
  // };
  // handleN = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${
  //     this.props.pagesize
  //   }&page=${this.state.page + 1}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let resp = await fetch(url);
  //   let data = await resp.json();
  //   let totalResults = await data.totalResults;
  //   if (this.state.page + 1 > Math.ceil(totalResults / this.props.pagesize)) {
  //   } else {
  //     this.setState({
  //       article: data.articles,
  //       page: this.state.page + 1,
  //       totalResults: totalResults,
  //       loading: false,
  //     });
  //   }
  // };

  toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300 && !this.state.loading){
      this.setState({
        visible:true
      })
    } 
    else if (scrolled <= 300){
      this.setState({
        visible:true
      })
    }
  };

  fetchMoreData = async () => {
    this.setState({
      page:this.state.page+1
    })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${this.props.pagesize}&page=${this.state.page+1}`;
    let resp = await fetch(url);
    let data = await resp.json();
    let totalResults = await data.totalResults;
    this.setState({
      article: this.state.article.concat(data.articles),
      totalResults: totalResults,
    });
    
  };
  
  render() {
    document.title = `News for you on ${this.props.category}`;
    window.addEventListener('scroll', this.toggleVisible);
    return (
      <>
        <h1 className="text-center">
          News from {this.props.category} category
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.article.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <Newsitem
                    title={element.title}
                    desc={element.description}
                    imgurl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  ></Newsitem>
                  
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {this.state.visible && <ScrollToTop />}
      </>
    );
  }
}

export default News;
