import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { FiArrowLeft, FiCamera, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Container, Form, Avatar } from './styles';

import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Profile() {

    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null)

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    async function handleUpdate() {

        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        };

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event) {

        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <Container>

            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft />
                </button>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} alt="Profile picture" />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input 
                            id="avatar" 
                            type="file" 
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>

                <Input 
                    type="text" 
                    placeholder="Name" 
                    icon={FiUser} 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    type="email" 
                    placeholder="E-mail" 
                    icon={FiMail} 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    type="password" 
                    placeholder="Current password" 
                    icon={FiLock} 
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input 
                    type="password" 
                    placeholder="New password" 
                    icon={FiLock} 
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Save" onClick={handleUpdate} />
            </Form>

        </Container>
    );
}
