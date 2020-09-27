import { ISignValue } from './../modules/SignIn';
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { getParsedLocalStorage } from '../helpers/utils';
import { errorModal } from '../helpers/Modal';

export interface IFetchData {
    loading: boolean,
    request: (cfg: AxiosRequestConfig) => Promise<any>,
    authRequest: (mode: string, data: any) => Promise<any>
};

const getToken = () => {
    let data = getParsedLocalStorage();
    console.log(data.accessToken)
    return data.accessToken;
}

const getUrl = (url: string): string => {
    const { REACT_APP_URL: mainUrl } = process.env;
    return `${mainUrl}/${url}`;
}

export const useHttp = (): IFetchData => {
    const [loading, setLoading] = useState<boolean>(false);

    const authRequest = useCallback(async (mode: string, data: ISignValue) => {
        setLoading(true);
        try {
            let response = await axios({
                url: getUrl(mode === 'register' ? 'api/auth/register' : 'api/auth/login'),
                data,
                method: 'post'
            });
            if (response.status === 200) {
                const { data } = response;
                if (data) {
                    return data;
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);

    const request = useCallback(async ({ data, method = 'get', url, params }: AxiosRequestConfig) => {
        setLoading(true);
        try {
            console.log(url)
            const fetchData = await axios({
                url: url && getUrl(url),
                method,
                params,
                data,
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setLoading(false)
            return fetchData
        } catch (error) {
            setLoading(false);
            console.log(error);
            throw error
        }
    }, []);

    return { loading, request, authRequest };
}