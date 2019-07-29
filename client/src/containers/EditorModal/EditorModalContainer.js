import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import { EditorModal } from '../../components/Modal/EditorModal';
import { Dimmed } from '../../components/Modal/Dimmed';

import * as modalActions from '../../store/modules/modal';
import * as orderActions from '../../store/modules/order';
import * as orderTemplateActions from '../../store/modules/orderTemplate';
import { getOrderById } from '../../lib/api/order';

class EditorModalContainer extends Component {

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

  handlePatch = async() => {
    const { OrderActions, ModalActions, OrderTemplateActions } = this.props;
    const { loggedInfo, modalContents, orderContents, modelImage, modelImageURL } = this.props;
    const userId = loggedInfo.get('_id');
    const id = orderContents.get('_id');
    const contents = modalContents;
    await OrderActions.patchOrder({
      id: id,
      contents: contents
    })

    // modelImage 변경
    if(modelImage !== orderContents.get('modelImage'))
    {
      // 이미지 교체
      if(modelImage !== null) {
        // 이전에 등록해놓은 모델사진이 있을 경우
        let exImgName;
        if(orderContents.get('modelImage') !== null) {
          exImgName = orderContents.get('modelImage').split('/')[2];
        }else {
          exImgName = null;
        }
        const formData = new FormData();
        formData.append('modelImage', modelImage)
        formData.append('exImgName', exImgName)
        await OrderActions.patchModelImg({
          id: id,
          formData: formData
        })
      }
      // 이미지 삭제
      if(modelImage === null) {
        // 이전에 등록해놓은 모델사진이 있을 경우
        const exImgName = orderContents.get('modelImage').split('/')[2];
        await OrderActions.removeModelImg({
          id: id,
          exImgName: exImgName
        })
      }
    }

    // modelImage 삭제시
    if(modelImage === null && modelImage !== orderContents.get('modelImage'))
    {
      const imgName = orderContents.get('modelImage').split('/')[2]
      await OrderActions.removeModelImg({
        id: id,
        imgName: imgName
      })
    }

    // 현재 수정한 modal의 content list(modalContent)와 이전에 사용하던 content list(orderContent)가 다르면 템플릿 변경
    if(orderContents.get('contents') !== contents) {
      const templateList = [];
      contents.get('template').map(
        (temp) => templateList.push(temp.label)
      )
      OrderTemplateActions.patchOrderTemplate({
        userId: userId,
        template: templateList
      })
    }

    ModalActions.hide()
  }

  handleHide = () => {
    const { ModalActions } = this.props;
    ModalActions.hide()
    ModalActions.initModelImgURL()
  }

  render() {
    const { customerById, orderContents, modalContents, visible, addMode, addContent, modelImageURL } = this.props;

    const { handleChange, handleChangeModelImg, handleChangeAddInput, handleDeleteModelImg, handleChangeAddMode, handleAddList, handleDeleteList, handlePatch, handleHide } = this;

    return(
      visible==="editor" &&
      <div>
        <ModalWrapper mode={visible}>
          <EditorModal
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
          handlePatch={handlePatch}
          handleHide={handleHide}
          >
          </EditorModal>
        </ModalWrapper>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    modalContents: state.modal.get('modalContents'),
    orderContents: state.order.get('orderById'),
    addContent: state.modal.get('addContent'),
    visible: state.modal.get('visible'),
    addMode: state.modal.get('addMode'),
    modelImage: state.modal.get('modelImage'),
    modelImageURL: state.modal.get('modelImageURL')
  }),
  (dispatch) => ({
    ModalActions : bindActionCreators(modalActions, dispatch),
    OrderActions : bindActionCreators(orderActions, dispatch),
    OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch)
  })
)(EditorModalContainer);