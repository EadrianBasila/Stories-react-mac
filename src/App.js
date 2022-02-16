import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';

import TomtomMaps from './components/Maps/TomTomMapview';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Box from '@material-ui/core/Box';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		//paddingTop: '56.25%', // 16:9
		height: '500px',
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {

		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '10px',
		textAlign: 'left',
		marginBottom: theme.spacing(1),
	},
}));

function App() {
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
				<h1>Latest Stories</h1>
				<PostLoading isLoading={appState.loading} posts={appState.posts} />
				<br />
				<Container  maxWidth="md"  id="map" >
				<Card className={classes.card} style={{'borderRadius': '25px'}}>		
						<CardMedia
							className={classes.cardMedia}
							ref={mapElement}

						/>
					<CardContent className={classes.cardContent}>
					<TextField
							variant="outlined"
							margin="normal"
							name="longitude"
							label="Longitude"
							id="longitude"
							value={longitude}
							placeholder="Enter Longitude"
							onChange={handleChangeLn}
						/>
					<TextField
							variant="outlined"
							margin="normal"
							name="latitude"
							label="Latitude"
							id="latitude"
							value={latitude}
							placeholder="Enter Latitude"
							onChange={handleChangeLt}
						/>
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
