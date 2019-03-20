import React from 'react';
import { UserMenuItem } from '../UserMenuItem'
import './UserMenu.scss';

const UserMenu = ({}) => {
  return(
  <div className="user-menu-wrapper">
    <div className="user-menu-positioner">
      <div className="user-menu">
        <div className="menu-items">
          <UserMenuItem>메뉴</UserMenuItem>
          <div className="line"/>
          <UserMenuItem>도움말</UserMenuItem>
          <div className="line"/>
          <UserMenuItem>로그아웃</UserMenuItem>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserMenu;