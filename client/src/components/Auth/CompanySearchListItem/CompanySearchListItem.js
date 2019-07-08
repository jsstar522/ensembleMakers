import React, { Component } from 'react';
import './CompanySearchListItem.scss';

class CompanySearchListItem extends Component {
  render() {
    const { companyName, companyAddress, managerName, managerId } = this.props;
    const { onChangeGroup } = this.props;
    return(
      <div className="company-search-list-item-wrapper" onClick={() => onChangeGroup(true, managerId, {companyName:companyName, companyAddress: companyAddress, managerName: managerName})}>
        <div className="company-search-list-item-left">
          <div className="company-search-list-item-company-name">{companyName}</div>
        </div>
        <div className="company-search-list-item-right">
          <div className="company-search-list-item-manager-name">{managerName}</div>
          <div className="company-search-list-item-company-address">{companyAddress}</div>
        </div>
      </div>
    )
  }
}

export default CompanySearchListItem;