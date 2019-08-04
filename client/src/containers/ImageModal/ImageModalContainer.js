import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import { ImageModal } from '../../components/Modal/ImageModal';
import { Dimmed } from '../../components/Modal/Dimmed';
import * as modalActions from '../../store/modules/modal';
import * as orderActions from '../../store/modules/order';

class ImageModalContainer extends Component {

  handleChange = async(e) => {
    const { ModalActions } = this.props;
    
    // 사진 계속 추가 가능(미리보기 URL 포함)
    for(let i=0; i < e.target.files.length; i++){
      // images formData를 만들기 위한 action
      ModalActions.changeImage(e.target.files[i])
      // images URL를 만들기 위한 action
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[i])
      reader.onload = () => {
        ModalActions.changeImageURL(reader.result);
      }
    }

    // 같은사진 중복으로 올리면 change가 일어나지 않아 올라가지 않는 버그가 있음.

  }

  // 사진 등록
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
    await this.handleHide();
  }

  // 올릴 이미지 목록, 미리보기 제거
  handleDeleteURL = async(i) => {
    const { ModalActions } = this.props;
    await ModalActions.deleteImage(i);
    await ModalActions.deleteImageURL(i);
  }

  // 등록되어 있는 사진 삭제
  handleDeleteImg = async(i) => {
    const { OrderActions } = this.props;
    const { orderById } = this.props;
    const id = orderById.get('_id')
    const imgName = await orderById.toJS().images[i].split('/')[2]
    await OrderActions.removeImg({ id, imgName })
  }

  // 모달 숨기기
  handleHide = () => {
    const { ModalActions } = this.props;
    const { images, imageURLs } = this.props;

    // post 후 images state 초기화
    if(images){
      ModalActions.initImage();
      ModalActions.initImageURL();
    }

    // modal 종료
    ModalActions.hide()
  }

  render() {
    const { visible, orderById, images, imageURLs } = this.props;
    const { handleChange, handlePost, handleHide, handleDeleteURL, handleDeleteImg } = this;

    return(
      visible === 'image' &&
      <div>
        <ModalWrapper visible={visible}>
          <ImageModal 
            images={orderById.get('images')}
            imageURLs={imageURLs}
            onChange={handleChange} 
            onPost={handlePost}
            onDeleteURL={handleDeleteURL}
            onDeleteImg={handleDeleteImg}
            onHide={handleHide}
          />
        </ModalWrapper>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.modal.get('visible'),
    orderById: state.order.get('orderById'),
    images: state.modal.get('images'),
    imageURLs: state.modal.get('imageURLs')
  }),
  (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ImageModalContainer);