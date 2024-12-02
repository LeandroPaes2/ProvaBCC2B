import { useContext, useState } from "react";
import { ContextoUsuario } from "../../App";

export default function TelaLogin() {
  const { setUsuario } = useContext(ContextoUsuario);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (nickname && password) {
      setUsuario({ nickname, logado: true });
    } else {
      alert("Informe as credenciais!");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
