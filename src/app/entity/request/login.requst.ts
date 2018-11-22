import { Request } from "./request";

export interface LoginRequest extends Request {
    username: string;
    password: string;
}