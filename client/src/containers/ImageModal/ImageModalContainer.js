import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '../../components/OrderManage/Modal';
import { ImageModal } from '../../components/OrderManage/ImageModal';
import { Dimmed } from '../../components/OrderManage/Dimmed';
import * as modalActions from '../../store/modules/modal';
import * as orderActions from '../../store/modules/order';

const fileURLList = [];

class ImageModalContainer extends Component {

  handleChange = async(e) => {
    const { ModalActions } = this.props;
    
    // 사진 계속 추가 가능(미리보기 URL 포함)
    for(let i=0; i < e.target.files.length; i++){
      // images formData를 만들기 위한 action
      ModalActions.imageChange(e.target.files[i])
      // images URL를 만들기 위한 action
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[i])
      reader.onload = () => {
        ModalActions.imageURL(reader.result);
      }
    }
  }

  handlePost = async() => {
    const { ModalActions, OrderActions } = this.props;
    const { orderById, images, postForm } = this.props;
    const id = orderById.toJS()._id;

    const formData = new FormData();
    for(let i = 0; i < images.size; i++) {
      formData.append('images', images.toJS()[i]);
    }
    // 이미지 post
    await OrderActions.patchImg({
      id, formData
    })
    // imgPost 후 modal 종료
    this.handleHide();

    console.log(formData.getAll('images'));
  }

  // 올릴 이미지 목록제거
  handleDeleteURL = (e) => {
    const { images }  = this.props;

  }

  handleHide = () => {
    const { ModalActions } = this.props;
    const { images, imageURLs } = this.props;

    // post 후 images state 초기화
    if(images){
      // images.formData.delete('images');
      ModalActions.imageInit();
      ModalActions.imageURLInit();
    }

    // modal 종료
    ModalActions.hide()
  }

  render() {
    const { visible, images, imageURLs } = this.props;
    const { handleChange, handlePost, handleHide, handleDeleteURL } = this;

    return(
      visible === "image" &&
      <div>
        <Modal mode={visible}>
          <ImageModal 
            images={images}
            imageURLs={imageURLs}
            onChange={handleChange} 
            onPost={handlePost}
            onDelete={handleDeleteURL}
            onHide={handleHide}
          />
        </Modal>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    orderById: state.order.get('orderById'),
    visible: state.modal.get('visible'),
    images: state.modal.get('images'),
    imageURLs: state.modal.get('imageURLs')
  }),
  (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ImageModalContainer);