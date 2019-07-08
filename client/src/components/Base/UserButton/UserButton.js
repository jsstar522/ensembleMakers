import React, { Component } from 'react';
import './UserButton.scss';

class UserButton extends Component { 
  render() {
    const { children } = this.props;
    const { onLogout } = this.props;
    return(
      <div className="UserButton">
        <div className="content"> {children} </div>
        <div className="logout" onClick={onLogout}>로그아웃</div>
      </div>
    )
  }
}

export default UserButton;