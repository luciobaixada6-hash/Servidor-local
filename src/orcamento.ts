
interface pedidoServicotype {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

function calcularOrcamento(pedido: pedidoServicotype): number {
    const VALOR_HORA = 100; // R$ 100 por hora
    const TAXA_URGENCIA = 1.5; // 50% de acréscimo se urgente
    
    let valor = pedido.horasEstimadas * VALOR_HORA;
    
    if (pedido.urgente) {
        valor *= TAXA_URGENCIA;
    }
    
    return valor;
}

function criarPedido(cliente: string, descricao: string, horas: number, urgente: boolean): pedidoServicotype {
    return {
        cliente,
        descricao,
        horasEstimadas: horas,
        urgente
    };
}

function exibirDetalhes(pedido: pedidoServicotype): string {
    const valor = calcularOrcamento(pedido);
    return `
Cliente: ${pedido.cliente}
Descrição: ${pedido.descricao}
Horas Estimadas: ${pedido.horasEstimadas}h
Urgente: ${pedido.urgente ? 'Sim' : 'Não'}
Valor do Orçamento: R$ ${valor.toFixed(2)}
    `;
}

