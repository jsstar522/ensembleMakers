import React, { Component } from 'react';
import './OrderManageState.scss';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

const StyledStateItem = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  /* state에 따라 다른 색상 */
  color: ${ props => props.state ? "#4695D6" : oc.gray[6] };
  border-right: ${ props => props.state ? '2px' : '0px'} solid #4695D6;

  font-size: 1.4rem;
  cursor: pointer;

  &:hover{
    background: ${oc.gray[0]};
  }
`;

StyledStateItem.propTypes = {
  state: PropTypes.bool
};

class OrderManageState extends Component {
  render() {
    const { state, handleChangeView } = this.props;
    return(
      <div className="order-manage-state">
        <div className="state-button" onClick={() => handleChangeView("ordered")}>
          <StyledStateItem
            state={state==="ordered"}
          >주문완료
          </StyledStateItem>
        </div>
        <div className="state-button" onClick={() => handleChangeView("processing")}>
          <StyledStateItem
            state={state==="processing"}
          >제작중
          </StyledStateItem>
        </div>
        <div className="state-button" onClick={() => handleChangeView("finished")}>
          <StyledStateItem
            state={state==="finished"}
          >제작완료
          </StyledStateItem>
        </div>
      </div>
    )
  }
}

export default OrderManageState;