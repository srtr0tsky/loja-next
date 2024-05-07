import React, { useState, useEffect } from 'react';
import { ControleLivro, lista_livros } from './controle/ControleLivros';
import { ControleEditora, editoras } from './controle/ControleEditora';
import {Button, Table} from 'react-bootstrap';

function LivroLista(props) {
    const controleLivro = new ControleLivro(lista_livros);
    const controleEditora = new ControleEditora(editoras); 

    const [livros, setLivros] = useState([]); 
    const [carregado, setCarregado] = useState(false); 

    
    useEffect(() => {
        const carregarLivros = async () => {
            setTimeout(async()=> {
            const livrosCarregados = await controleLivro.obterLivros();
            setLivros(livrosCarregados);
            setCarregado(true);}, 2000);
        };
        if (!carregado){
            carregarLivros();
        }
    }, [carregado]);

    const excluir = (codigoLivro) => {
        controleLivro.excluir(codigoLivro);
        setCarregado(false);
    }; 
    

    const LinhaLivro = (props) => {
        const { livro } = props;
       
        const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
        
        return (
           
                
                <tr> 
                    <td>
                        <td>{livro.titulo}</td>
                        <Button variant="danger" onClick={() => excluir(livro.codigo)}>Excluir</Button>
                    </td>
                    
                    <td>{livro.resumo}</td>
                    <td>{nomeEditora}</td>
                    <td>
                        <ul>
                            {livro.autores.map((autor, index) => (
                                <li key={index}>{autor}</li>
                            ))}
                        </ul>
                    </td>
                    
                </tr>
           
        )
    };

    return (
        <div>
    <div>
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
                            {livros.map((livro, index) => (
                                <LinhaLivro key={livro.codigo} livro={livro} />
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
</div>

  );
}


export {LivroLista};
