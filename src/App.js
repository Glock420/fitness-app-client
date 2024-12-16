import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { UserProvider } from './context/UserContext';

import AppNavBar from './components/AppNavBar';

function App() {
    const [user, setUser] = useState({
      id: null,
      email: null
    });

    const [isLoading, setIsLoading] = useState(true);

    const unsetUser = () => {
      localStorage.clear();
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await fetch(`https://fitnessapp-api-ln8u.onrender.com/users/details`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    if (data.user._id === undefined) {
                        setUser({ id: null, email: null });
                    } else {
                        setUser({ id: data.user._id, email: data.user.email });
                    }
                } catch (error) {
                    setUser({ id: null, email: null });
                }
            } else {
                setUser({ id: null, email: null });
            }
            
            setIsLoading(false);
        };

        fetchUserDetails();
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <UserProvider value={{user, setUser, unsetUser}}>
          <Router>
            <AppNavBar />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Container>
          </Router>
        </UserProvider>
    )
}

export default App;