import apiClient from "../constants/api";
import { USER } from "../constants/api-endpoint";

export const UserService = {
    listUser(page:number, keyword: string) {
        return apiClient.get(USER.LIST + `?page=${page}&search=${keyword}`);
    },
    store(data: { name: string, email: string, password: string, role: number }) {
        return apiClient.post(USER.CREATE, data);
    },
    show(id:number) {
        return apiClient.get(USER.SHOW + id);
    },
    delete(id:number) {
        return apiClient.delete(USER.DELETE + id);
    },
    update(id:number, data:{ name: string, email: string, password: string, role: number }) {
        return apiClient.put(USER.UPDATE + id, data);
    },
    list() {
        return apiClient.get('list-user');
    },
}