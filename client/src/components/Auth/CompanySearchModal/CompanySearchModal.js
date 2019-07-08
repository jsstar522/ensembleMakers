import React, { Component } from 'react';
import './CompanySearchModal.scss';
import { CompanySearchListItem } from '../CompanySearchListItem';

import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const Input = styled.input`
  width: 80%;
  height: 35px;
  line-height: 35px;
  padding: 5px;
  margin-bottom: 14px;
  font-size: 20px;
  border: 1px solid #d8d6d6;
  ::placeholder {
    color: #d8d6d6;
  }
`

class CompanySearchModal extends Component {
  render() {
    const { keyword, searchList } = this.props;
    const { onChange, onSearchCompany, onChangeGroup, onHide } = this.props;
    const allSearchItem = searchList
      .map(
        (searchItem, i) => <CompanySearchListItem
          key={i}
          companyName={searchItem.company.companyName}
          companyAddress={searchItem.company.companyAddress}
          managerName={searchItem.username}
          managerId={searchItem._id}
          onChangeGroup={onChangeGroup}
        />
      )
    return(
      <div className="company-search-modal-wrapper">
        <div 
          className="company-search-modal-cancel-button"
          onClick={onHide}
        ><FaTimes/>
        </div>
        <div className="company-search-modal-header">
          공장 및 회사 찾기
        </div>
        <div className="company-search-modal-input-wrapper">
        <Input 
          value={keyword}
          placeholder="공장 및 회사 이름을 입력하세요"
          onChange={onChange}
        />
        <div 
          className="company-search-button" 
          onClick={onSearchCompany}
        >검색
        </div>
        </div>
        <div className="company-search-list">
          {allSearchItem}
        </div>
      </div>
    )
  }
}

export default CompanySearchModal;