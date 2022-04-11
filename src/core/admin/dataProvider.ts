import type { DataProvider } from 'react-admin';
import { fetchUtils } from 'react-admin';

// @ts-ignore
export const dataProvider: DataProvider = {
    getList: async () => ({ data: [], total: 0 }),
    getOne: async (resource, { id }) => {
        const url = `http://localhosot:8081/${resource}/${id}`;
        return fetchUtils.fetchJson(url).then();
    },
};
