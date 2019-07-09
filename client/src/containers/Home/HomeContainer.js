import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LinkButton } from '../../components/Home/LinkButton';

class HomeContainer extends Component {
  render() {
    const { logged } = this.props;
    const { loggedInfo } = this.props;
    return(
      <LinkButton logged={logged} userNumber={loggedInfo.get('userNumber')}/>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    logged: state.user.get('logged')
  }),
  (dispatch) => ({

  })
)(HomeContainer);