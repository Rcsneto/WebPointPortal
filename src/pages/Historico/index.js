import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './styles.css';
import api from "../../services/api";
import {useNavigate} from 'react-router-dom';
import {TbLogout} from 'react-icons/tb'

export default function Historico() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const date = new Date();    
    const [nome, setNome] = useState("");
    const usuarioId = ("1");
    const email = localStorage.getItem('email');

    const authorization = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    async function getHistoricoByEmail() {
      try {
        debugger;
        const response = await api.get(`/api/Historico/HistoricoByEmail?email=${email}`);
        debugger;
        console.log(response);
        return response.data; // Retorna os dados recebidos da API
      } catch (error) {
          alert("Erro na chamada da API");
          console.error(error);
        throw error; 
      }
    }

    async function checkHistorico() {
      let email = localStorage.getItem('email');
      const historicoEmail = await getHistoricoByEmail(email);
      debugger;
      if (!historicoEmail || historicoEmail.length < 1) {
        alert("Falta inserir o nome");
        openModal();
      }else{
        localStorage.setItem(nome, historicoEmail[0].nome);
        saveHistorico();
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
    
  const [hr, setHr] = useState('00');
  const [min, setMin] = useState('00');
  const [s, setS] = useState('00');

  useEffect(() => {
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
  },[]);

  async function saveHistorico(event){
    
    closeModal();
    console.log(hr,min,s);
    const data = {
      date,
      email,
      nome,
      usuarioId
    }

      let localNome = localStorage.getItem(nome);
      if(localNome != null){
         data.nome = localStorage.getItem(nome);
      }

    try{
      debugger;
      await api.post("/api/historico",data); 
      alert('Marcação feita com sucesso no horario: ' + hr + ':' + min + ':' + s);
    }catch(error){
        alert('Erro ao gravar historico ' + error); 
    }
}

const openModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

const closeModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

if (token !== ""){
  debugger;
if(email === 'admin@email.com'){
  return (
    <body>
        <div className="usuario-container">
            <header>
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/tabela">Histórico de pontos</Link>
                <Link className="button" to="/novo/0">Novo usuario</Link>
                <Link className="button" to="/alterarSenha">Alterar Senha</Link>
                <button onClick={logout} type="button">
                    <TbLogout size={30}/>
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
            <button className="button" onClick={checkHistorico} >Marcar</button>
        </div>
        <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <p>Falta o nome. Por favor, insira o nome:</p>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          <button className="button" onClick={saveHistorico}>Confirmar</button>
        </div>
      </div>
    </body>
  );
}else {
  return (
    <body>
        <div className="usuario-container">
            <header>
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/alterarSenha">Alterar Senha</Link>
                <button onClick={logout} type="button">
                    <TbLogout size={30}/>
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
            <button className="button" onClick={checkHistorico} >Marcar</button>
        </div>
        <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <p>Falta o nome. Por favor, insira o nome:</p>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          <button className="button" onClick={saveHistorico}>Confirmar</button>
        </div>
      </div>
    </body>
  );
}
}else{
  navigate("/");
}
}
