import { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
			if(data.message === "No Workouts found.") {
				setWorkouts([]);
			} else {
				setWorkouts(data.workouts);
			}
		});
	}, [])

	return(
		(user.id !== null)
		?
			<>
				<h1 className="my-5">My Workouts</h1>
				<Row className="d-flex justify-content-center mx-auto my-5">
					{
						(workouts.length > 0)
						?
							workouts.map(workout => {
								return(
									<Col className="col-3 justify-content-center mt-4">
						                <Card>
											<Card.Body>
											    <Card.Title className="mb-4 text-center">{workout.name}</Card.Title>
											    <Card.Text className="mb-3">Duration: {workout.duration}</Card.Text>
											    <Card.Text className="mb-1">Status: {workout.status}</Card.Text>
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
	    :
	    	<Navigate to='/login' />
	);
}