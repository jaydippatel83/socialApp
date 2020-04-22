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
import { TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { connect } from 'react-redux';
import { createPost } from '../store/action/postAction';
import SendIcon from '@material-ui/icons/Send';



const PostDisplay = ({ post }) => {
    const data = firebase.firestore();
    var com;
    const [comment, setComments] = React.useState(['']);

    const posts = post.posts;

    const postDelete = (id) => {
        const data = firebase.firestore();
        data.collection('posts').doc(id).delete();
    }
    const handleChange = (e) => {
        setComments(e.target.value);

    }
    const handleSubmit = (id) => {
        setComments('');
        data.collection('posts').doc(`${id}`).update({
            comments: firebase.firestore.FieldValue.arrayUnion(`${comment}`)
        });




        // const db = firebase.firestore().collection('posts').doc(`${id}`)
        // console.log(getDoc, "db");

        // firebase.firestore().collection(`posts/${id}/comments`).push(comment);


        // var docRef = data.collection("posts").doc(id); 
        // docRef.get().then(function (doc) {
        //     if (doc.exists) {
        //         com = doc.data().comments;
        //     } else { 
        //         console.log("No such document!");
        //     }
        // }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // }); 

        // com = [...com, comment];
        // setComments(''); 
        // data.collection('posts').doc(id).set({ 

        // })

        //   const com= posts.filter((i) => i.id === id).map((item) => { 
        //         return {
        //          comments:  [ ...item.comments,comment]
        //         }
        //     })
        //     console.log(com,"com");


    }

    return (
        <div>
            {
                posts ? posts.map((p) => {
                    const commt = p.comments.map((c) => {
                        return <div>{c}</div>
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
                                <div className="mt-4">
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {commt}
                                    </Typography>
                                </div>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon className="text-danger" />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>

                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={comment}
                                    id="comments"
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

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post)),
    }
}

export default connect(null, mapDispatchToProps)(PostDisplay);
