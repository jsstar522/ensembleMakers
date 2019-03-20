import React from 'react';
import './UserMenuItem.scss';


const UserMenuItem = ({children, onClick}) => {
  return (
    <div className="UserMenuItem" onClick={onClick}>{children}</div>
  )
}

export default UserMenuItem;