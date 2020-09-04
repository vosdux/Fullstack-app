import { getParsedLocalStorage } from './../helpers/utils';
import { useState, useCallback, useEffect } from 'react';
import { storageName } from '../helpers/constants';

export interface IUserInfo {
    login: (accessToken: string | null, refreshToken: string | null, expiredIn: number | null, userId: string | null) => void,
    logout: () => void,
    accessToken: string | null,
    refreshToken: string | null,
    expiredIn: number | null,
    userId: string | null,
    ready: boolean
}

export const useAuth = (): IUserInfo => {
    let parseData = getParsedLocalStorage();
    const [accessToken, setAccessToken] = useState<string | null>(parseData ? parseData.accessToken : null);
    const [refreshToken, setRefreshToken] = useState<string | null>(parseData ? parseData.refreshToken : null);
    const [expiredIn, setExpiredIn] = useState<number | null>(parseData ? parseData.expiredIn : null);
    const [ready, setReady] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(parseData ? parseData.userId : null);

    const login = useCallback((accessToken: string | null, refreshToken: string | null, expiredIn: number | null, userId: string | null) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setExpiredIn(expiredIn)
        setUserId(userId);

        localStorage.setItem(storageName, JSON.stringify({
            userId,
            accessToken,
            refreshToken,
            expiredIn
        }))
    }, []);

    const logout = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        setExpiredIn(null)
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    return { login, logout, accessToken, refreshToken, expiredIn, userId, ready };
}