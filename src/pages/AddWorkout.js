import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function Login() {
    const { user } = useContext(UserContext);

    const notyf = new Notyf();

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const [isActive, setIsActive] = useState(true);

    function addWorkout(e) {
        e.preventDefault();

        fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setName('');
                setDuration('');

                notyf.success('New workout session added');
            } else {
                notyf.error('Something went wrong, try again!');
            }
        })
    }

    function clear() {
        setName('');
        setDuration('');
    }

    useEffect(() => {
        if(name !== '' && duration !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, duration]);

    return(
        (user.id !== null)
            ?
                <>
                    <Row className="d-flex justify-content-center mt-5 p-5">
                        <Col className="col-6">
                            <Form onSubmit={(e) => addWorkout(e)}>
                                <h1 className="mb-5 text-center">Add Workout Session</h1>

                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter workout name" 
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="my-3">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter workout duration" 
                                        required
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="mt-5 mx-auto text-center">
                                    {isActive
                                        ?
                                            <Button className="me-4" variant="success" type="submit" id="loginBtn">Add Workout</Button>
                                        :
                                            <Button className="me-4" variant="success" type="submit" id="loginBtn" disabled>Add Workout</Button>
                                    }
                                    <Button variant="danger" id="ClearBtn" onClick={clear}>Clear</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </>
            :    
                <Navigate to='/login' />
    );
}