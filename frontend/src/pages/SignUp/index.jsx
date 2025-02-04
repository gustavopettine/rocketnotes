import { useState } from 'react';

import { FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp() {

        if (!name || !email || !password) {
            return alert("Fill in all the fields!");
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("User registered successfully!");
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Unable to complete registration!");
                }
            });
    }

    return (
        <Container>

            <Background />
            
            <Form>
                <h1>Rocketnotes</h1>

                <p>Application to save and manage your useful links.</p>

                <h2>Sign Up</h2>

                <Input 
                    type="text" 
                    placeholder="Name" 
                    icon={FiUser} 
                    onChange={e => setName(e.target.value)} 
                />

                <Input 
                    type="email" 
                    placeholder="E-mail" 
                    icon={FiMail} 
                    onChange={e => setEmail(e.target.value)} 
                />

                <Input 
                    type="password" 
                    placeholder="Password" 
                    icon={FiLock} 
                    onChange={e => setPassword(e.target.value)} 
                />

                {/* <Input type="password" placeholder="Confirm password" icon={FiLock} /> */}

                <Button title="Sign Up" onClick={handleSignUp} />

                <Link to="/">Already have an account? <span>Sign In</span></Link>
            </Form>

        </Container>
    );
}
