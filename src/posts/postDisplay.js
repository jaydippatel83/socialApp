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


const PostDisplay = ({ post }) => {
    const posts = post.posts;
    return (
        <div>

            {
                posts ? posts.map((p) => {
                    return <div key={p.id}>


                        <Card className="m-3">
                            <Link to={'/postdetail/' + p.id}>
                                <CardHeader
                                    style={{ backgroundColor: '#3f51b5', color: 'white' }}
                                    avatar={
                                        <Avatar aria-label="recipe" className="text-uppercase">
                                            {p.title[0]}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon className="text-white" />
                                        </IconButton>
                                    }
                                    title={p.title}
                                    subheader="date"
                                />
                            </Link>
                            <CardMedia
                                className=""
                                style={{ minWidth: '200px', minHeight: '200px' }}
                                image={user}
                                title="user "
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {p.posts}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon className="text-danger" />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className=""
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                }) : null
            }
        </div>
    )
}


export default PostDisplay;
