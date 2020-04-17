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

class Post extends Component {
    state = {
        title: '',
        posts: '',
        image: null
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
        this.props.history.push('/postlist');
    }
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
                        </Grid>
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