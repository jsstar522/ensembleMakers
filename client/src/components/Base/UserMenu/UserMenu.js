import React from 'react';
import { UserMenuItem } from '../UserMenuItem'
import './UserMenu.scss';

const UserMenu = ({onLogout}) => {
  return(
  <div className="user-menu-wrapper">
    <div className="user-menu-positioner">
      <div className="user-menu">
        <div className="menu-items">
          <UserMenuItem>프로필</UserMenuItem>
          <div className="line"/>
          <UserMenuItem>계정확인</UserMenuItem>
          <div className="line"/>
          <UserMenuItem onClick={onLogout}>로그아웃</UserMenuItem>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserMenu;