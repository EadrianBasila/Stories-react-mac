import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
//DatePicker
import moment from 'moment';
//import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
//import DateMomentUtils from '@date-io/moment';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
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
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}
    ///////////////////////////////////////////////////////////////////For Date
    // const [eventdate, setDate] = useState(
    //     moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")
    //  );
    //  const handleChangeDate = e => {
    //     setDate(e.target.value);
    //  };

	const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
        eventdate: '',
	});

	const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(null);

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'title') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
				['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('slug', postData.slug);
		formData.append('author', 1);
		formData.append('excerpt', postData.excerpt);
		formData.append('content', postData.content);
        formData.append('eventdate', postData.eventdate.toString());
		formData.append('image', postimage.image[0]);
		axiosInstance.post(`admin/create/`, formData);
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				
				<Typography component="h1" variant="h4">
					Let's create a new story!
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
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="Post URL Slug"
								name="slug"
								autoComplete="slug"
								value={postData.slug}
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
								onChange={handleChange}
								multiline
								rows={4}
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
								onChange={handleChange}                                
							/>
						</Grid>
                       <label htmlFor="post-image">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <input
                            
							accept="image/*"
							className={classes.input}
							id="post-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
                        
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						 Post Story
					</Button>
				</form>
			</div>
		</Container>
	);
}