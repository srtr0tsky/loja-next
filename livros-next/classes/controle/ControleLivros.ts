
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

    // obtem a lista de livros 
    obterLivros(): Livro[] {
        return this.lista_livros.filter(livro => livro.codigo >= 0);
    }
    
    // inclui um novo livro à lista
    incluirLivro(lista: Livro[]): void {
        // verifica o tamanho da lista para definir o código do livro 

        if (this.lista_livros.length === 0) {
            lista[0].codigo = 1;
        } else {
            const novoCodigo = this.lista_livros[this.lista_livros.length - 1].codigo + 1;
            lista[0].codigo = novoCodigo;
        }
        // inclui o livro à lista 
        this.lista_livros.push(lista[0]); 
    }

    // função excluir livro 
    excluir(codigo: number): void{
        const index: number = lista_livros.findIndex(lista_livros => lista_livros.codigo === codigo); 
      

        // verifica se o item existe na lista 
        if(index === -1){
            console.error("Livro não encontrado");
        }else{
            lista_livros.splice(index, 1);
        }
        
    }

}

// lista base de livros 
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



export {ControleLivro, lista_livros, Livro};