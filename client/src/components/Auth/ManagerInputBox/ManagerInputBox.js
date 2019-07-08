import React, { Component } from 'react';
import './ManagerInputBox.scss';
import styled from 'styled-components';

const Wrapper = styled.div`
    & + & {
        margin-top: 16px;
    }
`;

const Label = styled.div`
    font-size: 16px;
    color: #757575;
    margin-bottom: 8px;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid #d8d6d6;
    outline: none;
    height: 28px
    line-height: 28px;
    font-size: 19px;
    padding: 5px
    ::placeholder {
        font-size: 15px;
        color: #d8d6d6;
    }
`;

class ManagerInputBox extends Component {
  render() {
    const { company } = this.props;
    const { onChange } = this.props;
    return(
      <div className="manager-input-box-wrapper">
        <div className="manager-input-box-header">
          업체를 정보를 등록하세요.
        </div>
        <Wrapper>
          <Label>업체 이름</Label>
          <Input 
            name="companyName" 
            value={company.name}
            placeholder="업체 이름을 기입하세요"
            onChange={onChange}
          />
        </Wrapper>
        <Wrapper>
          <Label>주소</Label>
          <Input 
            name="companyAddress"
            value={company.address}
            placeholder="주소를 기입하세요"
            onChange={onChange}
          />
        </Wrapper>
        <Wrapper>
          <Label>전화번호 (혹은 사장님 전화번호)</Label>
          <Input 
            name="companyPhone"
            value={company.phone}
            placeholder="전화번호를 기입하세요"
            onChange={onChange}
          />
        </Wrapper>
      </div>
    )
  }
}

export default ManagerInputBox;