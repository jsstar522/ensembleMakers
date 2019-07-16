import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '../../components/Modal';
import { EditorModal } from '../../components/OrderManage/EditorModal';
import { Dimmed } from '../../components/OrderManage/Dimmed';

import * as modalActions from '../../store/modules/modal';
import * as orderActions from '../../store/modules/order';

class EditorModalContainer extends Component {

  handleChange = (e) => {
    const { ModalActions } = this.props;
    ModalActions.change({
      name: e.target.name,
      value: e.target.value,
    });
  }

  handlePatch = () => {
    const { OrderActions, ModalActions } = this.props;
    const { modalContents } = this.props;
    const id = modalContents.get('_id');
    const contents = modalContents.get('contents');
    OrderActions.patchOrder({
      id: id,
      contents: contents
    })
    ModalActions.hide()
  }

  handleHide = () => {
    const { ModalActions } = this.props;
    ModalActions.hide()
  }

  render() {
    const { customerById, modalContents, visible} = this.props;
    const { handleChange, handlePatch, handleHide } = this;
    return(
      visible==="editor" &&
      <div>
        <Modal mode={visible}>
          <EditorModal
          name={modalContents.getIn(['customerId', 'name'])}
          state={modalContents.getIn(['customerId', 'state'])}
          contents={modalContents.toJS().contents}
          detail={modalContents.toJS().detail}
          onChange={handleChange}
          handlePatch={handlePatch}
          handleHide={handleHide}
          >
          </EditorModal>
        </Modal>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    modalContents: state.modal.get('modalContents'),
    visible: state.modal.get('visible')
  }),
  (dispatch) => ({
    ModalActions : bindActionCreators(modalActions, dispatch),
    OrderActions : bindActionCreators(orderActions, dispatch)
  })
)(EditorModalContainer);