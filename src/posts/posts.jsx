import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createPost } from '../store/action/postAction';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import './post.style.css';



class Post extends Component {
    state = {
        title: '',
        posts: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    // handleChangePost = (e) => {
    //     this.setState({
    //         posts: e.target.value
    //     })
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createPost(this.state);
        console.log(this.state, "submit");
    }
    render() {

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
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
const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

export default connect(null, mapDispatchToProps)(Post);