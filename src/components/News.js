/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log("Constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    // document.title = `${this.props.category}`;
  }

  // async update(){
  //   const url =
  //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=621fc30026e2499e86e27ba70045f64d&page=${this.props.pageSize}pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log(parseData);
  //   this.setState({
  //     articles: parseData.articles,
  //     totalResults: parseData.totalResults,
  //     loading: false
  //   });

  // }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=621fc30026e2499e86e27ba70045f64d&page=1pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    // this.update()
  }
  handlenext = async () => {
    console.log("next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=621fc30026e2499e86e27ba70045f64d&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false,
      });
    }
    // this.setState({page:this.state.page+1});
    // this.update()
  };
  handleprevious = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=621fc30026e2499e86e27ba70045f64d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
    // this.setState({page:this.state.page-1});
    // this.update()
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsApp- Top Headlines on {this.props.category}</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div
          className="container d-flex justify-content-between"
          style={{ marginTop: "26px" }}
        >
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevious}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenext}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;
