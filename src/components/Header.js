import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';

//Neumorphism
import { Divider,} from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';


const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: '#e3ebf5'
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		marginLeft: theme.spacing(1),
		flexGrow: 1,
		
	},
	fancy : {
		"&:hover": {
			backgroundColor: '#cddefe',
			color: '#387cfa',
		    fontWeight: 'bold'
		},
	},
	fancy2 : {
		"&:hover": {
			backgroundColor: '#ffcccc',
			color: '#e60000',
		    fontWeight: 'bold'
		},
	}
	

}));

function Header() {

	var authorID = 1;


    async function getToken() {
        //console.log('***************************************************************');
        const token = await localStorage.getItem('access_token');
        //console.log('undecodedtoken: ',token); 
        //console.log('Titiw');
        const decoded = jwt_decode(token);
        //console.log('***************************************************************');
        console.log('Decoded data from token', decoded);
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
        console.log('Final User ID is : ', authorID);
		return authorID;
          
    }).catch(error => {
        console.log('User ID fetch failed: ', error);
    });


	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({ search: '' });
	// for menu bar//////////////////
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	////////////////////////////////

	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};
	return (
		<React.Fragment>
			<CssBaseline />
				<AppBar
					position='static'
					color="default"
					elevation={0}
					className={classes.appBar}
				>
					<Toolbar className={classes.toolbar} style={{'align': 'space-between'}} >
						<IconButton 						
							color="inherit"
							component={NavLink}
							to="/user/create">
							<AmpStoriesRoundedIcon style={{'fontSize': '30px', 'color': '#387cfa'}}/>
						</IconButton>
																
						<Typography
							variant="h6"
							color="inherit"
							noWrap
							className={classes.toolbarTitle}							
						>
							<Link
								style={{ textDecoration: 'none' }}
								component={NavLink}
								to="/"
								underline="none"
								color="textPrimary"
							>
								<Typography
									component="h1"
									variant="h5"
									align="left"
									style={{  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
									>
									PUP iBarkada
								</Typography>
								
							</Link>
						</Typography>					

						<SearchBar
							value={data.search}
							onChange={(newValue) => setData({ search: newValue })}
							onRequestSearch={() => goSearch(data.search)}
							InputProps={{ border: 'none' }}
							style={{
								backgroundColor: 'transparent',
								border: 'none',
								outline: 'none',
								borderRadius: '30px',
							}}/>	
				
		
						
						<IconButton 
							color="inherit"
							component={NavLink}
							to="/admin">
							<AssignmentIndRoundedIcon style={{'fontSize': '30px', 'color': '#387cfa'}}/>
						</IconButton>
							
						
											
						{auth &&( <div>
							<IconButton rounded

								size="large"
								aria-label="account of current user"
								aria-controls="account-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle style={{'fontSize': '30px', 'color': '#387cfa'}}/>
							</IconButton>
							<Menu
								id="account-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
								
							>	
								<MenuItem 
									onClick={handleClose} 
									component={NavLink}
									className={classes.fancy} 
									to="/user">
									My Events
								</MenuItem>

								<MenuItem 
									onClick={handleClose} 
									component={NavLink}
									className={classes.fancy} 

									to="/register">
									Register
								</MenuItem>

								<MenuItem 
									onClick={handleClose}
									component={NavLink}
									className={classes.fancy} 
									
									to="/login">
									Sign-in 
								</MenuItem>

								<MenuItem 
									onClick={handleClose}
									component={NavLink}
									className={classes.fancy2} 

									to="/logout">
									Sign-out 
								</MenuItem>
							</Menu>
						</div>)}
						
					</Toolbar>
					<Divider />
				</AppBar>
		</React.Fragment>
	);
}

export default Header;

