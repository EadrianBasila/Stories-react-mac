import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



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

    // async function getToken() {
    //     //console.log('***************************************************************');
    //     const token = await localStorage.getItem('access_token');
    //     //console.log('undecodedtoken: ',token); 
    //     //console.log('Titiw');
    //     const decoded = jwt_decode(token);
    //     //console.log('***************************************************************');
    //     //console.log('Decoded data from token', decoded);
    //     const getID =  decoded["user_id"];
    //     //console.log('***************************************************************');
    //     let userID = JSON.stringify(getID);
    //     console.log('User ID from token', userID);
    //     console.log(typeof userID);
    //     return userID;
    // }

    // async function getUserID() {
    //     const userID = await getToken().then(function (result) {           
    //         console.log('User ID from getUserID', result);
    //         return result;
    //       })
    //       .catch(function (error) {
    //         return error;
    //       })() 
    //       console.log('User ID from getUserID', userID);
    //     //return userID;
     
    // }

    async function getUserID() {
        try{
            return await getToken().then(function (result) {           
                console.log('User ID from getUserID', result);
                return result;
              })
            }
            catch(error){
                return error;
            }
    }    


    
    
    
    




    //  function parseID(decoded) {
    //     const decodedtoken =  decoded["user_id"];
    //     const userID = JSON.stringify(decodedtoken);
    //     console.log('Parsing...')
    //     console.log('Stringified user ID', userID);
    //     return userID;
       
    //     //console.log('***************************************************************');
        
    // }

    //  function getUserID(){
    //     const token =  localStorage.getItem('access_token');
    //     console.log('undecodedtoken: ',token); 
    //     //console.log('Titiw');
    //     const decoded =  jwt_decode(token);
    //     const  userID = parseID(decoded);
    //     console.log('User ID from token', userID);
    //     return userID;
        
    // }

    // async function fetchedID() {
    //     let userID = await getUserID();
    //     console.log('User ID from fetchedID', userID);
    //     console.log(typeof userID);
    //     return userID;
    // }



    //const userIDfromToken = getToken();
	const history = useHistory();
    
	const initialFormData = Object.freeze({
		title: '',
		slug: '',
        author: '',
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
		formData.append('author', decodeToken());
		formData.append('excerpt', postData.excerpt);
		formData.append('content', postData.content);
        formData.append('eventdate', postData.eventdate.toString());
		formData.append('image', postimage.image[0]);
		axiosInstance.post(`user/create/`, formData);
		history.push({
			pathname: '/user/',
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