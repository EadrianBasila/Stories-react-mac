import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import ViewDayRoundedIcon from '@material-ui/icons/ViewDayRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
		
	},
}));

function Header() {
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
							to="/admin/create">
							<ViewDayRoundedIcon style={{'fontSize': '40px'}}/>
						</IconButton>
																
						<Typography
							variant="h6"
							color="inherit"
							noWrap
							className={classes.toolbarTitle}
							
						>
							<Link
								component={NavLink}
								to="/"
								underline="none"
								color="textPrimary"
							>
								PUP iBarkada
							</Link>
						</Typography>					
											
						<SearchBar
							value={data.search}
							onChange={(newValue) => setData({ search: newValue })}
							onRequestSearch={() => goSearch(data.search)}
							style={{'borderRadius': '20px'}}
						/>
					
						{auth &&( <div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="account-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle style={{'fontSize': '40px'}}/>
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
									to="/">
									My Profile
								</MenuItem>

								<MenuItem 
									onClick={handleClose} 
									component={NavLink}
									to="/register">
									Register
								</MenuItem>

								<MenuItem 
									onClick={handleClose}
									component={NavLink}
									to="/login">
									Sign-in 
								</MenuItem>

								<MenuItem 
									onClick={handleClose}
									component={NavLink}
									to="/logout">
									Sign-out 
								</MenuItem>
							</Menu>
						</div>)}
						
					</Toolbar>
				</AppBar>
		</React.Fragment>
	);
}

export default Header;