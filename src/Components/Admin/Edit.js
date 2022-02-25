import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	//  fields = ('category', 'id', 'title', 'image', 'slug', 'author', 'excerpt', 'content', 'status', 'eventdate', 'eventresponse', 'eventoption', 'postattendee', 'eventaddress', 'eventlon', 'eventlat')

	var authorID = localStorage.getItem("userID"); 
	const history = useHistory();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		slug: '',
		excerpt: '',
		content: '',
		status:'',
        eventdate: '',
		eventresponse:'',
		eventoption:'',		
		postattendee:'',
		eventaddress:'',
		eventlon:'',
		eventlat:'',

	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				['id']: res.data.id,
				['title']: res.data.title,
				['excerpt']: res.data.excerpt,
				['slug']: res.data.slug,
				['content']: res.data.content,
				['status']: res.data.status,				
                ['eventdate']: res.data.eventdate,
				['eventresponse']: res.data.eventresponse,
				['eventoption']: res.data.eventoption,
				['postattendee']: res.data.postattendee,
				['eventaddress']: res.data.eventaddress,
				['eventlon']: res.data.eventlon,
				['eventlat']: res.data.eventlat,
			});
			console.log(res.data);
			console.log(formData);
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('======================================');
		console.log(formData);

		axiosInstance.put(`admin/edit/` + id + '/', {
			id: formData.id,
			title: formData.title,
			slug: formData.slug,
			author: authorID,
			excerpt: formData.excerpt,
			content: formData.content,
			status: formData.status,
            eventdate: formData.eventdate,
			eventresponse: formData.eventresponse,
			eventoption: formData.eventoption,
			postattendee: formData.postattendee,
			eventaddress: formData.eventaddress,
			eventlon: formData.eventlon,
			eventlat: formData.eventlat,

		});
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Post Title"
								name="title"
								autoComplete="title"
								value={formData.title}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="excerpt"
								label="Post Excerpt"
								name="excerpt"
								autoComplete="excerpt"
								value={formData.excerpt}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="slug"
								name="slug"
								autoComplete="slug"
								value={formData.slug}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="content"
								label="content"
								name="content"
								autoComplete="content"
								value={formData.content}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
                        <Grid item xs={12}>							
                            <TextField
								variant="outlined"
								required
								fullWidth
                                type="datetime-local"
								id="eventdate"			
								name="eventdate"
								autoComplete="eventdate" 
                                value={formData.eventdate}               
								onChange={handleChange}                                
							/>
						</Grid>
						<Grid item xs={12}>							
                            <TextField
								variant="outlined"
								required
								fullWidth
								id="postattendee"			
								name="postattendee"
								autoComplete="postattendee" 
                                value={formData.postattendee} 
								multiline
								rows={8}              
								onChange={handleChange}                                
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Post
					</Button>
				</form>
			</div>
		</Container>
	);
}