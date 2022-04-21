import React, { useState } from 'react';
import { Form, ButtonGroup, Row, Col, Button } from 'react-bootstrap';
import './components/chatbox.css';
import ChatBox from './components/chatbox/ChatBox';
import UserService from './services/UserService';

function Test() {



    const [currentId, setCurrentId] = useState(0);
    const [count, setCount] = useState(1);

    const [names, setNames] = useState(new Map([[0, "Everyone"]]));
    const [encryptionKeys, setEncryptionKeys] = useState(new Map());



    const increment = () => {
        
        setCount(count + 1);
    }

    const getData = () => {
        UserService.getUserName(count, true).then((res) => {
            names.set(count, res.data);
            increment();
        });
    }

    
    console.log(names);
    console.log(encryptionKeys);

    
    
    return (
        <div>
            <div style={{width: '25%', float: 'left'}} className="mt-3 ms-3">

                <h3 className="mb-2 text-muted">Participants</h3>
                <ButtonGroup vertical>
                    {[...names.keys()].map((identity) => (
                        <Button key={identity} variant='outline-dark' onClick={() => setCurrentId(identity)}>
                            {names.get(identity)}
                        </Button>
                    
                    ))}
                </ButtonGroup>
                
        
            </div>
            <div style={{width: '73.7%', height: '500px', float: 'right'}} className='container'>
                
                <h2 className='mt-3'>{names.get(currentId)}</h2>

                {/* CHAT CONTAINER */}
                <div style={{height: '500px', border: "2px solid grey", borderRadius: '10px', marginTop: '20px', overflowY: 'scroll'}}>
                    

                
                    <div>
                        <ChatBox self={true} message={"Hello!"} sub={"Aly"} />
                    </div>

                    <div>
                        <ChatBox self={false} message={"Hi! How are you?"} sub={"Raiyan"} />
                    </div>

                    <div>
                        <ChatBox self={false} message={"What's up?"} sub={"Toufiqul"} />
                    </div>

                    <div>
                        <ChatBox self={true} message={"I'm good! Nice to meet you guys!"} sub={"Aly"} />
                    </div>
                


                </div>

                






                {/* USER INPUT MESSAGES HERE */}
                <div style={{height: '60px', marginTop: '20px'}}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control className="mb-2" placeholder="Message" required={true} />
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
 
export default Test;