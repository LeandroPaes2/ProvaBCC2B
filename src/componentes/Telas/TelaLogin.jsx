import { useContext, useState } from "react";
import { ContextoUsuario } from "../../App";
import { useNavigate } from "react-router-dom"; // Para navegação

export default function TelaLogin() {
  const { setUsuario } = useContext(ContextoUsuario);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook de navegação

  function handleLogin() {
    if (nickname && password) {
      // Se as credenciais forem fornecidas, faz o login
      setUsuario({ nickname, logado: true });
      navigate("/bate-papo"); // Redireciona para a sala de bate-papo
    } else {
      // Se as credenciais não forem fornecidas, redireciona para o cadastro
      alert("Por favor, informe as credenciais!");
      navigate("/cadastro"); // Redireciona para a página de cadastro
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login</h2>

          <div className="mb-3">
            <label htmlFor="nickname" className="form-label">Nickname</label>
            <input
              type="text"
              className="form-control"
              id="nickname"
              placeholder="Digite seu nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}