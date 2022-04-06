import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = (props) => {

    console.log(props);
    
    return ( 
        <div>
            <Card style={{width: '20rem'}}>
                <Card.Title><h1 align="left">Welcome!</h1></Card.Title>
                <div>
                <Link type='button' className='btn btn-primary' to='/login'><i className="bi bi-box-arrow-in-left me-2" />Login</Link>
                </div>
            </Card>
            
        </div>
    );
}
 
export default Home;