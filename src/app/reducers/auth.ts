import { State, Action, ActionReducer } from "@ngrx/store";
import { AuthAction } from "../actions/auth";
import { User } from "../entity/user";

export interface AppState {
    isLoggedIn: boolean
    token?: string
    user?: User
}

export function authReducer(state = {
    isLoggedIn: false,
    token: null,
    user: {}
}, action: AuthAction) {
    switch (action.type) {
        case "LOGGED_IN": 
        return {
            ...state,
            isLoggedIn: true,
            token: action.payload.token,
        };
        case "LOGGED_OUT":
        return {
            ...state,
            isLoggedIn: false,
            token: null,
            user: {}
        };
        case "USERDATA_RETRIEVED":
        return {
            ...state,
            user: action.payload.clientUser
        };
        default:
        return state;
    }
};
