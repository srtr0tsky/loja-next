import {React, useState} from "react";
import { ControleLivro, lista_livros, Livro } from "./controle/ControleLivros";
import { ControleEditora, editoras, Editora} from "./controle/ControleEditora";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LivroDados = () => {
    const navigate = useNavigate();
    
    const controleLivro = new ControleLivro(lista_livros);
    const controleEditora = new ControleEditora(editoras);
    const opcoes = controleEditora.editoras.map(editora => ({value: editora.codEditora, text: editora.nome}));
    
    
    const [titulo, setTitulo] = useState(""); 
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState("");
    const tam = controleEditora.editoras.length;
    const [codEditora, setCodEditora] = useState(tam === 0? 0: tam+1);
    
    

    const incluir = (evento) =>{
        evento.preventDefault();
        
        const novoLivro = [{
            codigo: 0,
            codEditora: codEditora,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n')
        }]; 
        
        controleLivro.incluirLivro(novoLivro);
        navigate('/');
    }
    const tratarCombo = (evento) => {
        const valorSelecionado = parseInt(evento.target.value, 10);
        setCodEditora(valorSelecionado);
    }   

    return(
        <main className='mt-2 px-5'>
            <h1>Dados do Livro</h1>
            <Form onSubmit={incluir}>
                <Form.Group className="form-group">
                    <Form.Label >Título</Form.Label>
                    <Form.Control type="text" style={{width: '500pt'}} value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Resumo</Form.Label>
                    <textarea className="form-control" type="text" style={{height:'100px', width: '500pt', resize: 'none'}} value={resumo} onChange={(e) => setResumo(e.target.value)}></textarea>
                </Form.Group>
                <Form.Group className="form-group"> 
                    <Form.Label className="form-group">Editora</Form.Label>
                    <select className="form-control selectpicker" style={{width: '500pt'}}  onChange={tratarCombo}>
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                        ))}
                    </select>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Autores (1 por linha)</Form.Label>
                    <textarea className="form-control selectpicker" style={{height:'100px', width: '500pt', resize: 'none'}}  value={autores} onChange={(e) => setAutores(e.target.value)} ></textarea>
                </Form.Group>
                
                <Button type="submit" >Salvar Dados</Button>
            </Form>
        </main>
    );
}; 

export {LivroDados};
