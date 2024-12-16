import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function Home() {
    const { user } = useContext(UserContext);

	return(
		<Row>
            <Col className="mt-5 mx-auto text-center">
                <h1>S84 Workouts</h1>
                <p>Tracking your workouts since 100 BCE</p>
                {(user.id !== null)
                    ?
                        <Link className="btn btn-primary" to={"/workouts"}>My Workouts</Link>
                    :
                        <Link className="btn btn-primary" to={"/login"}>Login</Link>

                }
            </Col>
        </Row>
	)
}