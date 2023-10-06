import React from "react";
import './styles.css';
import { FiCornerDownLeft, FiUser, FiUserPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function NovoUsuario(){

    const{usuarioId} = useParams();

    return(
        <div className="novo-usuario-container">
            <div className="content">
                <section className="form">
                <FiUserPlus size= "105" color="#17202a"/>
                    <h1>{usuarioId === '0'? 'Incluir Novo Usuario' : 'Atualizar Aluno'}</h1>
                    <Link className="back-link" to="/usuarios">
                        <FiCornerDownLeft size="25" color="#17202a"/>
                        Retornar
                    </Link>
                </section>
                <form>
                    <input placeholder="Nome"/>
                    <input placeholder="Email"/>
                    <button className="button" type="submit">{usuarioId === '0' ? 'Incluir' : 'Atualizar'} </button>
                </form>
            </div>
        </div>
    );
}