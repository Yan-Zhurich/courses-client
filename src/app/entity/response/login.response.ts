import { Response } from "./response";

export interface LoginResponse extends Response {
    username: string;
}