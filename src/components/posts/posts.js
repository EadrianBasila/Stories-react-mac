import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
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
	cardHeader: {

		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '10px',
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
				<Grid container spacing={5} alignItems="flex-end">
					{posts.map((post) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={post.id} xs={12} md={4}>
								<Card className={classes.card} style={{'borderRadius': '25px'}}>
									<Link
										color="textPrimary"
										href={'post/' + post.slug}
										className={classes.link}
									>
										<CardMedia
											className={classes.cardMedia}
											image={post.image}
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.postTitle}
										>
											{post.title.substr(0, 20)}...
										</Typography>
										<div className={classes.postText}>
											<Typography color="textSecondary">
												{post.excerpt.substr(0, 25)}...
											</Typography>
										</div>
									</CardContent>
									<CardActions>
										{/* <Button 
											size="small" 
											color="primary"
										>
											<LinkRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/>  Share
										</Button> */}
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