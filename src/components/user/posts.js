import React from 'react';
import jwt_decode from 'jwt-decode';

//UI Neumorphism

import { Card, CardHeader, Fab, TextArea, Tooltip, Button, CardContent } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Box from '@material-ui/core/Box';
//import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
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
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));



const Posts = (props) => {

	var authorID = localStorage.getItem("userID"); //to be fixed!
	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
    return (
		<React.Fragment>
			<br/>

			<Container maxWidth="md" component="main">
						<Paper className={classes.root} >						
							<TableContainer className={classes.container} >
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell align="left">Id</TableCell>
											<TableCell align="left">Category</TableCell>
											<TableCell align="left">Title</TableCell>
											<TableCell align="left">Response</TableCell>
											<TableCell align="left">Action</TableCell>
											
										</TableRow>
									</TableHead>
									<TableBody>
									{posts.map((post) => {
										if (post.author == authorID) {
											return (
												<TableRow>
													<TableCell component="th" scope="row">
														{post.id}
													</TableCell>

													<TableCell align="left">
														{post.eventoption} event
													</TableCell>

													<TableCell align="left">
														<Link
															color="textPrimary"
															href={'/post/' + post.slug}
															className={classes.link}
														>
															{post.title}
														</Link>
													</TableCell>
													
													<TableCell align="left">
														{post.eventresponse}
													</TableCell>

													<TableCell align="left">
														<Link
															color="textPrimary"
															href={'/user/edit/' + post.id}
															className={classes.link}
														>
															<EditIcon style={{'fontSize': '20px', 'color': '#387cfa'}}></EditIcon>
														</Link>
														<Link
															color="textPrimary"
															href={'/user/delete/' + post.id}
															className={classes.link}
														>
															<DeleteForeverIcon style={{'fontSize': '20px', 'color': '#e60000'}}></DeleteForeverIcon>
														</Link>
														<Link
															color="textPrimary"
															href='#'
															className={classes.link}
															style={{ textDecoration: 'none' }}
															underline="none"
														>		
																<NotificationsActiveIcon style={{'fontSize': '20px', 'color': '#387cfa', 'marginRight': '10px'}}> </NotificationsActiveIcon>
														</Link>
													</TableCell>
																		
												</TableRow>
											);
										}
												
										})
									}
										<TableRow>
											<TableCell colSpan={5} align="right">
											<Link 
												href={'/user/create'}
												style={{ textDecoration: 'none' }}
												underline="none"
												>
												<Fab
													bgColor="#6197fb" 
													color="#ffffff"
													variant="extended"
													size="large"
													aria-label="add"
													style={{margin: '10px'}}
													>
													<EditIcon style={{'fontSize': '20px','verticalAlign':'middle', marginRight: '10px'}} />
													Create New Story!
												</Fab>		
											</Link>											
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>								
			</Container>
		</React.Fragment>
		
		
	);
};

export default Posts;