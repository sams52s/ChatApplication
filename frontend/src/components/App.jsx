import React from 'react';
import { Navigate } from 'react-router-dom';

const App = (props) => {

    if (props.main_getEmail() === null) {
        return (
            <Navigate to='/' />
        );
    }

    return (
        <div className='App'>
            <p><mark>{props.main_getEmail()}</mark></p>
        </div>
    );
}
 
export default App;
