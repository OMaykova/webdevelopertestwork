export enum ClientMessageType {
    subscribeMarketData = 1,
    unsubscribeMarketData,
    placeOrder,
}

export enum ServerMessageType {
    success = 1,
    error,
    executionReport,
    marketDataUpdate,
}

export enum OrderSide {
    buy = 1,
    sell,
}

export enum OrderStatus {
    active = 1,
    filled,
    rejected,
    cancelled,
}

export enum Instrument {
    cny_rub = 1,
    eur_rub,
    usd_rub,
    try_rub,
    byn_rub,
    eur_usd,
}