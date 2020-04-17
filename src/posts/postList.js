import React, { Component } from 'react'
import PostDisplay from './postDisplay'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

export class PostList extends Component {
    render() {
        const post = this.props;
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />

        return (
            <Container component="main" maxWidth="sm">
                <PostDisplay post={post} />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(PostList);
