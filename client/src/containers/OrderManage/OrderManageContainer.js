import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderManageWrapper } from '../../components/OrderManage/OrderManageWrapper';
import { OrderManageState } from '../../components/OrderManage/OrderManageState';
import { OrderManageList } from '../../components/OrderManage/OrderManageList';
import { OrderManageDetail } from '../../components/OrderManage/OrderManageDetail';
import * as orderActions from '../../store/modules/order';
import * as customerActions from '../../store/modules/customer';
import * as modalActions from '../../store/modules/modal';
import * as reviewActions from '../../store/modules/review';
import { formatDate } from '../../lib/dateFunction';

class OrderManageContainer extends Component {

  // 로그인 정보 받은 후(props를 받은 후) 실행
  componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { CustomerActions } = this.props;
      CustomerActions.getCustomerInfoByMakerId(nextProps.loggedInfo.get('_id')) 
    }
  }

  handleViewChange = (view) => {
    const { OrderActions } = this.props;
    OrderActions.viewChange(view);
  }

  handleImgTextViewChange = (view) => {
    const { OrderActions } = this.props;
    OrderActions.imgTextViewChange(view);
  }

  handleGetById = async(id) => {
    const { allCustomers, customerById, postForm } = this.props;
    const { CustomerActions, OrderActions, ReviewActions } = this.props;

    const customerInfo = allCustomers.find(customer => customer._id === id );

    try {
      await CustomerActions.getCustomerInfoById(customerInfo._id);
      await OrderActions.getOrderById(customerInfo._id);
      await ReviewActions.getReviewByCustomerId(customerInfo._id);
      // order detail 창 보이기
      await OrderActions.detailViewChange(true)
    }catch(e) {
      console.log(e);
    }
  };

  handleChangeState = async(state) => {
    const { CustomerActions, OrderActions } = this.props;
    const { customerById } = this.props;
    const id = customerById.toJS()._id;

    try {
      await CustomerActions.changeState({id, state})
      // order detail view 초기화
      await OrderActions.detailViewChange(false);
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

  render() {
    const { view, detailView, imgTextView, allCustomers, customerById, orderById, review } = this.props;
    const { handleViewChange, handleImgTextViewChange, handleGetById, handlePostOrder, handleChangeState, handleOpenEditorModal, handleOpenImageModal, handlePatchProcessingNext, handlePatchProcessingPre } = this;
    return(
      <OrderManageWrapper>
        <OrderManageState
          state={view}
          onClick={handleViewChange}
        />
        <OrderManageList
          allCustomers={allCustomers}
          view={view}
          customerById={customerById.toJS()._id}
          onClick={handleGetById}
        />
        <OrderManageDetail
          id={orderById.get('_id')}
          orderNumber={orderById.get('orderNumber')}
          name={orderById.getIn(['customerId', 'name'])}
          date={formatDate(orderById.getIn(['customerId', 'createdAt']))}
          phone={orderById.getIn(['customerId', 'phone'])}
          address={orderById.getIn(['customerId', 'address'])}
          state={orderById.getIn(['customerId', 'state'])}
          contents={orderById.get('contents')}
          // model={orderById.toJS().model}
          // rightSize={orderById.toJS().rightSize}
          // leftSize={orderById.toJS().leftSize}
          // last={orderById.toJS().last}
          // sole={orderById.toJS().sole}
          // midsole={orderById.toJS().midsole}
          // sockLining={orderById.toJS().sockLining}
          // heel={orderById.toJS().heel}
          // decoration={orderById.toJS().decoration}
          // // material={orderById.getIn(['material', 'value'])}
          // material={orderById.toJS().material}
          // innerMaterial={orderById.toJS().innerMaterial}
          // color={orderById.toJS().color}
          detail={orderById.toJS().detail}
          images={orderById.toJS().images}
          imgTextView={imgTextView}
          modelImage={orderById.toJS().modelImage}
          detailView={detailView}
          lastComplete={orderById.toJS().lastComplete && formatDate(orderById.toJS().lastComplete)}
          cutComplete={orderById.toJS().cutComplete && formatDate(orderById.toJS().cutComplete)}
          upperComplete={orderById.toJS().upperComplete && formatDate(orderById.toJS().upperComplete)}
          soleComplete={orderById.toJS().soleComplete && formatDate(orderById.toJS().soleComplete)}
          processingState={orderById.toJS().processingState}
          review={review.toJS()}
          onChangeState={handleChangeState}
          onChangeImgText={handleImgTextViewChange}
          onOpenEditorModal={handleOpenEditorModal}
          onOpenImageModal={handleOpenImageModal}
          onPatchProcessingNext={handlePatchProcessingNext}
          onPatchProcessingPre={handlePatchProcessingPre}
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
    allCustomers: state.customer.get('allCustomers'),
    customerById: state.customer.get('customerById'),
    allOrders: state.order.get('allOrders'),
    orderById: state.order.get('orderById'),
    review: state.review.get('data'),
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    CustomerActions: bindActionCreators(customerActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(OrderManageContainer);