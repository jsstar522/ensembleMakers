import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderWrapper } from '../../components/Order/OrderWrapper';
import { ProcessingControll } from '../../components/Order/ProcessingControll';
import { MakerInfo } from '../../components/Order/MakerInfo';
import { ReviewPost } from '../../components/Order/ReviewPost';
import { ReviewRead } from '../../components/Order/ReviewRead';
import * as orderActions from '../../store/modules/order';
import * as reviewActions from '../../store/modules/review';
import { formatDate } from '../../lib/dateFunction';

class OrderContainer extends Component {

  componentDidMount() {
    const { OrderActions, ReviewActions } = this.props;
    const { id, review, orderById } = this.props;
    OrderActions.getOrderByNum(id);
    ReviewActions.getReviewByNum(id);
  }

  handleChangeMode = (mode) => {
    const { ReviewActions } = this.props;
    ReviewActions.changeMode(mode);
  }

  handleChangeReviewInput = (value) => {
    const { ReviewActions } = this.props;
    ReviewActions.changeInput(value);
  }

  handleChangeReviewRating = (rating) => {
    const { ReviewActions } = this.props;
    ReviewActions.changeRating(rating);
  }

  handlePostReview = async() => {
    const { ReviewActions } = this.props;
    const { review, orderById } = this.props;
    let data = review.toJS().data;
    // payload에 orderById 추가
    data['orderNumber'] = orderById.get('orderNumber');
    data['customerId'] = orderById.getIn(['customerId', '_id']);
    await ReviewActions.postReview(data);
    await ReviewActions.changeMode('read');
  }

  handlePatchReview = async() => {
    const { ReviewActions } = this.props;
    const { review, orderById } = this.props;
    let data = review.toJS().data;
    const id = orderById.get('orderNumber')
    await ReviewActions.patchReview({ id, data })
    await ReviewActions.changeMode('read');
  }

  handlePatchProcessingNext = async(id, processing) => {
    const { OrderActions } = this.props;
    OrderActions.patchProcessing({
      id: id, 
      processing: processing});
    OrderActions.changeProcessingState({
      id: id,
      processingState: 'next'
    });
  }

  handlePatchProcessingPre = async(id, processing) => {
    const { OrderActions } = this.props;
    OrderActions.deleteProcessing({
      id: id, 
      processing: processing});
    OrderActions.changeProcessingState({
      id: id,
      processingState: 'pre'
    });
  }

  render() {
    const { orderById, review } = this.props;
    const state = orderById.getIn(['customerId', 'state']);
    const mode = review.get('mode');
    const { handleChangeMode, handleChangeReviewInput, handleChangeReviewRating, handlePostReview, handlePatchReview, handlePatchProcessingNext, handlePatchProcessingPre } = this;

    return(
      <OrderWrapper>
        <ProcessingControll
          id={orderById.get('_id')}
          orderNumber={orderById.get('orderNumber')}
          name={orderById.getIn(['customerId', 'name'])}
          date={formatDate(orderById.getIn(['customerId', 'createdAt']))}
          phone={orderById.getIn(['customerId', 'phone'])}
          state={orderById.getIn(['customerId', 'state'])}
          lastComplete={orderById.toJS().lastComplete && formatDate(orderById.toJS().lastComplete)}
          cutComplete={orderById.toJS().cutComplete && formatDate(orderById.toJS().cutComplete)}
          upperComplete={orderById.toJS().upperComplete && formatDate(orderById.toJS().upperComplete)}
          soleComplete={orderById.toJS().soleComplete && formatDate(orderById.toJS().soleComplete)}
          processingState={orderById.toJS().processingState}
          onPatchProcessingNext={handlePatchProcessingNext}
          onPatchProcessingPre={handlePatchProcessingPre}
        />
        <MakerInfo/>
        { // 작업완료시 리뷰읽기
          state==="finished" && mode==="read" && <ReviewRead
            reviewId={review.toJS().data._id}
            reviewRating={review.getIn(['data', 'rating'])}
            reviewContent={review.getIn(['data', 'content'])}
            onChangeMode={handleChangeMode}
          />
        }
        { // 작업완료시 리뷰쓰기
          state==="finished" && (mode==="modify" || mode==="write") && <ReviewPost
            review={review}
            mode={mode}
            reviewRating={review.getIn(['data', 'rating'])}
            reviewContent={review.getIn(['data', 'content'])}
            onChangeReviewInput={handleChangeReviewInput}
            onChangeReviewRating={handleChangeReviewRating}
            onPostReview={handlePostReview}
            onPatchReview={handlePatchReview}
            onChangeMode={handleChangeMode}
          />
        }
      </OrderWrapper>
    )
  }
}

export default connect(
  (state) => ({
    orderById: state.order.get('orderById'),
    review: state.review,
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(OrderContainer);