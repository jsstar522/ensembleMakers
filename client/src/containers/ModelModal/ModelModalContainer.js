import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import { ModelModal } from '../../components/Modal/ModelModal';
import { Dimmed } from '../../components/Modal/Dimmed';

import * as modalActions from '../../store/modules/modal';
import * as modelActions from '../../store/modules/model';
import * as orderTemplateActions from '../../store/modules/orderTemplate';

class ModelModalContainer extends Component {

  handleChange = (e, kind) => {
    const { ModalActions } = this.props;
    ModalActions.change({
      name: e.target.name,
      value: e.target.value,
      kind: kind
    });
  }

  handleChangeModelImg = async(e) => {
    const { ModalActions } = this.props;
    ModalActions.changeModelImg(e.target.files[0])
    // images URL를 만들기 위한 action
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      ModalActions.changeModelImgURL(reader.result);
    }
  }

  handleDeleteModelImg = () => {
    const { ModalActions } = this.props;
    ModalActions.deleteModelImg();
    ModalActions.deleteModelImgURL();
  }

  handleChangeAddInput = (e) => {
    const { ModalActions } = this.props;
    ModalActions.changeAddInput({
      value: e.target.value
    })
  }

  handleChangeAddMode = (mode) => {
    const { ModalActions } = this.props;
    ModalActions.changeAddMode(mode)
  }

  handleAddList = (list) => {
    const { ModalActions } = this.props;
    ModalActions.addList(list)
    ModalActions.changeAddMode(false)
  }

  handleDeleteList = (id, kind) => {
    const { ModalActions } = this.props;
    ModalActions.deleteList({
      id: id, 
      kind: kind
    })
  }

  handlePost = async() => {
    const { loggedInfo, preModalContents, modalContents, modelImage } = this.props;
    const { ModalActions, ModelActions, OrderTemplateActions } = this.props;

    const formData = new FormData();
    formData.append('modelImage', modelImage)
    formData.append('makerId', loggedInfo.get('_id'))
    // formData에 추가하면 [object Object]로만 들어간다. JSON.stringify와 JSON.parse로 JSON형태로 변형시켜줘야한다.
    formData.append('contents', JSON.stringify(modalContents.toJS()))
    
    ModelActions.postModel(formData)

    // 현재 수정한 modal의 content list(modalContent)와 이전에 사용하던 content list(orderContent)가 다르면 템플릿 변경
    let preContents = [];
    preModalContents.toJS().template.map(
      (list) => preContents.push(list.label)
    )
    let nextContents = [];
    modalContents.toJS().template.map(
      (list) => nextContents.push(list.label)
    )
    if(JSON.stringify(preContents) !== JSON.stringify(nextContents)) { 
      OrderTemplateActions.patchOrderTemplate({
        userId: loggedInfo.get('_id'),
        template: nextContents
      })
    }

    this.handleHide();
  }

  handlePatch = async() => {
    const { ModelActions, ModalActions, OrderTemplateActions } = this.props;
    const { loggedInfo, modelById, preModalContents, modalContents, preModelImage, modelImage, modelImageURL } = this.props;

    await ModelActions.patchModel({
      id: modelById.get('_id'),
      contents: modalContents
    })

    // modelImage 변경
    if(modelImage !== preModelImage)
    {
      // 이미지 교체
      if(modelImage !== null) {
        // 이전에 등록해놓은 모델사진이 있을 경우
        let preImgName;
        if(preModelImage !== null) {
          preImgName = preModelImage.split('/')[2];
        }else {
          preImgName = null;
        }
        const formData = new FormData();
        formData.append('modelImage', modelImage)
        formData.append('preImgName', preImgName)
        await ModelActions.patchModelImg({
          id: modelById.get('_id'),
          formData: formData
        })
      }
      // 이미지 삭제
      if(modelImage === null) {
        // 이전에 등록해놓은 모델사진이 있을 경우
        const preImgName = preModelImage.split('/')[2];
        await ModelActions.removeModelImg({
          id: modelById.get('_id'),
          preImgName: preImgName
        })
      }
    }

    // modelImage 삭제시
    if(modelImage === null && modelImage !== preModelImage)
    {
      const imgName = preModelImage.split('/')[2]
      await ModelActions.removeModelImg({
        id: modelById.get('_id'),
        imgName: imgName
      })
    }

    // 현재 수정한 modal의 content list(modalContent)와 이전에 사용하던 content list(orderContent)가 다르면 템플릿 변경
    let preContents = [];
    preModalContents.toJS().template.map(
      (list) => preContents.push(list.label)
    )
    let nextContents = [];
    modalContents.toJS().template.map(
      (list) => nextContents.push(list.label)
    )
    if(JSON.stringify(preContents) !== JSON.stringify(nextContents)) { 
      OrderTemplateActions.patchOrderTemplate({
        userId: loggedInfo.get('_id'),
        template: nextContents
      })
    }

    this.handleHide();
  }

  handleHide = () => {
    const { ModalActions, ModelActions } = this.props;
    ModalActions.hide();
    ModalActions.initModelImgURL();
    ModelActions.initModelById();
  }

  render() {
    const { customerById, orderContents, modalContents, visible, mode, addMode, addContent, modelImageURL } = this.props;

    const { handleChange, handleChangeModelImg, handleChangeAddInput, handleDeleteModelImg, handleChangeAddMode, handleAddList, handleDeleteList, handlePost, handlePatch, handleHide } = this;

    return(
      visible==="model" &&
      <div>
        <ModalWrapper visible={visible}>
          <ModelModal
            mode={mode}
            addMode={addMode}
            addContent={addContent}
            name={orderContents.getIn(['customerId', 'name'])}
            state={orderContents.getIn(['customerId', 'state'])}
            contents={modalContents}
            detail={modalContents.toJS().detail}
            modelImageURL={modelImageURL}
            onChange={handleChange}
            onChangeModelImg={handleChangeModelImg}
            onDeleteModelImg={handleDeleteModelImg}
            onChangeAddInput={handleChangeAddInput}
            onChangeAddMode={handleChangeAddMode}
            onAddList={handleAddList}
            onDeleteList={handleDeleteList}
            handlePost={handlePost}
            handlePatch={handlePatch}
            handleHide={handleHide}
          />
        </ModalWrapper>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    orderContents: state.order.get('orderById'),
    modelById: state.model.get('modelById'),
    modalContents: state.modal.get('modalContents'),
    preModalContents: state.modal.get('preModalContents'),
    addContent: state.modal.get('addContent'),
    visible: state.modal.get('visible'),
    mode: state.modal.get('mode'),
    addMode: state.modal.get('addMode'),
    modelImage: state.modal.get('modelImage'),
    preModelImage: state.modal.get('preModelImage'),
    modelImageURL: state.modal.get('modelImageURL')
  }),
  (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch),
    OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch)
  })
)(ModelModalContainer);