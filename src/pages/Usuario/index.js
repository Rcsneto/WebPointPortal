import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './styles.css';
import api from "../../services/api";
import {useNavigate} from 'react-router-dom';

import {FiXCircle, FiEdit, FiUserX} from 'react-icons/fi'

export default function Usuarios(){

    const[nome,setNome] = useState('');
    const[usuarios,setusuarios] = useState([]);

    const navigate = useNavigate();

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    async function logout(){
        try{
           localStorage.clear();
           localStorage.setItem('token','');
           authorization.headers ='';
           navigate('/'); 
        }catch(err){
         alert('Não foi possível fazer o logout' + err);
        }
      }

    useEffect (() =>{
        api.get('api/usuarios', authorization).then(
            response=> {setusuarios(response.data);
            },token)
    })

    return(
        <div className="usuario-container">
            <header>
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/novo/0">Novo usuario</Link>
                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a"/>
                </button>
            </header>
            <form>
                <input type='text' placeholder="Nome"/>
                <button type="button" class='button'>
                    Filtrar usuario por nome (parcial)
                    </button>
            </form>
            <br/>
            <h1>Relação de usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.usuarioid}>
                        <b>Nome:</b>{usuario.nome}<br /><br />
                        <b>Email:</b>{usuario.email}<br /><br />

                        <button type="button">
                            <FiEdit size="25" color="#17202a" />
                        </button>
                        <button>
                            <FiUserX size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}