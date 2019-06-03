import React, { Component } from 'react';
import './ImageModal.scss';

class ImageModal extends Component {

  render() {
    const { images, imageURLs } = this.props;
    const { onChange, onPost, onDelete, onHide } = this.props;

    // imgURL List 만들기
    
    let imageURLList = imageURLs
        .map((imageURL, i) => {
          return <img className="image-preview-item"
          key={i} src={imageURL} onClick={onDelete}/>
        })

    return(
      <div className="image-modal-wrapper">
        <form>
          <input
            type="file"
            onChange={onChange}
            multiple
          />
        </form>
        <div className="image-preview-wrapper">
          {imageURLList}
        </div>
        <div onClick={onHide}>모달끄기</div>
        <div onClick={onPost}>보내기</div>
      </div>
    )
  }
}

export default ImageModal;