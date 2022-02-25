import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';

//UI Neumorphism
import { Button } from 'ui-neumorphism';
import { Card, CardHeader, Checkbox, Fab, Tooltip } from 'ui-neumorphism';
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
//Maps
//import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';


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
	var currentID = parseInt(localStorage.getItem("userID")); //to be fixed!
	var userEmail = localStorage.getItem("userEmail"); //to be fixed!
	const history = useHistory();
	const { id } = useParams();
	const [orgauthID, setOrgauthID] = useState();
	const [intResponse, setintResponse] = useState();


	const initialFormData = Object.freeze({
		id: '',
		author: '',
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
		axiosInstance.get('user/edit/postdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				['id']: res.data.id,
				['author']: res.data.author,
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
			setOrgauthID(res.data.author);
			setintResponse(res.data.eventresponse);
			
			//console.log(res.data);
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
		//console.log(formData);
		if (orgauthID === currentID){
			axiosInstance.put(`user/edit/` + id + '/', {
				id: formData.id,
				title: formData.title,
				slug: formData.slug,
				author: formData.author,
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
				pathname: '/user/',
			});
		}
		else{
			formData.eventresponse = parseInt(formData.eventresponse) + 1;
			formData.postattendee = formData.postattendee + ',' + userEmail;
			axiosInstance.put(`user/edit/` + id + '/', {
				id: formData.id,
				title: formData.title,
				slug: formData.slug,
				author: formData.author,
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
				pathname: '/',
			});
			window.location.reload();
			}		
	};

	

	//console.log('Current User ID: ' + currentID);
	//console.log('Original Author ID: ' + orgauthID);

	const classes = useStyles();
	if (orgauthID === currentID) {
		return (		
			<>
				{orgauthID && <Container component="main" maxWidth="md">
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
										Let's edit your story!
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
																									
													id="email"
													fullWidth
													placeholder="Enter Event Title"
													name="title"
													autoComplete="title"
													autoFocus
													value={formData.title}
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
													value={formData.excerpt} 
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
													id="slug"
													fullWidth
													placeholder="event-url"
													name="slug"
													autoComplete="slug"
													value={formData.slug} 
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
																									
													id="content"
													fullWidth
													placeholder="Enter Event Content"
													name="content"
													autoComplete="content"
													value={formData.content} 
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
													value={formData.eventdate} 
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
													id="postattendee"
													fullWidth
													placeholder="Enter attendee email addresses (separated by commas)"
													name="postattendee"
													autoComplete="postattendee"											
													className={classes.textField}
													value={formData.postattendee}
													onChange={handleChange}
													InputProps={{ disableUnderline: true }}
													multiline
													rows={4} 
												/>				
											</Box>													
											</Card>
										</Box>							
									</Grid>
									<CardContent>
										<Grid
											container
											direction="row"
											justifyContent="center"
											alignItems="space-around"
											>
												
												<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
												<Fab
													type = "submit"
													bgColor="#6197fb" 
													color="#ffffff"
													variant="extended"
													size="large"
													aria-label="add"
													style={{margin: '10px'}}
													className={classes.submit}
													onClick={handleSubmit}
													>
													<DirectionsWalkRounded className={classes.extendedIcon} />
													Update Event!
												</Fab>	
																													
											</Grid>										
									</CardContent>								
								</Grid>
							</Card>
					</form>
				</div>
			</Container>
		}			
		</>
		);
	}
	
	if (orgauthID !== currentID) { 
		return(
			<Container component="main" maxWidth="md">
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
									We're excited to have you!
								</Typography>
								<div style={{display: 'flex', justifyContent:'center', marginTop:'25px'}}>
										<Typography
											component="h1"
											variant="h5"
											align="center"
											style={{  color: '#8fa0a5',}} //8fa0a5
											>
											You are joining {formData.title} event
										</Typography>
										<Divider style={{background:'transparent'}} orientation="vertical" variant="middle" flexItem />
										<Button rounded  bgColor={formData.eventoption ==='private' ? '#ff6666' : '#2db300'}  color="#ffffff" style={{marginRight: '10px'}}>
											<CalendarTodayRoundedIcon 
											style={{'fontSize': '20px','verticalAlign':'middle', 'marginRight': '5px'}}/>{formData.eventoption}
										</Button>	
										<Button rounded  bgColor="#6197fb" color="#ffffff" style={{marginRight: '10px'}}>
											<PeopleRoundedIcon 
											style={{'fontSize': '20px','verticalAlign':'middle' , 'marginRight': '5px'}}/>{formData.eventresponse}
										</Button>					
								</div>					
							</CardHeader>	
								<Grid container justify='center' spacing={2}>
								
								<Grid item xs={12}>	
									<Box mr={2} ml={2}>
										<Card inset rounded >
										<CardHeader none/>
										<Box p={2}>							
											<TextField											
												variant="standard"												
												disabled												
												id="postattendee"
												fullWidth
												placeholder="Enter attendee email addresses (separated by commas)"
												name="postattendee"
												autoComplete="postattendee"											
												className={classes.textField}
												label="Your Email"
												value={userEmail}
												InputProps={{ disableUnderline: true }}
											/>				
										</Box>													
										</Card>
									</Box>							
								</Grid>
								<CardContent>
									<Grid
										container
										direction="row"
										justifyContent="center"
										alignItems="space-around"
										>											
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
												Join Event!
											</Fab> 
	
																									
										</Grid>										
								</CardContent>								
							</Grid>
						</Card>
				</form>
			</div>
		</Container>
		);		
	}
	
}