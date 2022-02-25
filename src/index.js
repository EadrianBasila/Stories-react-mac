import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Single from './components/posts/Single';
import Search from './components/posts/Search';
import Admin from './Admin';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';
import User from './User';
import CreateUser from './components/user/Create';
import EditUser from './components/user/Edit';
import DeleteUser from './components/user/Delete';

const routing = (
	<Router>
		<React.StrictMode>
			<Header />
			<Switch>
				<Route exact path="/" component={App} />
				{/* For Admin */}
				<Route exact path="/admin" component={Admin} />
				<Route exact path="/admin/create" component={Create} />
				<Route exact path="/admin/edit/:id" component={Edit} />
				<Route exact path="/admin/delete/:id" component={Delete} />
				{/* For User */}
				<Route exact path="/user" component={User} />
				<Route exact path="/user/create" component={CreateUser} />
				<Route exact path="/user/edit/:id" component={EditUser} />
				<Route exact path="/user/delete/:id" component={DeleteUser} />
				{/* For Authentication */}
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				{/* For Search */}
				<Route path="/post/:slug" component={Single} />
				<Route path="/search" component={Search} />
			</Switch>
			<Footer />
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();