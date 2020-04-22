import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createPost } from '../store/action/postAction';
import { connect } from 'react-redux';
import './post.style.css';

import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Post extends Component {
    state = {
        title: '',
        posts: '',
        image: null,
        // avatar: "",
        // isUploading: false,
        // progress: 0,
        // avatarURL: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeFile = (e) => {
        this.setState({ image: URL.createObjectURL(e.target.files[0]) })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createPost(this.state);
        this.props.history.push('/');
    }


    // handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    // handleProgress = progress => this.setState({ progress });
    // handleUploadError = error => {
    //     this.setState({ isUploading: false });
    //     console.error(error);
    // };
    // handleUploadSuccess = filename => {
    //     this.setState({ avatar: filename, progress: 100, isUploading: false });
    //     firebase
    //         .storage()
    //         .ref("images")
    //         .child(filename)
    //         .getDownloadURL()
    //         .then(url => this.setState({ avatarURL: url }));
    // };




    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <Container className="pl-0 pr-0" component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper mt-3">
                    <Typography component="h1" variant="h5">
                        Create Post
                </Typography>
                    <form className="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Post Title"
                            name="title"
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <TextField
                            id="posts"
                            label="Contents"
                            multiline
                            rows="4"
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={this.handleChange}
                            autoFocus
                            className="textarea-post"
                        />
                        <Grid item xs={12}>
                            <input
                                required
                                fullWidth
                                label="Image Upload"
                                type="file"
                                onChange={this.handleChangeFile}
                            />



                            {/* <label>Avatar:</label>
                            {this.state.isUploading && <p>Progress: {this.state.progress}%</p>}
                            {this.state.avatarURL && <img style={{width:'100px',height:'100px'}} src={this.state.avatarURL} />} */}
                        </Grid>

                        {/* <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref("images")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        /> */}


                        <Grid container>
                            <Grid className="mt-3" item>
                                <Button
                                    onClick={this.handleSubmit}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="submit ml-auto"
                                >
                                    Post
                        </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));