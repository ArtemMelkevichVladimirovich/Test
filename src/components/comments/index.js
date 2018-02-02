import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import CommentsPresentational from './view';


class Comments extends Component {

    render() {
        let data = this.props.comments;
        data.reverse();

        return (
            <CommentsPresentational data={this.props.comments} />
        );
    }
}

export default connect(
    (state) => {
        return { comments: state.comments }
    },
)(Comments);