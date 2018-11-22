import { Action } from "@ngrx/store";
import { LoginResponse } from "../entity/response/login.response";
import { SignUpResponse } from "../entity/response/signup.response";
import { LogoutResponse } from "../entity/response/logout.response";
import { GetUserDataResponse } from "../entity/response/get.userdata.response";

export enum AuthActionType {
    LOGGED_IN = 'LOGGED_IN',
    LOGGED_OUT = 'LOGGED_OUT',
    SIGNED_IN = 'SIGNED_IN',
    USERDATA_RETRIEVED = 'USERDATA_RETRIEVED'
}

export class LoggedInAction implements Action {
    readonly type = AuthActionType.LOGGED_IN;
    constructor(public payload: {
        token: string
    }) {}
}

export class LoggedOutAction implements Action {
    readonly type = AuthActionType.LOGGED_OUT;
    constructor() {}
}

export class SignedInAction implements Action {
    readonly type = AuthActionType.SIGNED_IN;
    constructor() {}
}

export class UserDataRetrievedAction implements Action {
    readonly type = AuthActionType.USERDATA_RETRIEVED;
    constructor(public payload: GetUserDataResponse) {} 
}

export type AuthAction =
    LoggedInAction | LoggedOutAction | SignedInAction | UserDataRetrievedAction
