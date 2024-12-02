import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { buscarUsuarios, apagarUsuario } from "../../redux/usuarioReducer"; 

const TelaCadastroUsuario = () => {
    const dispatch = useDispatch();
    const { listaDeUsuarios, mensagem } = useSelector((state) => state.usuario);

    const [usuario, setUsuario] = useState({ nickname: "", avatarUrl: "", senha: "" });
    const [modoEdicao, setModoEdicao] = useState(false);

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleAdicionarUsuario = () => {
        if (!usuario.nickname || !usuario.avatarUrl || !usuario.senha) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        // Como não temos `adicionarUsuario` no reducer, você pode enviar a requisição diretamente
        // Para o backend ou chamar a lógica de salvar de outra forma. Exemplo:
        console.log("Usuário a ser adicionado:", usuario);
        // Aqui, o backend de adição seria chamado via dispatch ou API
        setUsuario({ nickname: "", avatarUrl: "", senha: "" });
    };

    const handleEditarUsuario = (usuarioSelecionado) => {
        setUsuario(usuarioSelecionado);
        setModoEdicao(true);
    };

    const handleAtualizarUsuario = () => {
        // Como não temos `atualizarUsuario` no reducer, você pode enviar a requisição diretamente
        // Para o backend ou chamar a lógica de atualizar de outra forma. Exemplo:
        console.log("Usuário a ser atualizado:", usuario);
        // Aqui, o backend de atualização seria chamado via dispatch ou API
        setUsuario({ nickname: "", avatarUrl: "", senha: "" });
        setModoEdicao(false);
    };

    const handleDeletarUsuario = (usuario) => {
        dispatch(apagarUsuario(usuario));
    };

    return (
        <div className="container mt-4">
            <h2>Cadastro e Gerenciamento de Usuários</h2>
            {mensagem && <div className="alert alert-info">{mensagem}</div>}
            
            <Form className="mb-3">
                <Form.Group controlId="nickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        type="text"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="avatarUrl">
                    <Form.Label>URL do Avatar</Form.Label>
                    <Form.Control
                        type="text"
                        name="avatarUrl"
                        value={usuario.avatarUrl}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        name="senha"
                        value={usuario.senha}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Button
                    className="mt-2"
                    onClick={modoEdicao ? handleAtualizarUsuario : handleAdicionarUsuario}
                >
                    {modoEdicao ? "Atualizar" : "Adicionar"}
                </Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Avatar</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaDeUsuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nickname}</td>
                            <td>
                                <img src={usuario.avatarUrl} alt={usuario.nickname} style={{ width: "50px" }} />
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditarUsuario(usuario)}>
                                    Editar
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleDeletarUsuario(usuario)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TelaCadastroUsuario;
