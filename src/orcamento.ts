import { catalogoServicos } from "./servico.js";
import { type PedidoServicotype, type PrestadorDBType, type servicotype } from "./utils/type.js"

const taxaUrgencia = 0.3
const minimoDesconto: number = 100
const percentualDesconto: number = 0.1

const servicosSelecionados: servicotype[] = [];
const prestadoresDeServico: PrestadorDBType[] = [];
const prestadoresSelecionados: PrestadorDBType[] = [];

// Função para selecionar serviços
export function selecionarServicos(nome: string) {
    const servico = catalogoServicos.find((s) => s?.nome === nome)
    if (servico) {
        servicosSelecionados.push(servico)
        return true
    }
    return false;
}

// Função para selecionar prestadores de serviço
export function selecionarPrestadoresServicos(nomeDoPrestador: string) {
    const prestador = prestadoresDeServico.find((p) => p?.nome === nomeDoPrestador)
    if (prestador) {
        prestadoresSelecionados.push(prestador)
        return true
    }
    return false
}

// Função para criar um prestador de serviço
export function criarPrestadorDeServico(novoPrestador: PrestadorDBType) {
    const existe = prestadoresDeServico.some((p) => p.nome === novoPrestador.nome)
    if (existe) {
        return {
            status: false,
            message: "Já existe um prestador com esse nome.",
            data: null
        }
    }
    prestadoresDeServico.push(novoPrestador)
    return { 
        status: true, 
        message: "Prestador de serviço adicionado com sucesso.", 
        data: novoPrestador 
    }
}

// Função para editar um prestador de serviço
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosDoPrestador: PrestadorDBType) {
    const prestador = prestadoresDeServico.find((p) => p.nome === nomeDoPrestador)
    if (!prestador) {
        return {
            status: false,
            message: "Prestador de serviço não encontrado.",
            data: null
        }
    }

    prestador.nome = novosDadosDoPrestador.nome
    prestador.precoHora = novosDadosDoPrestador.precoHora
    prestador.profissao = novosDadosDoPrestador.profissao
    prestador.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
    prestador.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
    prestador.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia

    return {
        status: true,
        message: "Prestador de serviço editado com sucesso.",
        data: prestador
    }
}

// Função para apagar um prestador de serviço
export function apagarPrestadorDeServico(nomeDoPrestador: string) {
    if (nomeDoPrestador === "") {
        return {
            status: false,
            message: "O nome do prestador de serviço é obrigatório.",
            data: null
        }
    }

    const index = prestadoresDeServico.findIndex((p) => p.nome === nomeDoPrestador)
    if (index === -1) {
        return {
            status: false,
            message: "Nenhum prestador de serviço com o nome foi encontrado.",
            data: null
        }
    }

    prestadoresDeServico.splice(index, 1)
    return {
        status: true,
        message: "Prestador de serviço removido com sucesso.",
        data: null
    }
}

// Função para obter um prestador de serviço
export function obterPrestadorDeServico(nomeDoPrestador: string) {
    const prestador = prestadoresDeServico.find((p) => p.nome === nomeDoPrestador)
    return prestador || null
}

// Função para calcular o orçamento
export function calcularOrcamento(pedido: PedidoServicotype) {
    let totalbruto: number = 0
    let totalfinal: number = 0

    servicosSelecionados.forEach((servico: servicotype) => {
        const totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalbruto += totalDoServico
    })

    totalfinal = totalbruto

    if (pedido.urgente) {
        totalfinal = totalbruto + (totalbruto * taxaUrgencia)
    }

    if (totalbruto >= minimoDesconto) {
        totalfinal = totalfinal - (totalbruto * percentualDesconto)
    }

    return totalfinal
}

/*
Exemplo de cálculo:

urgente: true
taxaUrgencia: 0.3
totalbruto: 100
totalfinal = 100 + (100 * 0.3) = 130

Com desconto:
totalbruto: 100 (>= minimoDesconto)
desconto: 100 * 0.1 = 10
totalfinal: 130 - 10 = 120
*/