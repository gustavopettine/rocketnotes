import { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, Form, Background } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleSignIn() {
        signIn({ email, password });
    }

    return (
        <Container>
            
            <Form>
                <h1>Rocketnotes</h1>

                <p>Application to save and manage your useful links.</p>

                <h2>Sign In</h2>

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

                <Button title="Sign In" onClick={handleSignIn} />

                <Link to="/signup">Don't have an account yet? <span>Sign Up</span></Link>
            </Form>

            <Background />

        </Container>
    );
}
