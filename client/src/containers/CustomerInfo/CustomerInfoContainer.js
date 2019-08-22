import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomerInfoWrapper } from '../../components/CustomerInfo/CustomerInfoWrapper';
import { CustomerInfoInput } from '../../components/CustomerInfo/CustomerInfoInput';
import { CustomerInfoPostButton } from '../../components/CustomerInfo/CustomerInfoPostButton';
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
    const { OrderActions } = this.props;
    const { name, value } = e.target;

    OrderActions.changeInput({
      name,
      value,
    });
  }

  handlePost = async(e) => {
    const { OrderActions } = this.props;
    const { postForm, history } = this.props;
    const { name, phone, address } = postForm.toJS().customerInfo;
    const makerId = this.props.loadedUserInfo.get('_id');
    const orderTemplate = this.props.orderTemplate;
    let contents = { template: []};
    orderTemplate.get('template').map(
      (orderList) => {
        contents.template.push({ "label" : orderList, "value": null })
      }
    )

    try {
    let customerInfo = {}
    customerInfo['name'] = name;
    customerInfo['phone'] = phone;
    customerInfo['address'] = address;
    await OrderActions.postOrder({customerInfo, makerId, contents});
    window.location = await '/customerInfoSuccess/';
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const customerInfo = this.props.postForm.get('customerInfo')
    const { loadedUserInfo } = this.props;
    const { handleChange, handlePost } = this;

    return(
      <CustomerInfoWrapper>
        <div className="customer-info-header"><b>{loadedUserInfo.getIn(['company', 'companyName'])}</b></div>
        <CustomerInfoInput 
          label="이름"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
        />
        <CustomerInfoInput 
          label="연락처"
          name="phone"
          value={customerInfo.phone}
          onChange={handleChange}
        />
        <CustomerInfoInput 
          label="주소"
          name="address"
          value={customerInfo.address}
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
    postForm: state.order.get('postForm'),
    loadedUserInfo: state.user.get('loadedUserInfo'),
    orderTemplate: state.orderTemplate
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(CustomerInfoContainer);

