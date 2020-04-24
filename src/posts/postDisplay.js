import React, { Component } from 'react';
import user from '../assets/jay.jpg';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import moment from 'moment';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import * as firebase from 'firebase';
import { TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { createPost } from '../store/action/postAction';
import SendIcon from '@material-ui/icons/Send';



const PostDisplay = ({ post, profile, auth }) => {
    const data = firebase.firestore();
    const [comment, setComments] = React.useState(['']);


    const posts = post.posts;
    const pid = posts ? posts.map((p) => {
        return p.likes
    }) : null
    // const [like, setLike] = React.useState(0);

    const postDelete = (id) => {
        const data = firebase.firestore();
        data.collection('posts').doc(id).delete();
    }
    const handleChange = (e) => {
        setComments(e.target.value);

    }
    const handleLike = (id) => {
        // setLike(like + 1);
        var like;
        const post = posts ? posts.map((p) => {
            if (id === p.id) {
                like = p.likes;
                like = like + 1; 
                return p.likes
            }
        }) : null


        data.collection('posts').doc(id).update({ likes: like })
    }

    const handleSubmit = (id) => {
        data.collection('posts').doc(`${id}`).update({
            comments: firebase.firestore.FieldValue.arrayUnion(`${comment}`)
        });


    }

    return (
        <div>
            {
                posts ? posts.map((p) => {
                    var plike = p.likes;
                    // var a = plike.slice(-1)[0]; 

                    const commt = p.comments.map((c, index) => {

                        return <div key={index} >
                            <Divider />
                            <div className="d-flex justify-content-start p-2">
                                <Avatar aria-label="recipe" className="text-uppercase">
                                    {profile.initials}
                                </Avatar>
                                <span className="ml-2 mt-2 text-primary"> {c}</span>
                            </div>
                        </div>
                    })
                    const id = p.id;
                    return <div key={id}>
                        <Card className="m-3">
                            {/* <Link to={'/postdetail/' + id}> */}
                            <CardHeader
                                className="text-capitalize"
                                style={{ backgroundColor: '#3f51b5', color: 'white' }}
                                avatar={
                                    <Avatar aria-label="recipe" className="text-uppercase">
                                        {p.title[0]}
                                    </Avatar>
                                }
                                action={
                                    <IconButton onClick={() => postDelete(id)} aria-label="settings">
                                        <MoreVertIcon className="text-white" />
                                    </IconButton>
                                }
                                title={p.title}
                                subheader={moment(p.createdAt.toDate()).calendar()}
                            />
                            {/* </Link> */}
                            <CardMedia
                                className=""
                                style={{ minWidth: '200px', minHeight: '200px' }}
                                image={p.image}
                                title="user "
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {p.posts}
                                </Typography>
                                <div className="mt-4 comment-height">
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {commt}
                                    </Typography>
                                </div>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton onClick={() => handleLike(id)} aria-label="add to favorites">
                                    {p.likes}
                                    <FavoriteIcon className="text-danger" />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Comments"
                                    name="Comments"
                                    onChange={handleChange}

                                />
                                <IconButton onClick={() => handleSubmit(id)}>
                                    <SendIcon
                                        className=""
                                    />

                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                }) : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);
