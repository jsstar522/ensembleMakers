import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '../../components/Modal';
import { CompanySearchModal } from '../../components/Auth/CompanySearchModal';
import { Dimmed } from '../../components/OrderManage/Dimmed';
import * as authActions from '../../store/modules/auth';
import * as modalActions from '../../store/modules/modal';
import * as searchActions from '../../store/modules/search';

class CompanySearchModalContainer extends Component {

  handleChange = (e) => {
    const { value } = e.target;
    const { SearchActions } = this.props;
    SearchActions.changeInput({
      value: value
    })
  }

  handleSearchCompany = async() => {
    const { keyword } = this.props;
    const { SearchActions } = this.props;
    await SearchActions.searchCompany({
      companyName: keyword
    })
  }

  handleChangeGroup = (grouped, groupId, allData) => {
    const { AuthActions, ModalActions } = this.props;
    AuthActions.changeGroup({
      form: 'register',
      grouped: grouped,
      groupId: groupId,
      allData: allData
    })
    ModalActions.hide()
  }

  handleHide = () => {
    const { ModalActions } = this.props;
    ModalActions.hide()
  }

  render() {
    const { visible, keyword, searchList } = this.props;
    const { handleChange, handleSearchCompany, handleChangeGroup, handleHide } = this;
    return (
      visible==="company" && 
      <div>
        <Modal mode={visible}>
          <CompanySearchModal
            keyword={keyword}
            searchList={searchList}
            onChange={handleChange}
            onSearchCompany={handleSearchCompany}
            onChangeGroup={handleChangeGroup}
            onHide={handleHide}
          >
          </CompanySearchModal>
        </Modal>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.modal.get('visible'),
    keyword: state.search.get('keyword'),
    searchList: state.search.get('searchList'),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch),
  })
)(CompanySearchModalContainer);