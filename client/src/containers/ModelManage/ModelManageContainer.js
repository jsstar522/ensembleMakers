import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModelManageWrapper } from '../../components/ModelManage/ModelManageWrapper';
import { ModelManageBanner } from '../../components/ModelManage/ModelManageBanner';
import { SearchBar } from '../../components/ModelManage/SearchBar';
import { ModelList } from '../../components/ModelManage/ModelList';

import * as modelActions from '../../store/modules/model';
import * as modalActions from '../../store/modules/modal';
import * as orderTemplateActions from '../../store/modules/orderTemplate';

class ModelManageContainer extends Component {

  // 로그인 정보 받은 후(props를 받은 후) 실행
  componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { ModelActions } = this.props;
      ModelActions.getModelsByMakerId(nextProps.loggedInfo.get('_id'))
    }
  }

  handleOpenModelModal = {
    create: async () => {
      const { loggedInfo } = this.props;
      const { ModalActions, OrderTemplateActions } = this.props;

      // orderTemplate에 맞춰 default 모델작성표 만들기
      const orderTemplate = await OrderTemplateActions.getOrderTemplateById(loggedInfo.get('_id'));

      let contents = { template: [] }
      orderTemplate.data.template.map(
        (content) => contents.template.push({ label: content, value: "" })
      )

      await ModalActions.show({
        visible: 'model',
        mode: 'create',
        modalContents: contents,
        preModalContents: contents,
      })
    },
    modify: async(id) => {
      const { ModalActions, ModelActions } = this.props;
      const { allModels } = this.props;

      await ModalActions.show({
        visible: 'model',
        mode: 'modify',
        modalContents: allModels.toJS()[id].contents,
        preModalContents: allModels.toJS()[id].contents,
        modelImage: allModels.toJS()[id].modelImage,
        preModelImage: allModels.toJS()[id].modelImage
      })
      
      await ModelActions.setModelById(allModels.toJS()[id])
    } 
  }

  handleDelete = async(id, modelImage, index) => {
    const { ModelActions } = this.props;
    ModelActions.deleteModel({
      id: id,
      modelImage: modelImage,
      index: index
    })
  }

  render() {
    const userNumber = this.props.loggedInfo.get('userNumber')
    const { allModels } = this.props;
    const { handleOpenModelModal, handleDelete } = this;
    return(
        <ModelManageWrapper>
          <ModelManageBanner>
            <SearchBar/>
          </ModelManageBanner>
          <ModelList 
            userNumber={userNumber}
            allModels={allModels}
            onOpenModelModal={handleOpenModelModal}
            handleDelete={handleDelete}
          />
        </ModelManageWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    allModels: state.model.get('allModels')
  }),
  (dispatch) => ({
    ModelActions: bindActionCreators(modelActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
    OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch)
  })
)(ModelManageContainer);