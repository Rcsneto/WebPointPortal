import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './styles.css';
import api from "../../services/api";
import {useNavigate} from 'react-router-dom';

import {FiXCircle, FiEdit, FiUserX} from 'react-icons/fi'


export default function Historico() {

    const[usuarios,setusuarios] = useState([]);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const date = Date.now;
    const nome = ("teste");
    const usuarioId = ("teste");

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
    
  const [hr, setHr] = useState('00');
  const [min, setMin] = useState('00');
  const [s, setS] = useState('00');

  useEffect(() => {
    getMarcacoes();
    const relogio = setInterval(() => {
      let dateToday = new Date();
      let newHr = dateToday.getHours();
      let newMin = dateToday.getMinutes();
      let newS = dateToday.getSeconds();

      if (newHr < 10) newHr = '0' + newHr;
      if (newMin < 10) newMin = '0' + newMin;
      if (newS < 10) newS = '0' + newS;

      setHr(newHr);
      setMin(newMin);
      setS(newS);
    }, 1000);

    return () => clearInterval(relogio);
  }, []);

  async function saveHistorico(event){
    
    const data = {
        date,
        email,
        nome,
        usuarioId
    }
    try{
        debugger;
        await api.post("/api/historico",data); 
        alert('Marcação realizada');
    }catch(error){
        alert('Erro ao gravar historico ' + error); 
    }
}

const getMarcacoes = async()=>{
  debugger;
  await api.get("/api/historico")
  .then(response => {setData(response.data);
    console.log(response.data);
  }).catch(error=>{
    console.log(error);
  })
}

  return (
    <body>
        <div className="usuario-container">
            <header>
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/tabela">Histórico de pontos</Link>
                <Link className="button" to="/novo/0">Novo usuario</Link>
                <button onClick={logout} type="button">
                    <FiXCircle className="logoutbutton" size={35} color="#17202a"/>
                </button>
            </header>
        </div>
      <div className="relogio-container">
        <div className="relogio">
          <div>
            <span id="horas">{hr}</span>
            <span className="tempo">Horas</span>
          </div>

          <div>
            <span id="minutos">{min}</span>
            <span className="tempo">Minutos</span>
          </div>

          <div>
            <span id="segundos">{s}</span>
            <span className="tempo">Segundos</span>
          </div>
          <br/>
        </div>
        <form onSubmit={saveHistorico}>
            <button className="button" type="submit" >Marcar</button>
        </form>
      </div>
    </body>
  );
}
