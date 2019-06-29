import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomerInfoWrapper } from '../../components/CustomerInfo/CustomerInfoWrapper';
import { CustomerInfoInput } from '../../components/CustomerInfo/CustomerInfoInput';
import { CustomerInfoPostButton } from '../../components/CustomerInfo/CustomerInfoPostButton';
import * as customerActions from '../../store/modules/customer';
import * as orderActions from '../../store/modules/order';

class CustomerInfoContainer extends Component {

  handleChange = (e) => {
    const { CustomerActions } = this.props;
    const { name, value } = e.target;

    CustomerActions.changeInput({
      name,
      value,
    });
  }

  handlePost = async(e) => {
    const { CustomerActions, OrderActions } = this.props;
    const { postForm, history } = this.props;
    const { name, phone, address } = postForm.toJS();

    try {
     let customerInfo = await CustomerActions.postCustomerInfo({name, phone, address});
     // customerInfo 작성과 비워진 주문서(order) 동시에 작성
     const customerId = customerInfo.data._id;
     await OrderActions.postOrder({customerId});
     window.location = await '/customerInfoSuccess/';
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { name, phone, address } = this.props.postForm;
    const { handleChange, handlePost } = this;
    return(
      <CustomerInfoWrapper>
        <div className="customer-info-header"><b>ZOE 수제화</b></div>
        <CustomerInfoInput 
          label="이름"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <CustomerInfoInput 
          label="연락처"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <CustomerInfoInput 
          label="주소"
          name="address"
          value={address}
          onChange={handleChange}
        />
        <CustomerInfoPostButton
          onClick={handlePost}
        />
      </CustomerInfoWrapper>
    )
  }
}

export default connect(
  (state) => ({
    postForm: state.customer.get('postForm'),
  }),
  (dispatch) => ({
    CustomerActions: bindActionCreators(customerActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(CustomerInfoContainer);

