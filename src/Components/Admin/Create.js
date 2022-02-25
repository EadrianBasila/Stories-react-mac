import React, { useRef, useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
//TomtomMaps
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

//UI Neumorphism
import { Button } from 'ui-neumorphism';
import { Card, CardHeader, Checkbox, Fab } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';

//MaterialUI
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
//import Fab from '@material-ui/core/Fab';
import DirectionsWalkRounded from '@material-ui/icons/DirectionsWalkRounded';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//Maps
//import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

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
	textField: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		[`& fieldset`]: {
		  borderRadius: 30,
		},
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


	var authorID = localStorage.getItem("userID"); //to be fixed!
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
		axiosInstance.post(`admin/create/`, formData);
		history.push({
			pathname: '/admin/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<>
			{map &&
			<Container component="main" maxWidth="md" >
				<CssBaseline />
				
				<div className={classes.paper}>
					<form className={classes.form} noValidate>
						<Card rounded >
							<CardActions></CardActions>
							<CardHeader>
								<Typography
									component="h1"
									variant="h3"
									align="center"
									style={{  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
									>
									Let's create a new story!
								</Typography>					
							</CardHeader>	
								<Grid container justify='center' spacing={2}>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<TextField											
												variant="standard"												
												required												
												id="email"
												fullWidth
												placeholder="Enter Event Title"
												name="title"
												autoComplete="title"
												autoFocus
												className={classes.textField}
												onChange={handleChange}
												InputProps={{ disableUnderline: true }}
											/>				
										</Box>													
										</Card>
									</Box>									
								</Grid>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<TextField											
												variant="standard"												
												required												
												id="excerpt"
												fullWidth
												placeholder="Enter Short Event Description"
												name="excerpt"
												autoComplete="ecxcerpt"
												multiline
												rows={3}
												className={classes.textField}
												onChange={handleChange}
												InputProps={{ disableUnderline: true }}
											/>				
										</Box>													
										</Card>
									</Box>									
								</Grid>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<TextField											
												variant="standard"												
												required												
												id="slug"
												fullWidth
												placeholder="event-url"
												name="slug"
												autoComplete="slug"
												value={postData.slug}
												className={classes.textField}
												onChange={handleChange}
												InputProps={{ disableUnderline: true }}
											/>				
										</Box>													
										</Card>
									</Box>								
								</Grid>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<TextField											
												variant="standard"												
												required												
												id="content"
												fullWidth
												placeholder="Enter Event Content"
												name="content"
												autoComplete="content"
												className={classes.textField}
												onChange={handleChange}
												InputProps={{ disableUnderline: true }}
												multiline
												rows={5}
											/>				
										</Box>													
										</Card>
									</Box>												
								</Grid>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<TextField											
												variant="standard"	
												type="datetime-local"																						
												id="eventdate"
												fullWidth
												name="eventdate"
												autoComplete="eventdate"
												autoFocus
												className={classes.textField}
												onChange={handleChange}
												inputProps={{min: new Date().toISOString().slice(0, 16) }}
												InputProps={{ disableUnderline: true }}
											/>				
										</Box>													
										</Card>
									</Box>													
							
								</Grid>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<TextField											
												variant="standard"												
												required												
												id="eventaddress"
												fullWidth
												placeholder="Enter Event Address"
												name="eventaddress"
												autoComplete="eventaddress"
												autoFocus
												className={classes.textField}
												onChange={handleChange}
												InputProps={{ disableUnderline: true }}
											/>				
										</Box>													
										</Card>
									</Box>																								
								</Grid>
								<Grid item xs={12}>	
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>							
											<TextField											
												variant="standard"												
												required												
												id="postattendee"
												fullWidth
												placeholder="Enter attendee email addresses (separated by commas)"
												name="postattendee"
												autoComplete="postattendee"											
												className={classes.textField}
												onChange={handleChange}
												InputProps={{ disableUnderline: true }}
												multiline
												rows={4} 
											/>				
										</Box>													
										</Card>
									</Box>							
								</Grid>
								<Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
											<InputLabel style={{fontSize:'13px'}}>Event Type</InputLabel>
											<Select
												variant="standard"						
												fullWidth											
												id="eventoption"
												name='eventoption'											
												onChange={handleChange}
												disableUnderline
												>
												<MenuItem value={'public'}>Public Event</MenuItem>
												<MenuItem value={'private'}>Private Event</MenuItem>
											</Select>
										</Box>													
										</Card>
									</Box>																							
								</Grid>
								{/* <Grid item xs={12}>
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>
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
										</Box>													
										</Card>
									</Box>												
								</Grid> */}

								<Grid item xs={12}>
									<Grid
										container
										direction="row"
										justifyContent="center"
										alignItems="space-around"
										>
										<Card inset rounded>
											<CardHeader>
												<Box mr={2} ml={2}>	
													<Box p={2}>
															image preview
													</Box>
												</Box>
											</CardHeader>															
										</Card>	
										<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
										<Card inset rounded>
											<CardHeader>
											<Box mr={2} ml={2}>										
											<Box p={2}>
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
													</Box>													
													
												</Box>				
											</CardHeader>															
										</Card>	
										<br/>
										<br/>
									</Grid>
								</Grid>
								
								
							</Grid>
						</Card>
						<br/>
						<br/>
						<div>
							<Container  maxWidth="md"  id="map" >
										<Card className={classes.card} >
									  	<CardActions></CardActions>
											<CardHeader>
												<Typography
													component="h1"
													variant="h5"
													align="center"
													style={{  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
													>
													Pick a place for your event!
												</Typography>					
											</CardHeader>	
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
														<Card inset rounded>
															<CardHeader>
																<TextField											
																	variant="standard"
																	id="longitude"
																	placeholder="Enter Longitude"
																	label="Longitude"
																	name="longitude"
																	size="small"
																	value={longitude}
																	onChange={handleChangeLn}	
																	InputProps={{ disableUnderline: true }}
																/>			
															</CardHeader>															
														</Card>		
														<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
														<Card inset rounded>
															<CardHeader>
																<TextField											
																	variant="standard"
																	id="latitude"
																	placeholder="Enter Latitude"
																	label="Latitude"
																	name="latitude"
																	size="small"
																	value={latitude}
																	onChange={handleChangeLt}	
																	InputProps={{ disableUnderline: true }}
																/>			
															</CardHeader>															
														</Card>	
														<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
														<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
														<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
														<Fab
															type = "submit"
															bgColor="#6197fb" 
															color="#ffffff"
															variant="extended"
															size="large"
															aria-label="add"
															style={{margin: '10px'}}
															onClick={handleSubmit}
															>
															<DirectionsWalkRounded className={classes.extendedIcon} />
															Create Event!
														</Fab>															
												</Grid>																	
											</CardContent>
											
										</Card>
								</Container> 
						</div>
						<Grid item xs={12}>
							
						</Grid>
						
					</form>
				</div>
			</Container>
			}
		</>
	);
}