import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModelWrapper } from '../../components/Model/ModelWrapper';
import { ModelBanner } from '../../components/Model/ModelBanner';
import { ModelPreview } from '../../components/Model/ModelPreview';

import * as userActions from '../../store/modules/user';
import * as modelActions from '../../store/modules/model';
import * as customerActions from '../../store/modules/customer';
import * as orderActions from '../../store/modules/order';

class ModelContainer extends Component {

  componentDidMount() {
    const { ModelActions, UserActions } = this.props;
    const { userNumber, modelName } = this.props;
    ModelActions.getModelByModelName(modelName);
    UserActions.getUserByNum(userNumber);
  }

  handleChangeModelInput = (e) => {
    const { ModelActions } = this.props;
    const { name, value, id } = e.target;
    ModelActions.changeModelInput({
      name,
      value,
      id,
    });
  }

  handleChangeInfoInput = (e) => {
    const { ModelActions } = this.props;
    const { name, value } = e.target;

    ModelActions.changeInfoInput({
      name,
      value,
    });
  }

  handlePost = async(e) => {
    const { CustomerActions, OrderActions } = this.props;
    const { postForm, history } = this.props;
    const { name, phone, address } = postForm.toJS().customerInfo;
    const makerId = this.props.loadedUserInfo.get('_id');
    const contents = this.props.postForm.toJS().model.contents;
    const modelImage = this.props.postForm.toJS().model.modelImage;

    try {
     let customerInfo = await CustomerActions.postCustomerInfo({name, phone, address, makerId});
     const customerId = customerInfo.data._id;
     console.log(contents)
     await OrderActions.postOrder({customerId, contents, modelImage});
     window.location = await '/customerInfoSuccess/';

    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { postForm } = this.props;
    const { handleChangeModelInput, handleChangeInfoInput, handlePost } = this;
    return(
      <ModelWrapper>
        <ModelBanner/>
        <ModelPreview 
          postForm={postForm}
          handleChangeModelInput={handleChangeModelInput}
          handleChangeInfoInput={handleChangeInfoInput}
          handlePost={handlePost}
        />
      </ModelWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loadedUserInfo: state.user.get('loadedUserInfo'),
    postForm: state.model.get('postForm')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch),
    CustomerActions: bindActionCreators(customerActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ModelContainer);