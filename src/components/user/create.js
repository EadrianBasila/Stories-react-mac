import React, { useRef, useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
//TomtomMaps
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

//MaterialUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Fab from '@material-ui/core/Fab';
import DirectionsWalkRounded from '@material-ui/icons/DirectionsWalkRounded';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//Maps
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';


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
        alignSelf: 'center',
		margin: theme.spacing(3, 0, 2),
	},
    extendedIcon: {
		marginRight: theme.spacing(1),
	  },
	cardMedia: {
		//paddingTop: '56.25%', // 16:9
		height: '500px',
	},
}));



export default function Create() {
	//TomtomMaps

	const mapElement = useRef();
	const[map, setMap] = useState({});
	const [longitude, setLongitude] = useState(121.01071);
	const [latitude, setLatitude] = useState(14.59795);
	const handleChangeLn = (e) => {
		setLongitude(e.target.value);	
	};
	const handleChangeLt = (e) => {
		setLatitude(e.target.value);	
	};

	useEffect(() => {

		let map = tt.map({
			key: 'IFtSE2MH4pH9NWEVuAYOADCyGo9FNSOC',
			container: mapElement.current,
			center: [ longitude, latitude ],
			stylesVisibility: {
				trafficIncidents: true,
				trafficFlow: true,
			},
			
			zoom: 17,
		});

		setMap(map);
		const addMarker = () => {
			const element = document.createElement('div');
			element.className = 'marker';
			const marker = new tt.Marker({
				draggable: true,
				element: element
			})
			.setLngLat([ longitude, latitude ])
			.addTo(map)

			marker.on('dragend', () => {
				const lngLat = marker.getLngLat();
				setLongitude(lngLat.lng);
				setLatitude(lngLat.lat);
			})
		};
		addMarker();


		return () => map.remove();
	}, [longitude, latitude]);



	////////////////////////////////////////////////////////////////////////////
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


    //const userIDfromToken = getToken();
	const history = useHistory();
    
	const initialFormData = Object.freeze({
		title: '',
		slug: '',
        author: '',
		excerpt: '',
		content: '',
        eventdate: '',
		postattendee: '',
		eventoption: '',
		eventaddress: '',
		eventlon: '',
		eventlat: '',
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
		formData.append('author', authorID);
		formData.append('excerpt', postData.excerpt);
		formData.append('content', postData.content);
        formData.append('eventdate', postData.eventdate.toString());
		formData.append('image', postimage.image[0]);
		formData.append('postattendee', postData.postattendee);
		formData.append('eventoption', postData.eventoption);
		formData.append('eventaddress', postData.eventaddress);
		formData.append('eventlon', parseFloat(longitude));
		formData.append('eventlat', parseFloat(latitude));
		axiosInstance.post(`user/create/`, formData);
		history.push({
			pathname: '/user/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<>
			{map &&
			<Container component="main" maxWidth="md">
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
									label="Description"
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
									inputProps={{
										min: new Date().toISOString().slice(0, 16),
									  }}
									autoComplete="eventdate"                  
									onChange={handleChange}                                
								/>
							</Grid>
							<Grid item xs={12}>							
								<TextField
									variant="outlined"
									required
									fullWidth
									id="evenaddress"
									label="Event Address"			
									name="eventaddress"
									autoComplete="eventAddress"              
									onChange={handleChange}                                
								/>
							</Grid>
							<Grid item xs={12}>							
								<TextField
									variant="outlined"
									required
									fullWidth
									id="postattendee"
									label="Event Attendees"
									placeholder="Enter attendee email addresses (separated by commas)"			
									name="postattendee"
									autoComplete="postattendee" 
									multiline
									rows={4}             
									onChange={handleChange}                                
								/>
							</Grid>
							<Grid item xs={12}>
								<InputLabel id="eventtypeLabel">Event Type</InputLabel>
									<Select
										variant="outlined"
										required
										fullWidth
										labelId="eventtypeLabel"
										id="eventoption"
										name='eventoption'
										label="Event Type"
										onChange={handleChange}
									>
										<MenuItem value={'public'}>Public Event</MenuItem>
										<MenuItem value={'private'}>Private Event</MenuItem>
									</Select>
							</Grid>
							<Grid item xs={12}>
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
						</Grid>
						<div>
							<Container  maxWidth="md"  id="map" >
										<Card className={classes.card} style={{'borderRadius': '25px'}}>		
												<CardMedia
													className={classes.cardMedia}
													ref={mapElement}
												/>
											<CardContent>					
												<Grid
													container
													direction="row"
													justifyContent="center"
													alignItems="space-around"
													>
														<TextField
															variant="outlined"
															name="longitude"
															label="Longitude"
															id="longitude"
															value={longitude}							
															size="small"
															placeholder="Enter Longitude"
															onChange={handleChangeLn}
														/>
														<Divider orientation="vertical" variant="middle"flexItem />
														<TextField
															variant="outlined"

															name="latitude"
															label="Latitude"
															id="latitude"
															value={latitude}							
															size="small"
															placeholder="Enter Latitude"
															onChange={handleChangeLt}
														/>							
												</Grid>
											</CardContent>
											<CardActions>
												
											</CardActions>
										</Card>
								</Container> 
						</div>
						<Grid item xs={12}>
							<Fab
								type = "submit"
								variant="extended"
								item xs={12}
								size="large"
								color="primary"
								aria-label="add"
								onClick={handleSubmit}
								>
								<DirectionsWalkRounded className={classes.extendedIcon} />
								Create Event
							</Fab>
						</Grid>
						
					</form>
				</div>
			</Container>
			}
		</>
	);
}