export interface Trade {
    id?: number;
    created?: Date;
    direction?: string;
    resource?: string;
    quantity?: number;
    rate?: number;
    tradeTotal?: number;
}
