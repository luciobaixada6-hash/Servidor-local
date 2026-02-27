import { catalogoServicos } from "./servico.js";
import { type PedidoServicotype, type servicotype } from "./utils/type.js"

const taxaUrgencia = 0.3
const minimoDesconto: number = 100
const percentualDesconto: number = 0.1

const servicosSelecionados: servicotype[] = [];


// Função para selecionar serviços e Horário estimado

export function selecionarServicos(nome: string ) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }

    }
    return false;
}

// funcao para calcular o orcamento

export function calcularOrcamento(pedido: PedidoServicotype) {
    let totalbruto: number = 0
    let totalfinal: number = 0

    servicosSelecionados.map((servico: servicotype) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalbruto = totalbruto + totalDoServico
    })

    totalfinal = totalbruto

    if (pedido.urgente) {
        totalfinal = totalbruto + (totalbruto * taxaUrgencia)

    }

    if (totalbruto >= minimoDesconto) {
        totalfinal = totalfinal - (totalbruto * percentualDesconto)
    }
}

// () => {} --- arrow function
// function() {} --- função normal

/*

urgente: true
taxaUrgencia: 0.3
totalbruto: 100
totalbruto: 100 * 0.3 = 30
totalfinal = 100 + (100 * 0.3) = 130

totalbruto: 100
totalbruto apos urgencia: 150
minimo desconto: 100
percentual : 10%
desconto sobre o total final: 150 - 15 = 15
desconto sobre o total bruto: 150 * 0.1 = 10

*/

