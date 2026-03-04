import { catalogoServicos } from "./servico.js";
import { type PedidoServicotype, type PrestadorType, type servicotype } from "./utils/type.js"

const taxaUrgencia = 0.3
const minimoDesconto: number = 100
const percentualDesconto: number = 0.1


const servicosSelecionados: servicotype[] = [];
const prestadoresDeServico: PrestadorType[] = [];
const prestadoresSelecionados: PrestadorType[] = [];

// Função para selecionar serviços e Horário estimado

export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }

    }
    return false;
}

// funcao para criar um prestador de serviço
export function selecionarPrestadoresServicos(nomeDoPrestador: string) {
    // ciclo for que percorre a lista de prestadores de serviço
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        // if que verifica se o item [i] do array eh igual ao nome recebido
        if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
            // se for igual, adicionamos o item [i] do array de prestadores selecionados push
            prestadoresSelecionados.push(prestadoresDeServico[i]!)
            // retornamos true 
            return true
        }
        // senao return false
        return false
    }
}

// Função para criar um prestador de serviço
export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador já existe
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // se o prestador já existe, retornar uma mensagem de erro
            return {
                status: false,
                message: "Já existe um prestador com esse nome.",
                data: null
            }
        }
    })
    // se o prestador não existe, adicionamos o novo prestadores
    prestadoresDeServico.push(novoPrestador)
    return { status: true, message: "Prestador  de servicoadicionado com sucesso.", data: novoPrestador }
}

//funcao para editar um prestador de serviço
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosDoPrestador: PrestadorType) {
    // encontrar o prestador de servico editar na minha lista
    // ciclo for que percorre a lista de prestadores de serviço
    prestadoresDeServico.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.profissao = novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia



        }
    })

    // se nao exis tir nenhum prestador com o nome recebido, retornar uma mensagem de erro

    return {
        status: false,
        message: "Prestador de serviço editado com sucesso.",
        data: null
    }
}

// funcao para apagar um prestador de serviço
// 
export function apagarPrestadorDeServico(nomeDoPrestador: string) {
    /*
    // ciclo para percorrer a lista de prestadores 
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        // if para verificar se o nome do prestador e igual ao nome recebido
        if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
            // se encontrado, remover o prestador
            // prestadoresDeServico.splice(i, 1)
               // prestadoresDeServico.replace(i, "")
            prestadoresDeServico.splice(i, 1)


            // retornar uma mensagem de sucesso
            return {
                status: true,
                message: `Prestador de serviço removido com sucesso.`,
                data: null
            }
        }
    }//   }
// }
   */
  const prestadoresExiste = prestadoresDeServico.some((prestadorExistente: PrestadorType) => prestadorExistente.nome === nomeDoPrestador)
    prestadoresDeServico.filter(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome !== nomeDoPrestador
    )
    // prestadoresDeServico.find() // se encontrar, desolve o item
    // PrestadoresDeServico.some() // se encontrar, desolve o true

    // validacao do nome do prestador 
    if (nomeDoPrestador === "") {
        // se o prestador ja existe, retornar uma mensagem de erro
        return {
            status: false,
            message: "O nome do prestador de serviço é obrigatório.",
            data: prestadoresDeServico
        }
    }

    // se nao existir nenhum prestador com o nome recebido, retornar uma mensagem de erro
    return {
        status: false,
        message: `Nenhum prestador de serviço com o nome foi encontrado.`,
        data: null
    }

}


// funcao para obter um prestador de serviço
export function obterPrestadorDeServico(nomeDoPrestador: string) {
    for (let i = 0; i < prestadoresDeServico.length; i++) {
        if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
            return prestadoresDeServico[i];
        }
    }
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
    return totalfinal
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

