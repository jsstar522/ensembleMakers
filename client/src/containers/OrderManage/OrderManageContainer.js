import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderManageWrapper } from '../../components/OrderManage/OrderManageWrapper';
import { OrderManageState } from '../../components/OrderManage/OrderManageState';
import { OrderManageList } from '../../components/OrderManage/OrderManageList';
import { OrderManageDetail } from '../../components/OrderManage/OrderManageDetail';
import { DetailPostButton } from '../../components/OrderManage/DetailPostButton';
import { DetailInput } from '../../components/OrderManage/DetailInput';
import * as orderActions from '../../store/modules/order';
import * as customerActions from '../../store/modules/customer';
import { accessSync } from 'fs';

class OrderManageContainer extends Component {
  
  componentDidMount() {
    // OrderManageList에 customerInfo 불러오기
    const { CustomerActions } = this.props;
    CustomerActions.getAllCustomerInfo();
  }

  handleChange = (e) => {
    const { OrderActions } = this.props;
    const { name, value } = e.target;

    OrderActions.changeInput({
      name,
      value
    });
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

  handleChangeState = async() => {
    const { CustomerActions } = this.props;
    const { customerById } = this.props;
    const id = customerById.toJS()._id;
    const state = "processing";

    try {
      await CustomerActions.changeState({id, state})
      //성공하면 재렌더링이 필요할듯하다..
    }catch(e) {
      console.log(e);
    }
  }

  // handlePostOrder = async() => {
  //   const { OrderActions } = this.props;
  //   const customerId = this.props.customerById.toJS()._id;
  //   const { postForm } = this.props;
  //   const { size } = postForm.toJS();

  //   try {
  //   await OrderActions.postOrder({customerId, size});
  //   }catch(e) {
  //     console.log(e);
  //   }
  // }

  render() {
    const { allCustomers, customerById, orderById } = this.props;
    const { handleGetById, handleChange, handlePostOrder, handleChangeState } = this;
    // 변수이름 size라고 하면 오류
    const { sizeValue } = this.props.postForm;

    //customer전체명단 불러오기
    const allCustomerList = allCustomers
      .map(
        (allCustomer, i) => <div
        key={i}
        id={allCustomer._id}
        name={allCustomer.name}
        phone={allCustomer.phone}
        address={allCustomer.address}
        onClick={() => handleGetById(allCustomer._id)}
        >{allCustomer.name}<br/>{allCustomer.state}</div>
      )

    return(
      <OrderManageWrapper>
        <OrderManageState/>
        <OrderManageList>{allCustomerList}</OrderManageList>
        <OrderManageDetail>
          {customerById.get('name')}<br/>
          {customerById.get('_id')}<br/>
          {customerById.get('phone')}<br/>
          {customerById.get('address')}<br/>
          {customerById.get('state')}<br/>
          <div>-------------------------------</div>
          {orderById.get('_id')}
          {/* <DetailInput
            label="size" 
            name="size"
            placeholder="사이즈"
            value={sizeValue}
            onChange={handleChange}
          /> */}
          <DetailPostButton
            onClick={handlePostOrder}
          >저장하기</DetailPostButton>
          <div onClick={handleChangeState}>상태바꾸기</div>
        </OrderManageDetail>
      </OrderManageWrapper>
    )
  }
}

export default connect(
  (state) => ({
    allOrders: state.order.get('allOrders'),
    orderById: state.order.get('orderById'),
    postForm: state.order.get('postForm'),
    allCustomers: state.customer.get('allCustomers'),
    customerById: state.customer.get('customerById')
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    CustomerActions: bindActionCreators(customerActions, dispatch)
  })
)(OrderManageContainer);