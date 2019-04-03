import React, { Component } from 'react';
import { EnsembleList } from '../components/Ensemble/EnsembleList';
import { GetPostContainer } from '../containers/Post'

class Home extends Component {
    render() {
        return (
            <GetPostContainer/>
        );
    }
}

export default Home;