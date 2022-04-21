import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, ButtonGroup, Form, Row, Col } from 'react-bootstrap';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './chatbox.css';
import ChatBox from './chatbox/ChatBox';
import UserService from '../services/UserService';

var stompClient = null; 
const App = (props) => {

    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab, setTab] = useState(0); // Zero represents "EVERYONE", non-zero are all one-2-one

    const [names, setNames] = useState(new Map([[0, "Everyone"]]));


    const [messageInput, setMessageInput] = useState("");

    const onPublicMessageReceived = (payload) => {

        console.log(payload);
        let payloadData = JSON.parse(payload.body);

        switch(payloadData.status) {
            case "JOIN":

                if (!privateChats.get(payloadData.senderId)) {

                    UserService.getUserName(payloadData.senderId, true).then((res) => {
                        names.set(payloadData.senderId, res.data);
                        setNames(new Map(names));
                    });

                    privateChats.set(payloadData.senderId, []);     // Adds a new set of messages
                    setPrivateChats(new Map(privateChats));         // Update

                }

                break;
            case "MESSAGE":

                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;

            case "LEAVE":
                break;

            default:
                console.log("Unknown switch case in 'onPublicMessageReceived'");

        }
    }

    const onPrivateMessageReceived = (payload) => {

        console.log(payload);
        var payloadData = JSON.parse(payload.body);

        if(privateChats.get(payloadData.senderId)) { // 

            privateChats.get(payloadData.senderId).push(payloadData); // Add new message to your sender ID
            setPrivateChats(new Map(privateChats)); // Update the state

        }
        else {

            UserService.getUserName(payloadData.senderId, true).then((res) => {
                names.set(payloadData.senderId, res.data);
                setNames(new Map(names));
            });

            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderId, list);
            setPrivateChats(new Map(privateChats));

        }
    }

    const onConnected = () => {
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/user/'+props.getUserId()+'/private', onPrivateMessageReceived);
    }

    const onError = (err) => {
        console.log(err);
    }

    const userJoin = () => {

            let chatMessage = {
                senderId: props.getUserId(),
                status: 'JOIN'
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const connect = () => {
        var Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
        if (stompClient.connected) {
            userJoin();
        }
    }
    const disconnect = () => {
        var Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        if (stompClient.connected) {
            stompClient.disconnect();
        } 
    }

    const sendPublicMessage = () => {

        if (stompClient) {
            let chatMessage = {
                senderId: props.getUserId(),
                message: messageInput,
                status: 'MESSAGE'
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
            setMessageInput("");
        }
    }

    const sendPrivateMessage = () => {

        if (stompClient) {
            let chatMessage = {
                senderId: props.getUserId(),
                receiverId: tab,
                message: messageInput,
                status: 'MESSAGE'
            };

            if (props.getUserId() !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage))
            setMessageInput("");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (tab === 0) {
            sendPublicMessage();
        }
        else {
            sendPrivateMessage();
        }
    }

    

    if (props.getUserId() === null) {
        disconnect();
        return (<Navigate to='/login'/>);
    }
    else {
        connect();
    }
    
// **************************************************************************************************
    return (
        <div className='App'>

            <div style={{width: '25%', float: 'left'}} className="mt-3 ms-3">

                <h3 className="mb-3 text-muted">Participants</h3>
                <ButtonGroup vertical>
                    <Button key={0} variant='outline-dark' onClick={() => setTab(0)}>
                        {names.get(0)}
                    </Button>
                    {[...privateChats.keys()].map((identity) => (
                        <Button key={identity} variant='outline-dark' onClick={() => setTab(identity)}>
                            {identity}
                            {names.get(identity)}
                        </Button>
                
                    ))}
                </ButtonGroup>
    
            </div>


            <div style={{width: '73.7%', height: '500px', float: 'right'}} className='container'>

                {/* CHAT CONTAINER */}
                <h2 className='mt-3'>{names.get(tab)}</h2>
                <div style={{height: '500px', border: "2px solid grey", borderRadius: '10px', marginTop: '20px', overflowY: 'scroll'}}>
                    
                    {(tab === 0) ? (
                        <div>
                            {publicChats.map((chat, index) => (
                                <div key={index}>
                                    <ChatBox self={chat.senderId === props.getUserId()} message={chat.text} sub={chat.senderId} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <div key={index}>
                                    <ChatBox self={chat.senderId === props.getUserId()} message={chat.text} sub={chat.senderId} />
                                </div>
                            ))}
                        </div>
                    )}
                    


                </div>





                {/* USER INPUT MESSAGES HERE */}
                <div style={{height: '60px', marginTop: '20px'}}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Control className="mb-2" placeholder="Write a message" required={true}
                                value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                            </Col>

                            <Col>
                                <Button variant='success' type="submit" className="mb-1"><i className="bi bi-send" />{' '}Send</Button>
                            </Col>
                            
                        </Row>
                    </Form>
                </div>






            </div>


        </div>
    );
    
}
 
export default App;
