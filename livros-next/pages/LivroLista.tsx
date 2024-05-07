import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { Menu } from "../componentes/Menu";
import { Table, Button } from "react-bootstrap";
import { controleEditora } from "./api/editoras";
import { lista_livros } from "@/classes/controle/ControleLivros";

const baseURL = "http://localhost:3000/api/livros";

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    const obter = async () => {
        try {
          const resposta = await fetch(baseURL);
          const dados = await resposta.json();
          return dados;
        } catch (error) {
          console.error('Erro: ', error);
          throw error;
        }
      };
    
    const excluirLivro = async(codLivro:number) => {
        try{
            const resposta = await fetch(`${baseURL}/${codLivro}`, {method: 'DELETE'});
            return resposta.ok;
        }catch(error){
            console.error("Erro:", error);
            throw error; 
        }
    };
    const excluir = async (codigo:number) => {
        try {
            await excluirLivro(codigo);
            setCarregado(false);
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    
    useEffect(() => {
        obter()
            .then(livrosCarregados => {
                setLivros(livrosCarregados); 
                setCarregado(true);
            })
            .catch(error => {
                console.error("Erro ao carregar os livros: ", error);
                setCarregado(false); 
            })
    }, [carregado])

    return (
        <>  
            <div className={styles.container}>
                <Head>
                    <title> Catalogo </title>
                </Head>
                <Menu/> 
                <main className='mt-2 px-5'>
                <h1>Catálogo de Livros </h1>
                {carregado ? (
                    <Table color="white" striped="columns" size="sm" className=''>
                        <thead>
                            <tr bgcolor='black' style={{color: "white"}} >
                                <th >Título</th>
                                <th >Resumo</th>
                                <th>Editora</th>
                                <th>Autores</th>
                            </tr>
                        </thead>
                        {livros.length > 0 ? (
                            <tbody>
                                {livros.map(livro => (
                                    <tr> 
                                        <td>
                                            <td>{livro.titulo}</td>
                                            <Button variant="danger" onClick={() => excluir(livro.codigo)}>Excluir</Button>
                                        </td>
                                        
                                        <td>{livro.resumo}</td>
                                        <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
                                        <td>
                                            <ul>
                                                {livro.autores.map((autor, index) => (
                                                    <li>{autor}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <div>
                                <h1>Não há nenhum livro</h1>
                            </div>
                        )}
                    </Table>
                ) : (
                    <h1>Carregando...</h1>
                )}
                    </main>
            </div>
        </>
    )
};

export default LivroLista;