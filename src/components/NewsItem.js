/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ backgroundColor: "grey" }}>
          <img
            src={
              !imageUrl
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE3dvtF-Xmv9HOYfjESJPVZDIgRfn--bdd7g&usqp=CAU"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            {" "}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
              style={{ marginLeft: "-47px", zIndex: "1" }}
            >
              {source}
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-white">
                By {!author ? "Unknown" : author} on {date}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
