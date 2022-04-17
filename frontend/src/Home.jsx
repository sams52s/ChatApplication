import { Card, ListGroup } from 'react-bootstrap';
import './components/chatbox.css';

const Home = (props) => {
    
    
    return ( 
        <div>
            {/* <Card style={{width: '20rem'}}>
                <Card.Title><h1 align="left">Welcome!</h1></Card.Title>
                <div>
                    <p>Please sign in to continue.</p>
                </div>
            </Card> */}
            <div>
                <div>
                    <ListGroup style={{width: '20rem'}}>
                        <ListGroup.Item>Link 1</ListGroup.Item>
                        <ListGroup.Item>Link 2</ListGroup.Item>
                        <ListGroup.Item>This one is a button</ListGroup.Item>
                    </ListGroup>
                </div>
                
                <div>
                    <Card>
                        <Card.Text><h1>Hi there!</h1></Card.Text>
                        <Card.Text><p>vroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroomvroom</p></Card.Text>
                    </Card>
                </div>
            </div>
            
        </div>
    );
}
 
export default Home;