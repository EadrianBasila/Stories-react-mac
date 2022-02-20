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
		height: '300px',
	},
	cardMediaB: {
		//paddingTop: '56.25%', // 16:9
		height: '500px',
	},
}));

export default function Post() {

	//TomtomMaps

	const mapElement = useRef();
	const[map, setMap] = useState({});
	const [longitude, setLongitude] = useState(121.01071);
	const [latitude, setLatitude] = useState(14.59795);

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


	

	return (
		
		<Container component="main" maxWidth="md" >
			<CssBaseline />
			<div>
				<Container  maxWidth="md"  id="map" >
				<Card rounded>
						<CardHeader 						
							title = {
								<Typography
									component="h1"
									variant="h3"
									align="left"
									color="textPrimary"
									style={{ marginTop: '10px'}}
									>
									{data.posts.title}
								</Typography>
							}

							subtitle = {
								<Typography
									component="h3"
									variant="h5"
									align="left"
									color="textPrimary"
									
									>
									{data.posts.excerpt}
								</Typography>
							}							
							>							
						</CardHeader>

						<CardMedia
								className={classes.cardMedia}
								image={data.posts.image}
								title={data.posts.title}
							/>

						<CardContent>
							<div style={{display: 'flex', justifyContent:'right', marginTop:'20px'}}>
								<Tooltip
									left
									inset
									style={{marginRight: '10px'}}								
									content={<div>
										Attending: {data.posts.eventresponse}</div>}
									>
									<Button rounded>
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
									<Button rounded>
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
									<Button rounded>
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
									<Button rounded>
										<LinkRoundedIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>


							</div>					
							

						</CardContent>
						<CardActions>
							<Typography
								component="h1"
								variant="h6"
								align="left"
								color="textPrimary"
								style={{marginLeft: '20px', marginBottom: '10px'}}
								>
								{data.posts.content}
							</Typography>
						</CardActions>
					</Card>

					<Card rounded>
						<CardHeader
							title={
								<div style={{display: 'flex', justifyContent:'left', marginTop:'15px'}}>
								<Tooltip
									bottom
									inset	
									style={{marginRight: '10px'}}								
									content={<div>
										Address: {data.posts.eventaddress}</div>}
									>
									<Button rounded>
										<LocationOnRoundedIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
									</Button>	
								</Tooltip>
								<Tooltip
									bottom
									inset	
									style={{marginRight: '10px'}}								
									content={<div> 
										Latitude:{data.posts.eventlat} Longitude: {data.posts.eventlon}</div>}
									>
									<Button rounded>
										<LocationSearchingIcon 
										style={{'fontSize': '20px','verticalAlign':'middle'}}/> 
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
								alignItems="space-around"
								>
									<TextField 
										required
										size ="medium"
										className={classes.textField} 
										id="respondeeEmail" 
										label="Your Email" 
										type="search" 
										variant="outlined" />
									<Divider orientation="vertical" variant="middle"flexItem />
									<Fab
										variant="extended"
										size="large"
										color="primary"
										aria-label="add"
										>
										<DirectionsWalkRounded className={classes.extendedIcon} />
										Join Event
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