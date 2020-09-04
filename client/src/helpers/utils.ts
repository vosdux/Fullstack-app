import { storageName } from './constants';
export const getParsedLocalStorage = () => {
    const data = localStorage.getItem(storageName);
    if (data) {
        return JSON.parse(data);
    }
};