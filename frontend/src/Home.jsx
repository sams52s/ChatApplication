import { Card } from 'react-bootstrap';

const Home = (props) => {
    
    return ( 
        <div>
            <Card style={{width: '20rem'}}>
                <Card.Title><h1 align="left">Welcome!</h1></Card.Title>
                <div>
                    <p>Please sign in to continue.</p>
                </div>
            </Card>
            
        </div>
    );
}
 
export default Home;