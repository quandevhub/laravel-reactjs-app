import apiClient from "../constants/api";
import { TASK } from "../constants/api-endpoint";
import type { RegisterData } from "../entities/task";

export const TaskSevice = {
    store(data:RegisterData) {
        return apiClient.post(TASK.CREATE,data);
    },
    update(id:number, data:RegisterData) {
        return apiClient.put("tasks/" + id, data);
    },
    list(page:number, keyword: string, userId?: number) {
        let url = `${TASK.LIST}?page=${page}&search=${keyword}`;
        if (userId !== undefined && userId !== null) {
            url += `&user_id=${userId}`;
        }
        return apiClient.get(url);
    },
    show(id:number) {
        return apiClient.get("tasks/" + id);
    },
    delete(id:number) {
        return apiClient.delete("tasks/" + id);
    },
}