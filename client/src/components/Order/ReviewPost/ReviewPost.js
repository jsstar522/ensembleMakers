import React, { Component } from 'react';
import './ReviewPost.scss';

import MdRefresh from 'react-ionicons/lib/MdRefresh';

class ReviewPost extends Component {

  handleChange = (e) => {
    const { onChangeReviewInput } = this.props;
    onChangeReviewInput({
      value: e.target.value
    })
  }
  
  render() {
    const { mode, reviewRating, reviewContent } = this.props;
    const { onChangeReviewRating, onPostReview, onPatchReview, onChangeMode } = this.props;
    const { handleChange } = this;

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
          onClick={() => onChangeReviewRating(i)}
          // onMouseOver={this.star_over.bind(this, i)}
          // onMouseOut={this.star_out}
        >★</label>
      );
    }

    return(
      <div className="review-post-wrapper">
        <div className="review-cancel-button" onClick={() => onChangeMode('read')}>취소</div>
        <div className="review-post-button" onClick={mode==="write" ? onPostReview : onPatchReview}>저장</div>
        <div className="review-post-header">후기</div>
        <form className="review-post-form">
          <div className="review-post-rating">
            <div className="input-review-rating">
            <div className="rating-ref-text">평점을 매겨주세요.</div>
            {stars}
            </div>
            </div>
          <div className="review-post-contents">
            <textarea 
              className="input-review-text" 
              value={reviewContent}
              placeholder="후기를 작성해주세요." 
              spellCheck="false" 
              wrap="soft" 
              onChange={handleChange}/>
          </div>
        </form>
      </div>
    )
  }
}

export default ReviewPost;