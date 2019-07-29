import React, { Component } from 'react';
import './EditorModal.scss';
import { FaTimes } from 'react-icons/fa';
import { DetailInput } from '../DetailInput';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const StateBox = styled.div`
  position: relative;
  float: right;
  width: 80px;
  height: 30px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  //state에 따라 박스 색 변경
  background-color: ${props => props.state == "ordered" ? oc.orange[4] : props.state == "processing" ? oc.pink[4] : oc.lime[3]};
  text-shadow: 0 0 2px ${props => props.state == "ordered" ? oc.orange[6] : props.state == "processing" ? oc.pink[6] : oc.lime[6]};
  color: white;
  padding-top: 3px;

  // 글자드래그 방지
  -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;

`
StateBox.propTypes = {
  state: PropTypes.string
};

class EditorModal extends Component {

  render() {
    const { addMode, addContent, name, state, detail, contents, modelImageURL } = this.props;
    const { onChange, onChangeModelImg, onDeleteModelImg, onChangeAddMode, onChangeAddInput, onAddList, onDeleteList } = this.props;
    const { handlePatch, handleHide } = this.props;
    let stateText;
    stateText = state=="ordered" ? "주문완료" 
    : state=="processing" ? "제작중" 
    : "제작완료";

    const detailInputList = contents.get('template').map(
      (content, i) => 
        <DetailInput
          key={i}
          id={i}
          label={content.label}
          placeholder={content.label}
          // only id, name, value, type are valid with input tags.
          name={i}
          value={content.value || ''}
          onChange={(e, kind) => onChange(e, 'template')}
          onDeleteList={() => onDeleteList(i, 'template')}
        />
    )

    return(
      <div className="editor-modal-wrapper">
        <div 
          className="modal-cancel-button"
          onClick={handleHide}
        ><FaTimes/>
        </div>
        <StateBox state={state}>{stateText}</StateBox>
        <div className="editor-modal-header">{name}</div>
        <div className="editor-modal-line"/>
        <div style={{marginTop: '10px', textAlign: 'left', fontSize: '18px', color: '#767676', marginBottom: '10px', fontWeight: '600'}}>모델 이미지</div>
        <div className="editor-modal-image-wrapper">
          {modelImageURL===null?
          <div className="editor-modal-image"/>
          :<img className="editor-modal-image" src={modelImageURL}/>
          }
          <div className="editor-modal-image-button-wrapper">
            <div style={{color: '#767676', fontSize: '16  px',fontWeight: '600', marginBottom: '5px'}}>모델 이미지 올리기</div>
            <div style={{color: '#767676', fontSize: '13px', fontWeight: '600', marginBottom: '5px'}}>아래 버튼을 클릭해서 모델 이미지를 등록하거나 수정할 수 있습니다.</div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div className="editor-modal-image-button-box">
                <label htmlFor="ex_file">사진선택</label>
                <input type="file" id="ex_file" onChange={onChangeModelImg}/>
              </div>
              <div className="editor-modal-image-delete-button-box">
                <label onClick={onDeleteModelImg}>사진삭제</label>
              </div>
            </div>
          </div>
        </div>
        <div className="editor-modal-line"/>
        {detailInputList}
        {addMode === false && <div className="editor-modal-open-add-input-button" onClick={() => onChangeAddMode(true)}> 작성 목록 추가하기 </div>}
        {addMode === true && 
          <div className="editor-modal-add-wrapper">
            <input 
              className="editor-modal-add-input"
              placeholder="추가할 목록을 작성하세요"
              value={addContent || ''}
              onChange={onChangeAddInput}
            />
            <div className="editor-modal-add-button" onClick={() => onAddList(addContent)}>추가하기</div>
            
            <div className="editor-modal-add-cancel-button" onClick={() => onChangeAddMode(false)}>X</div>
          </div>
        }
        <div className="editor-modal-post-button" onClick={handlePatch}>저장하기</div>
      </div>
    )
  }
}

export default EditorModal;