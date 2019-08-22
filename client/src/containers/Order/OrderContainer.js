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

  async componentDidMount() {
    const { OrderActions, ReviewActions } = this.props;
    const orderNumber = this.props.id;
    // getOrderByNum 결과 객체로 저장
    let orderId = await OrderActions.getOrderByNum(orderNumber);
    await ReviewActions.getReviewById(orderId.data._id);
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
    data['orderId'] = orderById.get('_id');
    await ReviewActions.postReview(data);
    await ReviewActions.changeMode('read');
  }

  handlePatchReview = async() => {
    const { ReviewActions } = this.props;
    const { review, orderById } = this.props;
    let data = review.toJS().data;
    const id = orderById.get('_id')
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
    const state = orderById.get('state');
    const mode = review.get('mode');
    const { handleChangeMode, handleChangeReviewInput, handleChangeReviewRating, handlePostReview, handlePatchReview, handlePatchProcessingNext, handlePatchProcessingPre } = this;

    return(
      <OrderWrapper>
        <ProcessingControll
          id={orderById.get('_id')}
          orderNumber={orderById.get('orderNumber')}
          name={orderById.getIn(['customerInfo', 'name'])}
          date={formatDate(orderById.get('createdAt'))}
          phone={orderById.getIn(['customerInfo', 'phone'])}
          state={state}
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