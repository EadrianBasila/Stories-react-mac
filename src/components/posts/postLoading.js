import React from 'react';
import { CircularProgress } from '@material-ui/core';


function PostLoading(Component) {
    return function PostLoadingComponent({isLoading, ...props}){
        if (!isLoading){
            return <Component {...props} />;
        };
        return (
        <div>
            <CircularProgress style={{'color': 'maroon'}}/>
            
            <p style = {{fontSize: '25px'}}>
                Please wait while we load the stories...
            </p>          
            <p style = {{fontSize: '15px'}}>
                If this is taking a while, be sure to check your internet and login credentials, and try again.
            </p>
        </div>
       
    

        );
    }
}

export default PostLoading;