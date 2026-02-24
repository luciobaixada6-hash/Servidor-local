interface Alunostype {
    nome:string;
    endereço:string;
    contato:string | null;
}

const alunos: Array<Alunostype> = [
    {
    nome: "Lúcio",
    endereço: "ponta d´´Agua",
    contato: "7777777777",
}
]

let horastrabalhadas: number = 10;
let precoHora: number = 10;
let taxaUrgencia: number = 10;
let descontos: number = 10;
let total: number = 10;

let variavel: string = "variavel"
descontos === taxaUrgencia && descontos > taxaUrgencia ?
taxaUrgencia += descontos : taxaUrgencia -= descontos;

total =(horastrabalhadas * precoHora) + taxaUrgencia - descontos;
