import React, { useRef, useEffect, useState, } from 'react';
import jwt_decode from 'jwt-decode';
//UI Neumorphism
import { Button, CardHeader } from 'ui-neumorphism'
import { Card } from 'ui-neumorphism'
import { overrideThemeVariables } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'


import './App.css';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		//paddingTop: '56.25%', // 16:9
		height: '500px',
	},
	colorized: {
		backgroundColor: '#e3ebf5',
	},
	textField: {
		[`& fieldset`]: {
		  borderRadius: 30,
		},
	},


}));




function App() {
	var authorID = 1;

    async function getToken() {
        //console.log('***************************************************************');
        const token = await localStorage.getItem('access_token');
        //console.log('undecodedtoken: ',token); 
        //console.log('Titiw');
        const decoded = jwt_decode(token);
        //console.log('***************************************************************');
        //console.log('Decoded data from token', decoded);
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
        //console.log('Final User ID is : ', authorID);
        //console.log(typeof authorID);
		localStorage.setItem("userID", authorID);
		console.log("UserID loaded to local storage");
        return authorID;    
    }).catch(error => {
        console.log('User ID fetch failed: ', error);
    });


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

	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	const classes = useStyles();

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			//console.log(res.data);
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
	}, [setAppState, longitude, latitude]);
	
	return (
		<>
		{map &&
			<div className="App">
				<br/>
				<Typography
					component="h1"
					variant="h3"
					align="center"
					style={{  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
					>
					Latest Stories
				</Typography>		
				<br/>
				<PostLoading isLoading={appState.loading} posts={appState.posts} />
				<br />
				<br />
				<Container  maxWidth="md"  id="map" className='classes.colorized'>
					<Card rounded elevation={2}>
						<CardActions>							
						</CardActions>
						<CardHeader>
							<Typography
								component="h1"
								variant="h3"
								align="center"
								style={{  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
								>
								Events Around You!
							</Typography>					
						</CardHeader>	
						<CardMedia
							dark
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
							</Grid>
						</CardContent>
						<CardActions>
							
						</CardActions>
					</Card>
				</Container> 
				

			</div>
		}
	</>
	);
}
export default App;
