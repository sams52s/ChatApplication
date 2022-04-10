import { Card } from 'react-bootstrap';

const Home = (props) => {

    const printEmail = () => {
        console.log(props.main_getEmail());
    }
    
    return ( 
        <div>
            <Card style={{width: '20rem'}}>
                <Card.Title><h1 align="left">Welcome!</h1></Card.Title>
                <div>
                    <p>Please sign in to continue.</p>
                    <button onClick={printEmail}>Debug</button>
                </div>
            </Card>
            
        </div>
    );
}
 
export default Home;