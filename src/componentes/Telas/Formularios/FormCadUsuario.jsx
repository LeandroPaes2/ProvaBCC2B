import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { gravarUsuario } from '../../../servicos/servicoUsuario';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado || {});
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                gravarUsuario(usuario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    })
                    .catch((erro) => {
                        toast.error(`Erro ao cadastrar usuário: ${erro.message}`);
                    });
            } else {
                // Editar usuário
                props.setListaDeUsuarios(
                    props.listaDeUsuarios.map((item) => (item.nickname !== usuario.nickname ? item : usuario))
                );
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({});
                props.setExibirTabela(true);
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname || ''}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nickname!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id="senha"
                        name="senha"
                        value={usuario.senha || ''}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a senha!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Avatar (URL)</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="avatar"
                        name="avatar"
                        value={usuario.avatar || ''}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a URL do avatar!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mt-2 mb-2">
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Confirmar'}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button
                        onClick={() => {
                            props.setExibirTabela(true);
                        }}
                    >
                        Voltar
                    </Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    );
}
