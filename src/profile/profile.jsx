import React, { Component } from 'react'
import { Card, CardContent, Typography, CardActions, Button, Avatar } from '@material-ui/core';
import logo from '../logo.svg';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        const { profile } = this.props;
        return (
            <Card className="" >
                <CardContent className="text-center">
                    <Avatar alt="Jaydip" src={logo} className="m-auto" />
                    <Typography className="text-uppercase" color="textSecondary" gutterBottom>
                        {profile.firstName} {profile.lastName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                    </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-around">
                    <Button color="primary" size="small">Posts</Button>
                    <Button color="primary" size="small">Follovers</Button>
                    <Button color="primary" size="small">Following</Button>
                </CardActions>
            </Card>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Profile);