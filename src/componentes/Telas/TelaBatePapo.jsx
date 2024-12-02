import { useState, useContext } from "react";
import { ContextoUsuario } from "../../App";  

export default function TelaBatePapo() {
  const { usuario } = useContext(ContextoUsuario);  
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");

  if (!usuario.logado) {
    
    window.location.href = '/login';
    return null;
  }

  function handlePostMessage() {
    if (!mensagem.trim()) {
      alert("A mensagem não pode ser vazia!");
      return;
    }
    setMensagens([
      ...mensagens,
      { texto: mensagem, autor: usuario.nickname, lida: false, timestamp: Date.now() },
    ]);
    setMensagem("");
  }

  function toggleLida(index) {
    setMensagens(
      mensagens.map((msg, i) =>
        i === index ? { ...msg, lida: !msg.lida } : msg
      )
    );
  }

  function handleDeleteMessage(index) {
    const msg = mensagens[index];
    if (msg.autor === usuario.nickname && Date.now() - msg.timestamp < 60000) {
      setMensagens(mensagens.filter((_, i) => i !== index));
    } else {
      alert("Você não pode excluir esta mensagem!");
    }
  }

  return (
    <div>
      <h2>Bate-papo</h2>
      <div>
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <button onClick={handlePostMessage}>Enviar</button>
      </div>
      <ul>
        {mensagens.map((msg, index) => (
          <li key={index}>
            <strong>{msg.autor}</strong>: {msg.texto}{" "}
            <span>{msg.lida ? "Lida" : "Não lida"}</span>
            <button onClick={() => toggleLida(index)}>Alterar Status</button>
            <button onClick={() => handleDeleteMessage(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
