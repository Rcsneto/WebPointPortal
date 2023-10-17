import React, { useState } from "react";
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate} from "react-router-dom";
import api from "../../services/api";

export default function NovoUsuario(){

    const [Email,setEmail] = useState('')
    const [Password,setSenha] = useState('');
    const [ConfirmPassword,setConfirmaSenha] = useState('');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    async function saveUser(event){
        event.preventDefault();

        const data = {
            Email,
            Password,
            ConfirmPassword
        }
        try{
            debugger;
            await api.post("/api/account/createUser",data); 
            alert('Usuário criado com sucesso!!')
            navigate('/historico');
        }catch(error){
            alert('Erro ao gravar usuário, A senha deve conter: letra maiúscula,letra minúscula,as duas senhas devem ser iguais,carater especial e mais de 6 digitos'); 
        }
    }
if(token !== ''){
    return(
        <div className="novo-usuario-container">
            <div className="content">
                <section className="form">
                <FiUserPlus size= "105" color="#17202a"/>
                    <h1>Incluir Novo Usuario</h1>
                    <Link className="back-link" to="/historico">
                        <FiCornerDownLeft size="25" color="#17202a"/>
                        Retornar
                    </Link>
                </section>
                <form onSubmit={saveUser}>
                    <input placeholder="Email"
                    onChange={e=> setEmail(e.target.value)}
                    />
                    <input placeholder="Senha" type="password"
                    onChange={e=> setSenha(e.target.value)}
                    />
                    <input placeholder="ConfirmarSenha" type="password"
                    onChange={e=> setConfirmaSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Incluir</button>
                </form>
            </div>
        </div>
    );
}else{
    navigate('/');
}
}