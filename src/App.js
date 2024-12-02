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
    <Provider store={store}> {/* Envolvendo a aplicação com o Provider */}
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <BrowserRouter>
          {usuario.logado ? (
            <Routes>
              <Route path="/" element={<TelaBatePapo />} />
              <Route path="/cadastro" element={<TelaCadastroUsuario />} />
            </Routes>
          ) : (
            <TelaLogin />
          )}
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;
