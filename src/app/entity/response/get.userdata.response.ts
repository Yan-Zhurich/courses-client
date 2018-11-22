import { Response } from "./response";
import { User } from "../user";

export interface GetUserDataResponse extends Response {
    clientUser: User;
}