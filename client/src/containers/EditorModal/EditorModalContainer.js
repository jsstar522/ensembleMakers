import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '../../components/Modal';
import { EditorModal } from '../../components/OrderManage/EditorModal';
import { Dimmed } from '../../components/OrderManage/Dimmed';

import * as modalActions from '../../store/modules/modal';
import * as orderActions from '../../store/modules/order';

class EditorModalContainer extends Component {

  handleChange = ({name, value}) => {
    const { ModalActions } = this.props;
    ModalActions.change({
      name, 
      value
    });
  }

  handlePatch = () => {
    const { OrderActions, ModalActions } = this.props;
    const { modalContents } = this.props;
    const id = modalContents.get('_id');
    const contents = modalContents.toJS();
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
          model={modalContents.toJS().model}
          rightSize={modalContents.toJS().rightSize}
          leftSize={modalContents.toJS().leftSize}
          last={modalContents.toJS().last}
          sole={modalContents.toJS().sole}
          midsole={modalContents.toJS().midsole}
          sockLining={modalContents.toJS().sockLining}
          heel={modalContents.toJS().heel}
          decoration={modalContents.toJS().decoration}
          material={modalContents.toJS().material}
          innerMaterial={modalContents.toJS().innerMaterial}
          color={modalContents.toJS().color}
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