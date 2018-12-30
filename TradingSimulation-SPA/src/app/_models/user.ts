import { Trade } from './trade';
import { Wallet } from './wallet';
export interface User {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    role?: string;
    wallets?: Wallet[];
    trades?: Trade[];
}
