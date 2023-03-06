import {Envelope, Message} from "./Base";
import {ClientMessageType, Instrument, OrderSide, OrderStatus} from "../Enums";
import Decimal from "decimal.js";

export interface ClientEnvelope extends Envelope {
    messageType: ClientMessageType
}

export interface ClientMessage extends Message {

}

export interface SubscribeMarketData extends ClientMessage {
    instrument: Instrument
}

export interface UnsubscribeMarketData extends ClientMessage {
    subscriptionId: string
}

export interface PlaceOrder extends ClientMessage {
    instrument: Instrument
    side: OrderSide
    amount: number | ''
    price: number
    id: number
    creationTime: string
    changeTime: string
    status: OrderStatus
}