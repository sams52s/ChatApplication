import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const App = (props) => {

    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [receiverId, setreceiverId] = useState(null);
    const [message, setMessage] = useState("");

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);

        switch(payloadData.status) {
            case "JOIN":

                if (!privateChats.get(payloadData.senderId)) {
                    privateChats.set(payloadData.senderId, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;

            case "MESSAGE":

                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);

        if (privateChats.get(payloadData.senderId)) {
            privateChats.get(payloadData.senderId).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }
        else {
            let list = [];
            list.push(payloadData);

            privateChats.set(payloadData.senderId, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onConnected = () => {
        stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
        stompClient.subscribe("/user/"+props.getUserId()+"/private", onPrivateMessageReceived);
    }

    const onError = (err) => {
        console.log(err);
    }

    if (props.getUserId() === null) {
        return (<Navigate to='/login'/>);
    }
    else {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    return (
        <div className='App'>
            <p><mark>User ID: {props.getUserId()}</mark></p>
        </div>
    );
    
}
 
export default App;
