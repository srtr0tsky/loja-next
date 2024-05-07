import Livros from "./Livros";
interface Livro{
    codigo: number; 
    codEditora: number; 
    titulo: string;
    resumo: string;
    autores: string[];
}

class ControleLivro {
    lista_livros: Livro[];
    
    constructor(lista_livros: Livro[]) {
        this.lista_livros = lista_livros;
    }

    obterLivros(): Livro[] {
        return this.lista_livros.filter(livro => livro.codigo >= 0);
    }
    
    incluirLivro(lista: Livro[]): void {
        
        if (this.lista_livros.length === 0) {
            lista[0].codigo = 1;
        } else {
            const novoCodigo = this.lista_livros[this.lista_livros.length - 1].codigo + 1;
            lista[0].codigo = novoCodigo;
        }
    
        this.lista_livros.push(lista[0]); 
    }
    
    excluir(codigo: number): void{
        const index: number = lista_livros.findIndex(lista_livros => lista_livros.codigo === codigo); 
        lista_livros.splice(index, 1);
        
    }

}


const lista_livros = [
    {
      "codigo": 1,
      "codEditora": 1,
      "titulo": "Livro A",
      "resumo": "Abecedário",
      "autores": ["Marcos", "Julio"]
    },
    {
      "codigo": 2,
      "codEditora": 2,
      "titulo": "Livro B",
      "resumo": "Abecedário B",
      "autores": ["Fatima", "Antonio"]
    },
    {
      "codigo": 3,
      "codEditora": 3,
      "titulo": "Livro C",
      "resumo": "Abecedário C",
      "autores": ["Juliana", "Joao"]
    }
  ];
const novoLivro: Livro[] = [{codigo: 1, codEditora: 1, titulo: "Livro D", resumo: "Abecedário D", autores:["José", "Mario"]}];
const test_classe_livros = new ControleLivro(lista_livros);
test_classe_livros.incluirLivro(novoLivro);



export {ControleLivro, lista_livros, Livro};