interface pedidoServicotype {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

function calcular(pedido: pedidoServicotype, precoHora: number) {
    const valorBase = pedido.horasEstimadas * precoHora;
    const taxaUrgencia = pedido.urgente ? valorBase * 0.3 : 0;
    const valorTotal = valorBase + taxaUrgencia;

    return total
    };
}
