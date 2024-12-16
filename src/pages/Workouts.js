import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';

import UserContext from '../context/UserContext';

export default function ProductCatalog() {
	const { user } = useContext(UserContext);

	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if(data.message === "No Workouts found.") {
				setWorkouts([]);
			} else {
				setWorkouts(data.workouts);
			}
		});
	}, [])

	return(
		<>
			<h1 className="my-5">Products</h1>
			<Row className="d-flex justify-content-center mx-auto my-5">
				{
					(workouts.length > 0)
					?
						workouts.map(workout => {
							return(
								<Col className="col-4 justify-content-center mt-4">
					                <Card>
										<Card.Body>
										    <Card.Title className="mb-4 text-center">{workout.name}</Card.Title>
										    <Card.Text className="mb-5">{workout.description}</Card.Text>
										    <Card.Text className="my-5 text-warning">{workout.price}</Card.Text>
										    <Button as={Link} variant="primary" className="col-12" to={`/products/details/${workout._id}`}>Details</Button>
										</Card.Body>
									</Card>
					            </Col>
							)
						})
					:
						<h1>No Planned Workouts :(</h1>
				}
	        </Row>
        </>
	)
}