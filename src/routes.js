import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from "./pages/Usuario";
import NovoUsuario from "./pages/NovoUsuario";
import Historico from "./pages/Historico"
import Tabela from "./pages/Tabela"

export default function Rotas (){
    return(
        <BrowserRouter>
                <Routes>
                    <Route path="/"  Component={Login}/>
                    <Route path="/usuarios" Component={Usuarios}/>
                    <Route path="/novo/:usuarioId" Component={NovoUsuario}/>
                    <Route path="/historico" Component={Historico}/>
                    <Route path="/tabela" Component={Tabela}/>
                </Routes>
        </BrowserRouter> 
    );
}
