import type { NextPage } from "next";
import styles from '../styles/Home.module.css'
import React, { useState } from "react";
import { controleEditora } from "./api/editoras";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { Menu } from "@/componentes/Menu";
import Head from "next/head";


const LivroDados: NextPage = () => {

    const baseURL = "http://localhost:3000/api/livros"; 

    const editoras = controleEditora.getEditoras();
    const opcoes = editoras.map(editora => ({value: editora.codEditora, text: editora.nome})); 

    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState(""); 
    const [codEditora, setCodEditora] = useState(0);
    
    const router = useRouter();

    const incluirLivro = async (livro) => {
        try {
            const opcoesRequest = { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(livro)};
            const resposta = await fetch(baseURL, opcoesRequest);
            resposta.ok;
        } catch (error) {
            console.error("Erro: ", error)
        }
    }
    const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); 

        const novoLivro = {
            codigo: 0,
            codEditora: codEditora,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n')
        };
        try { 
            await incluirLivro(novoLivro); 
            router.push('/LivroLista');
        } catch(error) {
            console.error("Erro:", error);
        };
    }

    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        const valorSelecionado: number = parseInt(evento.target.value, 10);
        setCodEditora(valorSelecionado);
    };
    
    return (
        <>
            <Head>
                <title>Novo Livro </title>
            </Head>
            <Menu />
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
        </>
        
    )
}
export default LivroDados;
