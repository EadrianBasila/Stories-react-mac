import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//UI Neumorphism
import { Button, Fab } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
//MaterialUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import DirectionsWalkRounded from '@material-ui/icons/DirectionsWalkRounded';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
//import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';



export default function Create() {
	const history = useHistory();
	const { id } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.delete('admin/delete/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/admin/',
					});
					window.location.reload();
			});
	};

	return (
		<Container component="main" maxWidth="md">
			<Box
				display="flex"
				justifyContent="center"
				m={7}
				p={1}
				bgcolor="transparent"
			>
				<Fab
					bgColor="#e60000" 
					color="#ffffff"
					variant="extended"
					size="large"
					aria-label="add"
					style={{margin: '10px'}}
					onClick={handleSubmit}
					>
					<SentimentDissatisfiedIcon style={{'fontSize': '20px','verticalAlign':'middle', marginRight: '10px'}} />
					Confirm Event Deletion
				</Fab>			
			</Box>
		</Container>
	);
}