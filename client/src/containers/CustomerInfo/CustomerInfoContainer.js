import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomerInfoWrapper } from '../../components/CustomerInfo/CustomerInfoWrapper';
import { CustomerInfoInput } from '../../components/CustomerInfo/CustomerInfoInput';
import { CustomerInfoPostButton } from '../../components/CustomerInfo/CustomerInfoPostButton';
import * as customerActions from '../../store/modules/customer';
import * as orderActions from '../../store/modules/order';
import * as orderTemplateActions from '../../store/modules/orderTemplate';
import * as userActions from '../../store/modules/user';

class CustomerInfoContainer extends Component {

  componentDidMount() {
    const { UserActions, OrderTemplateActions } = this.props;
    const { userNumber } = this.props;
    // 회사정보 가져오기
    UserActions.getUserByNum(userNumber);
    OrderTemplateActions.getOrderTemplateByNum(userNumber)
  }

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
    const makerId = this.props.loadedUserInfo.get('_id');
    const orderTemplate = this.props.orderTemplate;
    let contents = { template: []};
    orderTemplate.get('template').map(
      (orderList) => {
        contents.template.push({ "label" : orderList, "value": null })
      }
    )

    try {
     let customerInfo = await CustomerActions.postCustomerInfo({name, phone, address, makerId});
     // customerInfo 작성과 비워진 주문서(order) 동시에 작성
     // makerId를 customerInfo에 넣었음 TODO: 한명이 다른곳에서 각각 두개의 주문을 할 때, 비효율이 생김
     const customerId = customerInfo.data._id;
     await OrderActions.postOrder({customerId, contents});
     window.location = await '/customerInfoSuccess/';
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { name, phone, address } = this.props.postForm;
    const { loadedUserInfo } = this.props;
    const { handleChange, handlePost } = this;

    return(
      <CustomerInfoWrapper>
        <div className="customer-info-header"><b>{loadedUserInfo.getIn(['company', 'companyName'])}</b></div>
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
    loadedUserInfo: state.user.get('loadedUserInfo'),
    orderTemplate: state.orderTemplate
  }),
  (dispatch) => ({
    CustomerActions: bindActionCreators(customerActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch),
    OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(CustomerInfoContainer);

