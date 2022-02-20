import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';

//UI Neumorphism
import { Button } from 'ui-neumorphism';
import { Card, CardContent } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';

//MaterialUI
import Avatar from '@material-ui/core/Avatar';
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		marginTop: '20px',
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		display: 'flex',
		margin: theme.spacing(3, 0, 2),
	},
	textField: {
		[`& fieldset`]: {
		  borderRadius: 30,
		},
	},
	
}));

export default function SignIn() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				console.log('login info: ',res.data);
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/');
				//console.log(res);
				//console.log(res.data);
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				
				<form className={classes.form} noValidate>
					<Card rounded>
						<div 
							style={{
								display: 'flex',  
								justifyContent:'center', 
								alignItems:'center', 
								flexDirection:'column', 
								marginTop:'20px'}}
							>
							<Avatar className={classes.avatar}></Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
						</div>
						
						<CardContent>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								className={classes.textField}
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"								
								autoComplete="current-password"
								className={classes.textField}
								onChange={handleChange}
							/>
							<br/>
							<FormControlLabel								
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<br/>
							<Button
								type="submit"
								size='large'
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={handleSubmit}
							>
								Sign In
							</Button>
							<Grid container justify='center'>
								
								<Grid item>
									<Link href="#" variant="body2" component={NavLink}
										to="/register">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<br/>
						</CardContent>
						
					</Card>
					
				</form>
			</div>
		</Container>
	);
}