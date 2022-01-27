import React from 'react';

function PostLoading(Component) {
    return function PostLoadingComponent({isLoading, ...props}){
        if (!isLoading){
            return <Component {...props} />;
        };
        return (
        <p style = {{fontSize: '25px'}}>
            Loading Data. Please wait...
        </p>
        );
    }
}

export default PostLoading;