import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderManageWrapper } from '../../components/OrderManage/OrderManageWrapper';
import { OrderManageState } from '../../components/OrderManage/OrderManageState';
import { OrderManageList } from '../../components/OrderManage/OrderManageList';
import { OrderManageDetail } from '../../components/OrderManage/OrderManageDetail';
import { DetailInput } from '../../components/OrderManage/DetailInput';
import * as orderActions from '../../store/modules/order';
import * as customerActions from '../../store/modules/customer';
import * as modalActions from '../../store/modules/modal';

class OrderManageContainer extends Component {
  
  componentDidMount() {
    // OrderManageList에 customerInfo 불러오기
    const { CustomerActions } = this.props;
    CustomerActions.getAllCustomerInfo();
  }

  handleViewChange = (view) => {
    const { OrderActions } = this.props;
    OrderActions.viewChange(view)
  }

  handleImgTextViewChange = (view) => {
    const { OrderActions } = this.props;
    OrderActions.imgTextViewChange(view);
  }

  handleGetById = async(id) => {
    const { allCustomers, customerById, postForm } = this.props;
    const { CustomerActions, OrderActions } = this.props;

    const customerInfo = allCustomers.find(customer => customer._id === id );

    try {
      await CustomerActions.getCustomerInfoById(customerInfo._id)
      await OrderActions.getOrderById(customerInfo._id)
    }catch(e) {
      console.log(e);
    }
  };

  handleChangeState = async(state) => {
    const { CustomerActions } = this.props;
    const { customerById } = this.props;
    const id = customerById.toJS()._id;

    try {
      await CustomerActions.changeState({id, state})
    }catch(e) {
      console.log(e);
    }
  }

  handleOpenEditorModal = () => {
    const { orderById } = this.props;
    const { ModalActions } = this.props;

    ModalActions.show({
      visible: "editor",
      modalContents: orderById.toJS()
    })
  }

  handleOpenImageModal = () => {
    const { ModalActions } = this.props;
    ModalActions.show({
      visible: "image"
    })
  }

  render() {
    const { view, imgTextView, allCustomers, customerById, orderById } = this.props;
    const { handleViewChange, handleImgTextViewChange, handleGetById, handlePostOrder, handleChangeState, handleOpenEditorModal, handleOpenImageModal } = this;

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
          name={orderById.getIn(['customerId', 'name'])}
          date={customerById.get('createdAt')}
          phone={customerById.get('phone')}
          state={orderById.getIn(['customerId', 'state'])}
          model={orderById.toJS().model}
          rightSize={orderById.toJS().rightSize}
          leftSize={orderById.toJS().leftSize}
          last={orderById.toJS().last}
          sole={orderById.toJS().sole}
          midsole={orderById.toJS().midsole}
          sockLining={orderById.toJS().sockLining}
          heel={orderById.toJS().heel}
          decoration={orderById.toJS().decoration}
          material={orderById.toJS().material}
          innerMaterial={orderById.toJS().innerMaterial}
          color={orderById.toJS().color}
          detail={orderById.toJS().detail}
          images={orderById.toJS().images}
          imgTextView={imgTextView}
          onChangeState={handleChangeState}
          onChangeImgText={handleImgTextViewChange}
          onOpenImageModal={handleOpenImageModal}
        >
        <div onClick={handleOpenEditorModal}>모달켜기</div>
        </OrderManageDetail>
        
      </OrderManageWrapper>
    )
  }
}

export default connect(
  (state) => ({
    view: state.order.get('view'),
    imgTextView: state.order.get('imgTextView'),
    allCustomers: state.customer.get('allCustomers'),
    customerById: state.customer.get('customerById'),
    allOrders: state.order.get('allOrders'),
    orderById: state.order.get('orderById'),
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    CustomerActions: bindActionCreators(customerActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(OrderManageContainer);