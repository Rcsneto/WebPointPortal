import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, Navigate } from "react-router-dom";
import api from "../../services/api";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function App() {

  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroData, setFiltroData] = useState(Date.now);
  const token = localStorage.getItem('token');


  const dataFormatada = format(new Date(filtroData), "dd/MM/yy");

  console.log(dataFormatada);

  const [historicoSelecionado, setHistoricoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    data: ''
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setHistoricoSelecionado({
      ...historicoSelecionado, [name]: value
    })
    console.log(historicoSelecionado);
  }

  async function saveEdit() {
    try {
      debugger;
      historicoSelecionado.data = converterDataFormatadaParaOriginal(historicoSelecionado.data);
      await api.put("/api/Historico/" + historicoSelecionado.id, historicoSelecionado);
      abrirFecharModalEditar();
      alert('Usuário editado com sucesso!!')
    } catch (error) {
      alert('Erro ao gravar usuário');
    }
  }
  async function excluiHistorico() {
    try {
      debugger;
      await api.delete("/api/Historico/" + historicoSelecionado.id);
      abrirFecharModalExcluir();
      alert('Marcação excluido com sucesso!!')
    } catch (error) {
      alert('Erro ao gravar usuário');
    }
  }


  const abrirFecharModalEditar = () => {
    debugger;
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir = () => {
    debugger;
    setModalExcluir(!modalExcluir);
  }

  const selecionarHistorico = (historico, opcao) => {
    setHistoricoSelecionado(historico);
    (opcao === "Editar") ?
      abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.toLocaleDateString('pt-BR', { day: '2-digit' });
    const mes = dataFormatada.toLocaleDateString('pt-BR', { month: '2-digit' });
    const ano = dataFormatada.toLocaleDateString('pt-BR', { year: '2-digit' });
    const hora = dataFormatada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${dia}/${mes}/${ano} ${hora}`;
  }

  function converterDataFormatadaParaOriginal(dataFormatada) {
    const partes = dataFormatada.split(/[\s/:-]+/);

    const ano = partes[2];
    const mes = partes[1] - 1; 
    const dia = partes[0];
    const hora = partes[3];
    const minuto = partes[4];
    const segundo = partes[5];

    return new Date(ano, mes, dia, hora, minuto, segundo);
  }

  async function getHistorico() {
    try {
      const response = await api.get(`/api/Historico`);

      const dadosFormatados = response.data.map(historico => ({
        ...historico,
        data: formatarData(historico.data),
      }));

      setData(dadosFormatados);
      return response.data; // Retorna os dados recebidos da API
    } catch (error) {
      alert("Erro na chamada da API");
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    getHistorico();
  });


if(token !== ''){
  return (
    <body>
      <div className="table-container">
        <Link className="button" to="/historico">Voltar</Link>
        <header>
          <h1>Histórico de pontos</h1>
          <br></br>
          <input
            type="text"
            placeholder="Filtrar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <br></br>
          <br></br>
          <DatePicker
            selected={filtroData}
            onChange={(date) => setFiltroData(date)}
            placeholderText="Selecione uma data"
            dateFormat="dd/MM/yyyy" // Formato da data exibido
          />
          <br></br>
        </header>
        <div className="container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Data</th>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data === null ? (
                <tr>
                  <td colSpan="4">Não há usuários para mostrar</td>
                </tr>
              ) : data
                .filter((historico) =>
                  historico.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
                  (!dataFormatada || historico.data.includes(dataFormatada)) // Verifique o filtro por data aqui
                )
                .map((historico) => (
                  <tr key={historico.id}>
                    <td>{historico.id}</td>
                    <td>{historico.data}</td>
                    <td>{historico.nome}</td>
                    <td>{historico.email}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => selecionarHistorico(historico, "Editar")}
                      >
                        Editar
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => selecionarHistorico(historico, "Excluir")}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar usuário</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID:</label><br />
              <input type="text" className="form-control" readOnly value={historicoSelecionado && historicoSelecionado.id} />
              <br />
              <label>Nome:</label>
              <br />
              <input type="text" className="form-control" value={historicoSelecionado && historicoSelecionado.nome} name="nome" onChange={handleChange} /><br />
              <br />
              <label>Email:</label>
              <br />
              <input type="text" className="form-control" value={historicoSelecionado && historicoSelecionado.email} name="email" onChange={handleChange} /><br />
              <br />
              <label>Data:</label>
              <input type="text" className="form-control" value={historicoSelecionado && historicoSelecionado.data} name="data" onChange={handleChange} /><br />
              <br></br>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => saveEdit()}>Editar</button>{" "}
            <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalExcluir}>
          <ModalBody>
            Confirma a exclusão do histórico do usuário(a) : {historicoSelecionado && historicoSelecionado.nome} ?
          </ModalBody>
          <br></br>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => excluiHistorico()}>Sim</button>
            <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir()}>Não</button>
          </ModalFooter>
        </Modal>
      </div>
    </body>
  );
}else{
  Navigate('/');
}
}

export default App;
