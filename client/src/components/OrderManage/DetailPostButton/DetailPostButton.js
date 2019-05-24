import React, { Component } from 'react';
import './DetailPostButton.scss';

class DetailPostButton extends Component {
  render() {
    const { children } = this.props;
    const { onClick } = this.props;
    return(
      <div className="detail-post-button-wrapper">
        <div className="detail-post-button" onClick={onClick}>{children}</div>
      </div>
    )
  }
}

export default DetailPostButton;