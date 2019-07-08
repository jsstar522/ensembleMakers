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

  handleChange = (e) => {
    const { onChange } = this.props;
    onChange({
      name: e.target.name,
      value: e.target.value,
    })
  }

  render() {
    const { name, state, model, rightSize, leftSize, last, sole, midsole, sockLining, heel, decoration, material, innerMaterial, color, detail } = this.props;
    const { handleChange } = this;
    const { handlePatch, handleHide } = this.props;
    let stateText;
    stateText = state=="ordered" ? "주문완료" 
    : state=="processing" ? "제작중" 
    : "제작완료";

    return(
      <div className="edit-modal-wrapper">
        <div 
          className="modal-cancel-button"
          onClick={handleHide}
        ><FaTimes/>
        </div>
        <StateBox state={state}>{stateText}</StateBox>
        <div className="edit-modal-header">{name}</div>
          <table className="edit-modal-form-table">
            <tbody>
            <tr>
              <td>
              <DetailInput
                name="model"
                label="모델명"
                placeholder="모델명"
                value={model || ''}
                onChange={handleChange}
              /></td>
              <td>
                <DetailInput
                  name="last"
                  label="라스트"
                  placeholder="라스트"
                  value={last || ''}
                  onChange={handleChange}
                /></td>
            </tr>
            <tr><td colSpan="2"><hr className="editor-modal-line"></hr></td></tr>
            <tr>
              <td>
              <DetailInput
                name="leftSize"
                label="왼쪽 사이즈"
                placeholder="왼쪽 사이즈"
                value={leftSize || ''}
                onChange={handleChange}
              /></td>
              <td>
              <DetailInput
                name="rightSize"
                label="오른쪽 사이즈"
                placeholder="오른쪽 사이즈"
                value={rightSize || ''}
                onChange={handleChange}
              /></td>
            </tr>
            <tr><td colSpan="2"><hr className="editor-modal-line"></hr></td></tr>
            <tr>
              <td>
              <DetailInput
                name="sole"
                label="창"
                placeholder="창"
                value={sole || ''}
                onChange={handleChange}
              /></td>
              <td>
              <DetailInput
                name="midsole"
                label="중창"
                placeholder="중창"
                value={midsole || ''}
                onChange={handleChange}
              /></td>
            </tr>
            <tr>
              <td>
              <DetailInput
                name="sockLining"
                label="까래"
                placeholder="까래"
                value={sockLining || ''}
                onChange={handleChange}
              /></td>
              <td>
              <DetailInput
                name="heel"
                label="굽"
                placeholder="굽"
                value={heel || ''}
                onChange={handleChange}
              /></td>
            </tr>
            <tr><td colSpan="2"><hr className="editor-modal-line"></hr></td></tr>
            <tr>
              <td>
              <DetailInput
                name="decoration"
                label="장식"
                placeholder="장식"
                value={decoration || ''}
                onChange={handleChange}
              /></td>
              <td>
              <DetailInput
                name="color"
                label="색상"
                placeholder="색상"
                value={color || ''}
                onChange={handleChange}
              /></td>
            </tr>
            <tr>
              <td>
              <DetailInput
                name="material"
                label="소재"
                placeholder="소재"
                // value={material ? material.value : ''}
                value={material || ''}
                onChange={handleChange}
              /></td>
              <td>
              <DetailInput
                name="innerMaterial"
                label="내피"
                placeholder="내피"
                value={innerMaterial || ''}
                onChange={handleChange}
              /></td>
            </tr>
            <tr><td colSpan="2"><hr className="editor-modal-line"></hr></td></tr>
            <tr>
              <td colSpan="2">
                <DetailInput
                  name="detail"
                  label="특이사항"
                  placeholder="특이사항"
                  value={detail || ''}
                  onChange={handleChange}
                /></td>
            </tr>      
            </tbody>
          </table>
        <div className="editor-modal-post-button" onClick={handlePatch}>저장하기</div>
      </div>
    )
  }
}

export default EditorModal;