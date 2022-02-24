import React, { useRef, useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';

//TomtomMaps
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

//UI Neumorphism

import { Card, CardHeader, Fab, TextArea, Tooltip, Button } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'


//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
//import Fab from '@material-ui/core/Fab';
import DirectionsWalkRounded from '@material-ui/icons/DirectionsWalkRounded';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Link from '@material-ui/core/Link';

// Maps
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	  },
	textField: {
		[`& fieldset`]: {
		  borderRadius: 30,
		},
	},
	joinContainer: {
		justifyContent: 'center',
    	marginLeft: 'auto',
    	marginRight: 'auto',
	},
	mapDiv: {
		width: '100%',
		height: '690px',
		marginTop: '20px',
		marginBottom: '20px',
		position: 'fixed',

	},
	cardMedia: {
		//paddingTop: '56.25%', // 16:9
		height: '350px',
	},
	cardMediaB: {
		//paddingTop: '56.25%', // 16:9
		height: '500px',
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

export default function Post() {


	//TomtomMaps
	var userEmail = localStorage.getItem("userEmail"); //to be fixed!
	var currentID = localStorage.getItem("userID");
	
	const mapElement = useRef();
	const[map, setMap] = useState({});
	const [longitude, setLongitude] = useState(121.01071);
	const [latitude, setLatitude] = useState(14.59795);
	const [orgauthID, setOrgauthID] = useState(1);
	const { slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ posts: [] });

	useEffect(() => {
		
		axiosInstance.get('post/' + slug).then((res) => {
			setData({
				posts: res.data,
			});
			setLongitude(res.data.eventlon);
			setLatitude(res.data.eventlat);
			setOrgauthID(res.data.author);
			console.log(res.data);
		});

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
				draggable: false,
				element: element
			})
			.setLngLat([ longitude, latitude ])
			.addTo(map)

		};
		addMarker();


		return () => map.remove();
	}, [setData,longitude, latitude]);
	///////////////////////////////////////////

	console.log('Current User ID: ' + currentID);
	console.log('Original Author ID: ' + orgauthID);
	

	return (
		
		<Container component="main" maxWidth="md" >
			<CssBaseline />
			<div>
				<Container  maxWidth="md"  id="map" >
				<br/>
				<Card className={classes.fancy2} rounded>
						<CardHeader 						
							title = {
								<Typography
									component="h1"
									variant="h3"
									align="left"
									style={{ marginTop: '10px',  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
									>
									{data.posts.title}
								</Typography>
							}

							subtitle = {
								<Typography
									variant="h5"
									align="left"
									color="textPrimary"
									style={{ marginTop: '5px',  color: '#8fa0a5', fontWeight: 'normal' }}
									>
									{data.posts.excerpt}
								</Typography>
							}							
							>							
						</CardHeader>
						<div style={{display: 'flex', justifyContent:'right', marginTop:'5px', marginBottom: '10px'}}>
								<Tooltip
									left
									inset
									style={{marginRight: '10px'}}								
									content={<div>
										Attending: {data.posts.eventresponse}</div>}
									>
									<Button rounded  bgColor="#6197fb" color="#ffffff">
										<PeopleRoundedIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>

								<Tooltip
									left
									inset	
									style={{marginRight: '10px'}}								
									content={<div> 
										Date: {data.posts.eventdate}</div>}
									>
									<Button rounded  bgColor="#6197fb" color="#ffffff">
										<CalendarTodayRoundedIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>

								<Tooltip
									left
									inset	
									style={{marginRight: '10px'}}								
									content={<div>
										Type: {data.posts.eventoption}</div>}
									>
									<Button rounded  bgColor="#6197fb" color="#ffffff">
										<AccountBalanceIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>

								<Tooltip
									left
									inset

									style={{marginRight: '10px'}}								
									content={<div> 
										Event Code: {data.posts.slug}</div>}
									>
									<Button rounded  bgColor="#6197fb" color="#ffffff">
										<LinkRoundedIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>
								
								<Tooltip
									left
									inset	
									style={{marginRight: '10px'}}								
									content={<div> 
										Latitude:{data.posts.eventlat} Longitude: {data.posts.eventlon}</div>}
									>
									<Button  rounded bgColor="#6197fb" color="#ffffff"> 
									<LocationSearchingIcon
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>
							</div>	
						<CardMedia
								className={classes.cardMedia}
								image={data.posts.image}
								title={data.posts.title}
							/>

						<CardContent>
							<Typography
								component="h1"
								variant="h6"
								align="left"
								color="textPrimary"
								style={{marginLeft: '20px', marginBottom: '10px', color: '#5b6c71'}}
								>
								{data.posts.content}
							</Typography>				
						</CardContent>

						<CardActions>
							
						</CardActions>
					</Card>
								
					<Card rounded>
						<CardHeader
							title={
								<div style={{display: 'flex', justifyContent:'left', marginTop:'15px'}}>
								<Tooltip
									right
									inset	
									style={{marginRight: '10px'}}								
									content={<div>
										Event Address: {data.posts.eventaddress}</div>}
									>
									<Button rounded  bgColor="#6197fb" color="#ffffff">
										<LocationOnRoundedIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/>{data.posts.eventaddress}
									</Button>	
								</Tooltip>
								
							</div>
							}
							>
							
						</CardHeader>
						<CardMedia
							className={classes.cardMediaB}
							ref={mapElement}
						/>
						<CardContent>					
							<Grid
								container
								direction="row"
								justifyContent="center"
								>
									<Card inset rounded>
										<CardHeader>
											<TextField											
												variant="standard"
												id="email"
												label="Your Email"
												placeholder={userEmail}
												value={userEmail}
												name="email"
												size="small"
												InputProps={{ disableUnderline: true }}
											/>			
										</CardHeader>															
									</Card>		
									<Divider orientation="vertical" variant="middle"flexItem />									
										<Fab
											disabled={data.posts.eventoption ==='private' ? true : false}
											bgColor="#6197fb" 
											color="#ffffff"
											variant="extended"
											size="large"
											aria-label="add"
											style={{margin: '10px'}}
											>
											<Link	
											color="textPrimary"
											href={'/user/edit/' + data.posts.id}
											className={classes.link}
											style={{ textDecoration: 'none', alignItems: 'center', justifyContent: 'center' }}
											underline="none">
											<Grid 
											container direction="row"
											justifyContent="center">
												<DirectionsWalkRounded className={classes.extendedIcon} style={{color: data.posts.eventoption ==='private' ? '#8fa0a5' : '#ffffff'}}>
													
												</DirectionsWalkRounded>
												<Typography variant="subtitle1" style={{color: data.posts.eventoption ==='private' ? '#8fa0a5' : '#ffffff'}} >
														Join Event
												</Typography>		
											</Grid>
											
											</Link>	
																			
										</Fab>												
							</Grid>
						</CardContent>
						<CardActions>
							
						</CardActions>
					</Card>
				</Container> 
			</div> 			
		</Container>
	);
}