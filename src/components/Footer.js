import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';

//Neumorphism
import { Divider,} from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

const useStyles = makeStyles((theme) => ({
	footer: {
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
		},
	},

}));

function Copyright() {
	return (
		<Typography variant="body2"  align="left">
			{'All rights reserved © '}
			<Link color="inherit" href="/">
				PUP iBarkada
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}


function Footer() {
	const classes = useStyles();
	return (
	
		<Container maxWidth="md" components="footer" className={classes.footer}>
			<Divider />
			<br/>
			<Grid container spacing={2}>
				<Grid item xs={5} md={5} sm container>
					<Grid item xs container direction="column" spacing={2} justify="center"> 
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1" component="div" style={{  color: '#387cfa', fontWeight: 'bold' }}>
							PUP iBarkada            
							</Typography>
							<Typography variant="body2" gutterBottom>
								Make hosting events fast and easy.
							</Typography>
							<Box>
								<Copyright />
							</Box>

						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2} sm container>
					<Grid item xs container direction="column" spacing={2} justify="center">
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1" component="div" style={{  color: '#387cfa', fontWeight: 'bold' }}>
							About              
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="#" component={NavLink} to="/">
									Home
								</Link>{' '}
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="#" component={NavLink} to="/login">
									Sign In
								</Link>{' '}
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="#" component={NavLink} to="/register">
									Sign Up
								</Link>{' '}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2} sm container>
					<Grid item xs container direction="column" spacing={2} justify="center">
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1" component="div" style={{  color: '#387cfa', fontWeight: 'bold' }}>
								Contact Us
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="">
									Email
								</Link>{' '}
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="">
									Phone
								</Link>{' '}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3} sm container>
					<Grid item xs container direction="column" spacing={2} justify="center"> 
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1" component="div" style={{  color: '#387cfa', fontWeight: 'bold' }}>
								Developers
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="https://github.com/EadrianBasila">
									Eadrian M. Basila
								</Link>{' '}
							</Typography>
							<Typography variant="body2">
								<Link color="inherit" href="https://github.com/JohnAlbertFrancisco">
									John Albert Francisco
								</Link>{' '}
							</Typography>
							
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			
		</Container>
	
	);
}

export default Footer;