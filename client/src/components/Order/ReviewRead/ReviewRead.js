import React, { Component } from 'react';
import './ReviewRead.scss';

class ReviewRead extends Component {
  
  render() {
    const { reviewId, reviewRating, reviewContent } = this.props;
    const { onChangeMode } = this.props;

    // rating star
    let stars = [];
    for(let i = 0; i < 5; i++) {
      let klass = 'star-rating__star';
      if (reviewRating >= i && reviewRating != null) {
        klass += ' is-selected';
      }
      stars.push(
        <label
          key={i}
          className={klass}
        >★</label>
      );
    }

    return(
      <div className="review-read-wrapper">
        { reviewId ? <div className="review-change-mode-button" onClick={() => {onChangeMode("modify")}}>수정</div> :
          <div className="review-change-mode-button" onClick={() => {onChangeMode("write")}}>작성</div>
        }
        <div className="review-read-header">후기</div>
        <form className="review-read-form">
          <div className="review-read-rating">
            {stars}
          </div>
          <div className="review-read-contents">
            <div
              className="read-review-text">{reviewContent}</div>
          </div>
        </form>
      </div>
    )
  }
}

export default ReviewRead;