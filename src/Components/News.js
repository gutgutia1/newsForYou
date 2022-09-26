import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
// import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    pagesize:5,
    country:"in",
    category:"scinece"
  }

  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${this.props.pagesize}&page=${this.state.page}`;
    this.setState({
      loading : true});
    let resp = await fetch(url);
    let data = await resp.json();
    let totalResults = await data.totalResults;
    this.setState({
      article: data.articles,
      totalResults: totalResults,
      loading: false,
    });
  }

  handleP = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}s&category=${this.props.category}&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${
      this.props.pagesize
    }&page=${this.state.page - 1}`;
    this.setState({
      loading : true});
    let resp = await fetch(url);
    let data = await resp.json();
    let totalResults = await data.totalResults;
    this.setState({
      article: data.articles,
      page: this.state.page - 1,
      totalResults: totalResults,
      loading: false
    });
  };
  handleN = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}s&category=${this.props.category}&apiKey=d9f3d72f8dc948048aab56c9535e1b33&pagesize=${
      this.props.pagesize
    }&page=${this.state.page + 1}`;
    this.setState({
      loading : true});
    let resp = await fetch(url);
    let data = await resp.json();
    let totalResults = await data.totalResults;
    if (this.state.page + 1 > Math.ceil(totalResults / this.props.pagesize)) {
    } else {
      this.setState({
        article: data.articles,
        page: this.state.page + 1,
        totalResults: totalResults,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">All your news</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.article.map((element) => { 
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <Newsitem
                  title={element.title}
                  desc={element.description}
                  imgurl={element.urlToImage}
                  url={element.url}
                ></Newsitem>
              </div>
            );
          })}
          <div className="cont d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handleP}
            >
              Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pagesize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleN}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
