import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserService from "../services/UserService";

const ChatRoom = (props) => {

    const [userName, setUsername] = useState("");

    if (props.getUserId() === null || sessionStorage.getItem("user_id") === null) {
        return (<Navigate to='/login'/>);
    }

    UserService.getUserName(props.getUserId(), true).then((res) => setUsername(res.data));

    return (
        <div className='ChatRoom'>
            <p><mark>User Name: {userName}</mark></p>
        </div>


    );

}

export default ChatRoom;
