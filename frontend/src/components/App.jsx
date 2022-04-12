import React from 'react';
import { Navigate } from 'react-router-dom';

const App = (props) => {

    

    if (props.getUserId() === null) {
        return (<Navigate to='/login'/>);
    }
    
    
    return (
        <div className='App'>
            <p><mark>User ID: {props.getUserId()}</mark></p>
        </div>
    );
    
}
 
export default App;
