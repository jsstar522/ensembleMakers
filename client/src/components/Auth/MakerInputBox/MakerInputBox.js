import React, { Component } from 'react';
import './MakerInputBox.scss';

class MakerInputBox extends Component {
  render() {
    const { selectedGroup } = this.props;
    const { onOpenCompanySearchModal } = this.props;
    return(
      <div className="maker-input-box-wrapper">
        <div className="maker-input-box-header">
          소속되어 있는 곳을 선택하세요
        </div>
        <div className="maker-input-box-search-button" onClick={onOpenCompanySearchModal}>
            공장 및 회사 찾기
        </div>
        {selectedGroup.toJS().companyName && <div>
          <div className="maker-input-box-selected-header">소속되어 있는 공장 및 회사</div>
          <div className="maker-input-box-selected-wrapper">
            <div className="maker-input-box-selected-left">
              <div className="maker-input-box-selected-company-name">
                {selectedGroup.toJS().companyName}
              </div>
            </div>
            <div className="maker-input-box-selected-right">
              <div className="maker-input-box-selected-manager-name">
                {selectedGroup.toJS().managerName}
              </div>
              <div className="maker-input-box-selected-company-address">
                {selectedGroup.toJS().companyAddress}
              </div>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default MakerInputBox;