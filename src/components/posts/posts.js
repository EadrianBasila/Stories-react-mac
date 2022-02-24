import React, { Component } from 'react';

//UI Neumorphism
import { Button } from 'ui-neumorphism'
import { Card, CardHeader, Chip } from 'ui-neumorphism'
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
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';

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
	fancy : {
		color:"#6197fb",
		transition: theme.transitions.create(["background", "background-color"], {
			duration: theme.transitions.duration.complex,
		  }),
		"&:hover": {
			backgroundColor: '#6197fb',
			color: '#ffffff',
		    fontWeight: 'bold'
		},
	},
}));

const Posts = (props) => {
	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={6} alignItems="stretch">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card rounded elevation={2}>
									<Link
										style={{ textDecoration: 'none' }}
										color="textPrimary"
										href={'post/' + post.slug}
										className={classes.link}
									>
									<CardHeader	>
										<Typography variant='h5' align = 'left' style={{ fontWeight:'bold', color:'#56595d'}}>
												{post.title.substr(0, 16) + '..'}
										</Typography>
									</CardHeader>
										<div style={{display: 'flex',  justifyContent:'left', alignItems:'left', margin:'10px'}}>
											<Chip
												size="small"
												style={{'marginRight': '10px',  'backgroundColor': post.eventoption ==='private' ? '#ff6666' : '#2db300', 'color': '#ffffff' }}
												prepend={<AccountBalanceIcon style={{'fontSize': '10px','verticalAlign':'middle', 'marginRight': '5px'}}/> }
												>
												{post.eventoption} event
											</Chip>
											<Chip
												size="small"
												style={{'marginRight': '10px',  'backgroundColor': post.eventresponse >= 1 ? '#ff9933' : '#387cfa', 'color': '#ffffff' }}
												prepend={<PeopleRoundedIcon style={{'fontSize': '10px','verticalAlign':'middle' , 'marginRight': '5px'}}/> }
												>
												{post.eventresponse} 
											</Chip>
										</div>
										<CardMedia
											className={classes.cardMedia}
											image={post.image}
											title={post.title}
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										
										
										<div className={classes.postText}>
											<Typography 
												color="textSecondary"
												style={{wordWrap: "break-word"}}
												multiline
												rows={2}
											>
												{post.excerpt.substr(0, 50)}..
											</Typography>
										</div>
									</CardContent>
									<CardActions>
										<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
											<PopupState variant="popover" popupId="demo-popup-popover">
											{(popupState) => (
												<div>
												<Button  rounded size="small" className={classes.fancy} {...bindTrigger(popupState)}>
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
														<Typography > 
															<AlternateEmailRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/> Event Code: {post.slug}
														</Typography>
													</Box> 
												</Popover>
												</div>
											)}
											</PopupState>
											<Link
												style={{ textDecoration: 'none' }}
												color="textPrimary"
												href={'post/' + post.slug}
												className={classes.link}>
												
												<Button rounded size="small" className={classes.fancy}>
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