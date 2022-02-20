import React, { Component } from 'react';

//UI Neumorphism
import { Button } from 'ui-neumorphism'
import { Card, CardHeader } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		//paddingTop: '56.25%', // 16:9
		height: '300px',
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '9px',
		textAlign: 'left',
		marginBottom: theme.spacing(1),
	},
}));

const Posts = (props) => {
	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={6} alignItems="flex-end">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card rounded elevation={2}>
									<Link
										color="textPrimary"
										href={'post/' + post.slug}
										className={classes.link}
									>
									<CardHeader
										title={post.title.substr(0, 20) + '...'}
										
										
									/>
										<CardMedia
											className={classes.cardMedia}
											image={post.image}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
						
										<div className={classes.postText}>
											<Typography color="textSecondary">
												{post.excerpt.substr(0, 50)}..
											</Typography>
										</div>
									</CardContent>
									<CardActions>
										<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
											<PopupState variant="popover" popupId="demo-popup-popover">
											{(popupState) => (
												<div>
												<Button size="small" color="primary" {...bindTrigger(popupState)}>
													<LinkRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/>  Share											</Button>
												<Popover
													{...bindPopover(popupState)}
													anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'center',
													}}
													transformOrigin={{
													vertical: 'top',
													horizontal: 'center',
													}}
												>
													<Box p={2}>
													<Typography> 
														<AlternateEmailRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/> Event Code: {post.slug}
													</Typography>
													</Box>
												</Popover>
												</div>
											)}
											</PopupState>
											<Link
												color="textPrimary"
												href={'post/' + post.slug}
												className={classes.link}>
												<Button size="small" color="primary">
													<EventNoteRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/>  Learn More
												</Button>
											</Link>
										</div>
										
								</CardActions>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Posts;