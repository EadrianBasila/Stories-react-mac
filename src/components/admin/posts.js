import React from 'react';
import jwt_decode from 'jwt-decode';

//UI Neumorphism
import { Button, Fab } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
//Material UI

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

	var authorID = 1;

    async function getToken() {
        //console.log('***************************************************************');
        const token = await localStorage.getItem('access_token');
        //console.log('undecodedtoken: ',token); 
        //console.log('Titiw');
        const decoded = jwt_decode(token);
        //console.log('***************************************************************');
        console.log('Decoded data from token', decoded);
        const getID =  decoded["user_id"];
        //console.log('***************************************************************');
        let userID = JSON.stringify(getID);
        //console.log('User ID from token', userID);
        //console.log(typeof userID);
        return userID;
    }
    
    console.log('Initial User ID is : ', authorID);
    const getID = async () => {
        const data = await getToken();
        //console.log(data);
        return data;
    }

    //working
    
    getID().then(data => {
        const dataID = parseInt(data);
        authorID = dataID;
        console.log('Final User ID is : ', authorID);
        //console.log(typeof authorID);
        return authorID;    
    }).catch(error => {
        console.log('User ID fetch failed: ', error);
    });

	const { posts } = props;
	const classes = useStyles();
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Category</TableCell>
									<TableCell align="left">Author</TableCell>
									<TableCell align="left">Title</TableCell>
									<TableCell align="left">Response</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts.map((post) => {
									return (
										<TableRow>
											<TableCell component="th" scope="row">
												{post.id}
											</TableCell>
											<TableCell align="left">{post.category}</TableCell>
											<TableCell align="left">Author: {post.author}</TableCell>
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
													href={'/admin/edit/' + post.id}
													className={classes.link}
												>
													<EditIcon style={{'fontSize': '20px', 'color': '#387cfa'}}></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/admin/delete/' + post.id}
													className={classes.link}
												>
													<DeleteForeverIcon style={{'fontSize': '20px', 'color': '#e60000'}}></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={6} align="right">
										<Link 
											href={'/admin/create'}
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