import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const PostDetails = (props) => {
    if (!props.post == '') {
        return (
            <div>
                <Card className="m-3">
                    <CardHeader
                        style={{ backgroundColor: '#3f51b5', color: 'white' }}
                        avatar={
                            <Avatar aria-label="recipe" className="text-uppercase">
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon className="text-white" />
                            </IconButton>
                        }
                        title={props.post ? props.post.title : null}
                        subheader="date"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.post ? props.post.posts : null}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    } else {
        return (
            <div className="text-primary">
                Loading...!
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const id = window.location.pathname.split("/")[2];
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null

    return {
        post: post
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(PostDetails);
