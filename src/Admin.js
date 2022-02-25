import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/Posts';
import PostLoadingComponent from './components/posts/PostLoading';
import axiosInstance from './axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
function Admin() {
	const history = useHistory();
	var authorID = 1;

    async function getToken() {
        //console.log('***************************************************************');
        const token = await localStorage.getItem('access_token');
        //console.log('undecodedtoken: ',token); 
        //console.log('Titiw');
        const decoded = jwt_decode(token);
        //console.log('***************************************************************');
        //console.log('Decoded data from token', decoded);
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
        //console.log('Final User ID is : ', authorID);
        //console.log(typeof authorID);
        return authorID;    
    }).catch(error => {
        console.log('User ID fetch failed: ', error);
    });

	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			if(authorID === 1) {
				setAppState({ loading: false, posts: allPosts });
				//console.log(res.data);
			}
			else{
				alert('You are not authorized to view this page');
				return history.push('/');
			}
			
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
					All Stories
			</Typography>		
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);

	
}
export default Admin;