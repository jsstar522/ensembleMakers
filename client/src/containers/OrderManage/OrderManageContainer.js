import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderManageWrapper } from '../../components/OrderManage/OrderManageWrapper';
import { OrderManageState } from '../../components/OrderManage/OrderManageState';
import { OrderManageList } from '../../components/OrderManage/OrderManageList';
import { OrderManageDetail } from '../../components/OrderManage/OrderManageDetail';
import * as orderActions from '../../store/modules/order';
import * as modalActions from '../../store/modules/modal';
import * as reviewActions from '../../store/modules/review';
import { formatDate } from '../../lib/dateFunction';

class OrderManageContainer extends Component {

  // 로그인 정보 받은 후(props를 받은 후) 실행
  componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { OrderActions } = this.props;
      OrderActions.getOrdersByMakerId(nextProps.loggedInfo.get('_id'))
    }
  }

  handleChangeView = (view) => {
    const { OrderActions } = this.props;
    OrderActions.changeView(view);
  }

  handleChangeImgTextView = (view) => {
    const { OrderActions } = this.props;
    OrderActions.changeImgTextView(view);
  }

  handleGetById = async(id) => {
    const { OrderActions, ReviewActions } = this.props;

    try {
      await OrderActions.getOrderById(id);
      await ReviewActions.getReviewById(id);
      // // order detail 창 보이기
      await OrderActions.changeDetailView(true)

    }catch(e) {
      console.log(e);
    }
  };

  handleChangeState = async(state) => {
    const { OrderActions } = this.props;
    const { orderById } = this.props;
    const id = orderById.get('_id');

    try {
      await OrderActions.changeState({id, state})
      // order detail view 초기화
      await OrderActions.changeDetailView(false);
      // orderById state 초기화
      await OrderActions.orderInit();
    }catch(e) {
      console.log(e);
    }
  }

  handleOpenEditorModal = () => {
    const { orderById } = this.props;
    const { ModalActions } = this.props;
    ModalActions.show({
      visible: "editor",
      mode: "modify",
      modalContents: orderById.get('contents'),
      preModalContents: orderById.get('contents'),
      // 등록되어있는 modelImage를 모달 modelImage와 imageURL(미리보기)로 넘긴다.
      modelImage: orderById.get('modelImage')
    })
  }

  handleOpenImageModal = () => {
    const { ModalActions } = this.props;
    ModalActions.show({
      visible: "image"
    })
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

  handleDeleteOrder = async(id) => {
    const { OrderActions } = this.props;
    const { orderById, allOrders } = this.props;

    let modelImage = ''
    if(orderById.get('modelImage')){
      modelImage = orderById.get('modelImage').split('/')[2]
    }
    const index = allOrders.findIndex(order => order._id === orderById.get('_id'))

    try {
      await OrderActions.deleteOrder({
        id: orderById.get('_id'),
        modelImage: modelImage,
        index: index
      })
      // order detail view 초기화
      await OrderActions.changeDetailView(false);
      // orderById 초기화
      await OrderActions.orderInit();
    }catch(e) {
      console.log(e);
    }
  }

  render() {
    const { view, detailView, imgTextView, allOrders, orderById, review } = this.props;
    const { handleChangeView, handleChangeImgTextView, handleGetById, handlePostOrder, handleChangeState, handleOpenEditorModal, handleOpenImageModal, handlePatchProcessingNext, handlePatchProcessingPre, handleDeleteOrder } = this;
    
    return(
      <OrderManageWrapper>
        <OrderManageState
          state={view}
          handleChangeView={handleChangeView}
        />
        <OrderManageList
          allOrders={allOrders}
          selectedId={orderById.get('_id')}
          view={view}
          handleGetById={handleGetById}
        />
        <OrderManageDetail
          id={orderById.get('_id')}
          orderNumber={orderById.get('orderNumber')}
          name={orderById.getIn(['customerInfo', 'name'])}
          phone={orderById.getIn(['customerInfo', 'phone'])}
          address={orderById.getIn(['customerInfo', 'address'])}
          date={formatDate(orderById.get('createdAt'))}
          state={orderById.get('state')}
          contents={orderById.get('contents')}
          detail={orderById.toJS().detail}
          images={orderById.toJS().images}
          modelImage={orderById.toJS().modelImage}
          imgTextView={imgTextView}
          detailView={detailView}
          lastComplete={orderById.toJS().lastComplete && formatDate(orderById.toJS().lastComplete)}
          cutComplete={orderById.toJS().cutComplete && formatDate(orderById.toJS().cutComplete)}
          upperComplete={orderById.toJS().upperComplete && formatDate(orderById.toJS().upperComplete)}
          soleComplete={orderById.toJS().soleComplete && formatDate(orderById.toJS().soleComplete)}
          processingState={orderById.toJS().processingState}
          review={review.toJS()}
          handleChangeState={handleChangeState}
          handleChangeImgText={handleChangeImgTextView}
          handleOpenEditorModal={handleOpenEditorModal}
          handleOpenImageModal={handleOpenImageModal}
          handlePatchProcessingNext={handlePatchProcessingNext}
          handlePatchProcessingPre={handlePatchProcessingPre}
          handleDeleteOrder={handleDeleteOrder}
        />
      </OrderManageWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    view: state.order.get('view'),
    detailView: state.order.get('detailView'),
    imgTextView: state.order.get('imgTextView'),
    allOrders: state.order.get('allOrders'),
    orderById: state.order.get('orderById'),
    review: state.review.get('data'),
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(OrderManageContainer);