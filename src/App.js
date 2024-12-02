import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import { Provider } from "react-redux"; 
import store from "./redux/store"; 
import TelaLogin from "./componentes/Telas/TelaLogin";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import TelaBatePapo from "./componentes/Telas/TelaBatePapo";

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({ nickname: "", logado: false });

  return (
    <Provider store={store}> 
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<TelaLogin />} />
            <Route path="/cadastro" element={<TelaCadastroUsuario />} />
            {usuario.logado && (
              <Route path="/bate-papo" element={<TelaBatePapo />} />
            )}
            <Route path="/" element={<TelaLogin />} /> 
          </Routes>
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;
