import React, {Component} from 'react';
import { ProgressCircular,  Card, CardContent, Button } from 'ui-neumorphism'
import { H4, H6, Subtitle1, TextField, H5 } from 'ui-neumorphism'

function PostLoading(Component) {
    return function PostLoadingComponent({isLoading, ...props}){
        if (!isLoading){
            return <Component {...props} />;
        };
        return ( 
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
                 <ProgressCircular indeterminate size={150} width={35} color='var(--primary)' />
                 
            </div>
            
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
                <Card rounded >
                    <CardContent>
                        <H5>
                            Please wait while we load the stories...
                        </H5>
                        <Subtitle1 >
                            If this is taking a while, be sure to check your internet and login credentials, and try again.
                        </Subtitle1>
                    </CardContent>
                </Card>
            </div>


        </div>
    

        );
    }
}

export default PostLoading;