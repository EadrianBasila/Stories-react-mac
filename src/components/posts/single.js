import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		//style={{ backgroundImage: `url(${data.posts.image})` }},
	},
}));

export default function Post() {
	const { slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ posts: [] });
	
	useEffect(() => {
		axiosInstance.get('post/' + slug).then((res) => {
			setData({
				posts: res.data,
			});
			console.log(res.data);
		});
	}, [setData]);

	return (
		
		<Container component="main" maxWidth="md" >
			<CssBaseline />
			<div className={classes.paper} >
				<Container maxWidth="md">
					<div>
						<img src={data.posts.image} height="100px" width="md"/>
					</div>

					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						
					>
						{data.posts.title}
					</Typography>
					<Typography
						component="h1"
						variant="h6"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						<CalendarTodayRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/> Event Date: {data.posts.eventdate} 
					</Typography>
					<Typography
						component="h1"
						variant="h6"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						<PeopleRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/> People Attending: {data.posts.eventresponse}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.posts.excerpt}
					</Typography>
					<Typography
						variant="h4"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.posts.content}
					</Typography>
					
				</Container>
			</div>
		</Container>
	);
}