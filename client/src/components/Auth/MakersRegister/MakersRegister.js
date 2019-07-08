import React, { Component } from 'react';
import './MakersRegister.scss';
import { RoleButton } from '../RoleButton';
import { ManagerInputBox } from '../ManagerInputBox';
import { MakerInputBox } from '../MakerInputBox';

class MakersRegister extends Component {
  render() {
    const { role, company, selectedGroup } = this.props;
    const { onChange, onChangeRole, onOpenCompanySearchModal } = this.props;
    return(
      <div className="makers-register-wrapper">
        <RoleButton 
          role={role} 
          onChangeRole={onChangeRole}
        />
        {role==='maker' && 
          <MakerInputBox
            selectedGroup={selectedGroup}
            onOpenCompanySearchModal={onOpenCompanySearchModal}
          />
        }
        {role==='manager' && 
          <ManagerInputBox
            company={company}
            onChange={onChange}
          />
        }
      </div>
    )
  }
}

export default MakersRegister;