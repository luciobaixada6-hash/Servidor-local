class Prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number

    constructor(nomeDoPrestador: string, precoHoraDoPrestador: number, profissaoDoPrestador: string, minimoParaDescontoDoPrestador: number, percentagemDescontoDoPrestador: number, taxaUrgenciaDoPrestador: number) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minimoParaDescontoDoPrestador
        this.percentagemDesconto = percentagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenciaDoPrestador
    }
    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }

    alterarNome(novoNome: string) {
        this.nome = novoNome
    }
}

const prestador1 = new Prestador(
    "Lúcio",
    150,
    "desenvolvedor de software",
    10000,
    0.4,
    0.1
)

console.log(prestador1)

/*
nome"Lúcio",
   precohora: 150,
   profissao: "desenvolvedor de software",
   minimoParaDesconto: 10000,
   percentagemDesconto: 0.4,
   taxaUrgencia: 0.1
*/