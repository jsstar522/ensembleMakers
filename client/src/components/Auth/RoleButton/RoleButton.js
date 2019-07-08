import React, { Component } from 'react';
import './RoleButton.scss';
import styled from 'styled-components';

const Button = styled.div`
  border: 1px solid #d8d6d6;
  color: #757575;
  ${props => props.index === props.role && 'background-color: #4695D6; color: white;' }
  ${props => props.index !== props.role && ':hover{background-color: #4695D6; color: white;}' }

  width: 35%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`

class RoleButton extends Component {
  render() {
    const { role } = this.props;
    const { onChangeRole } = this.props;
    return(
      <div className="role-button-wrapper">
        <Button index="manager" role={role} onClick={() => onChangeRole('manager')}>사장님</Button>
        <Button index="maker" role={role} onClick={() => onChangeRole('maker')}>제화공</Button>
      </div>
    )
  }
}

export default RoleButton;