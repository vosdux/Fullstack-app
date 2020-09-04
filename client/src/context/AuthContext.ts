import { createContext } from 'react';

const noop = () => {

}

interface IAuth {
    accessToken: string | null,
    refreshToken: string | null,
    expiredIn: number | null,
    userId: string | null,
    login: any,
    logout: any,
    isAuthenticated?: boolean
}

export const AuthContext = createContext<IAuth>({
    accessToken: null,
    refreshToken: null,
    expiredIn: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})