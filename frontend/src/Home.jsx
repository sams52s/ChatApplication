import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './components/chatbox.css';

const Home = (props) => {
    

    
    return ( 
        <div>
            <Card style={{width: '20rem'}}>
                <Card.Title><h1 align="left">Welcome!</h1></Card.Title>
                <div>
                    <p>Please sign in to continue.</p>
                </div>
                <Link to="/test">Test Page</Link>
            </Card>
            
           
            
        </div>
    );
}
 
export default Home;