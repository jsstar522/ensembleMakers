import React, { Component } from 'react';
import { ModelManageWrapper } from '../../components/ModelManage/ModelManageWrapper';
import { ModelManageBanner } from '../../components/ModelManage/ModelManageBanner';
import { SearchBar } from '../../components/ModelManage/SearchBar';
import { ModelList } from '../../components/ModelManage/ModelList';

class ModelManageContainer extends Component {
  render() {
    return(
        <ModelManageWrapper>
          <ModelManageBanner>
            <SearchBar/>
          </ModelManageBanner>
          <ModelList/>
        </ModelManageWrapper>
      
    )
  }
}

export default ModelManageContainer;