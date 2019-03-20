import React from 'react';
import './UserButton.scss';

const UserButton = ({children, onClick}) => (
  <div className="UserButton" onClick={onClick}>
    <div className="content"> {children} </div>
  </div>

);

export default UserButton;