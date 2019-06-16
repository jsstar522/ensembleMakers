import React, { Component } from 'react';
import './Review.scss';

class Review extends Component {
  render() {
    return(
      <div className="review-wrapper">
        <div className="review-header">후기</div>
        <div className="review-rating">별들어갈 곳 4.5</div>
        <div className="review-date">날짜 들어갈 곳</div>
        <div className="review-contents">정말 좋았습니다. 구두가 정말 예뻐요 감사히 잘 신겠습니다.</div>
      </div>
    )
  }
}

export default Review;