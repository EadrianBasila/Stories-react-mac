import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory, NavLink} from 'react-router-dom';

//UI Neumorphism
import { Button } from 'ui-neumorphism';
import { Card, CardContent, CardHeader, Checkbox } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css';

//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
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

export default function SignUp() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.post(`user/register/`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
			}).then((res) => {
				history.push('/login');
				console.log(res);
				console.log(res.data);
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
								Sign up
							</Typography>
						</div>
						<CardContent>
					<Grid container justify='center' rowSpacing={1}>
							<Grid item xs={12}>
								<Card inset rounded>
									<CardHeader none/>
									<Box ml={2} mr={2}>
										<TextField											
											variant="standard"
											margin="normal"
											required
											fullWidth
											id="email"
											placeholder="Email Address"
											name="email"
											autoComplete="email"
											autoFocus
											className={classes.textField}
											onChange={handleChange}
											InputProps={{ disableUnderline: true }}
										/>
									</Box>						
								</Card>
							</Grid>
							<Grid item xs={12}>
								<Card inset rounded>
									<CardHeader none/>
									<Box ml={2} mr={2}>
										<TextField											
											variant="standard"
											margin="normal"
											required
											fullWidth
											id="username"
											placeholder="Username"
											name="username"
											autoComplete="username"
											autoFocus
											className={classes.textField}
											onChange={handleChange}
											InputProps={{ disableUnderline: true }}
										/>
									</Box>						
								</Card>
							</Grid>
							<Grid item xs={12}>
								<Card inset rounded>
									<CardHeader none/>
									<Box ml={2} mr={2}>
										<TextField											
											variant="standard"
											margin="normal"
											required
											fullWidth
											id="password"
											placeholder="Password"
											name="password"
											autoComplete="current-password"
											autoFocus
											type="password"
											className={classes.textField}
											onChange={handleChange}
											InputProps={{ disableUnderline: true }}
										/>
									</Box>						
								</Card>
							</Grid>
						</Grid>
						<br/>	
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="var(--primary)" />}
								label="I want to receive updates via email."
							/>
						</Grid>	
						<br/>	
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="var(--primary)"
									className={classes.submit}
									onClick={handleSubmit}
								>
									Sign Up
								</Button>
								<Grid container justify="center">
									<Grid item>
										<Link href="#" variant="body2" 
										component={NavLink}
											to="/login">
											Already have an account? Sign in
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