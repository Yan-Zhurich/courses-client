import { Request } from "./request";

export interface SignUpRequest extends Request {
    login: string,
    password: string,
    email: string
}