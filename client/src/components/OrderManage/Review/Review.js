import React, { Component } from 'react';
import './Review.scss';
import { formatDate } from '../../../lib/dateFunction';

class Review extends Component {
  render() {
    const { review } = this.props;
    const reviewRating = review.rating;
    
    // rating star
    let stars = [];
    for(let i = 0; i < 5; i++) {
      let klass = 'review__star';
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
      <div className="review-wrapper">
        <div className="review-header">후기</div>
        <div className="review-rating">{review.rating > -1 ? stars : null}</div>
        <div className="review-date">{review.createdAt && formatDate(review.createdAt)}</div>
        <div className="review-contents">{review.content || '리뷰가 아직 작성되지 않았습니다.'}</div>
      </div>
    )
  }
}

export default Review;