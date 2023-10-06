import React, {useState} from "react";
import './styles.css';
import api from '../../services/api';
import {useNavigate} from 'react-router-dom';

export default function Login (){

    const [email,SetEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const navigate = useNavigate();

    async function login(event){
        event.preventDefault();

        const data = {
            email,password
        };
        try{
        const response = await api.post('api/account/loginuser',data);
        localStorage.setItem('email',email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiration', response.data.expiration);
        navigate('/usuarios');

        }catch(error){
            alert('erro ao realizar login' + error)
        }

    }

    return(
        <div className="login-container">
            <section className="form">
                <form onSubmit={login}>
                    <h1>LOGIN</h1>
                    <input placeholder="Email"
                        value={email}
                        onChange={e=>SetEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <button class="button" type="submit">Login</button>

                </form>
            </section>
        </div>
    )
}