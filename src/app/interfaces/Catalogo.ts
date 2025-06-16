export interface Categoria {
    nome_categoria: string;
    id: number
}

export interface Produto {
    id: number;
    descricao: string;
    marca: string;
    preco: number;
    categoria: number | null;
    imagem: string;
}       
