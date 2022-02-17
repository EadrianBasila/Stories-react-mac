import React, { useRef, useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//TomtomMaps
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';


//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import Fab from '@material-ui/core/Fab';
import DirectionsWalkRounded from '@material-ui/icons/DirectionsWalkRounded';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
// Maps
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		//style={{ backgroundImage: `url(${data.posts.image})` }},
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
						<LocationOnRoundedIcon style={{'fontSize': '20px','verticalAlign':'middle'}}/> Event Address: {data.posts.eventaddress} 
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