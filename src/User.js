import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/user/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import Typography from '@material-ui/core/Typography';

function User() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			//console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<br/>
			<Typography
					component="h1"
					variant="h3"
					align="center"
					style={{  color: '#387cfa', fontWeight: 'bold' }} //8fa0a5
					>
					Your Stories
			</Typography>	
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default User;