import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import { Provider } from "react-redux"; // Importando o Provider do Redux
import store from "./redux/store"; // Importando a store configurada
import TelaLogin from "./componentes/Telas/TelaLogin";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import TelaBatePapo from "./componentes/Telas/TelaBatePapo";

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({ nickname: "", logado: false });

  return (
    <Provider store={store}> {/* Envolvendo a aplicação com o Provider do Redux */}
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<TelaLogin />} />
            <Route path="/cadastro" element={<TelaCadastroUsuario />} />
            {usuario.logado && (
              <Route path="/bate-papo" element={<TelaBatePapo />} />
            )}
            <Route path="/" element={<TelaLogin />} /> {/* Rota padrão de login */}
          </Routes>
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;