import apiClient from "../constants/api";
import type { RegisterData } from "../entities/auth";
import type { LoginData } from "../entities/auth";
import type { ForgotPasswordData } from "../entities/auth";
import type { ResetPasswordData } from "../entities/auth";
import { AUTH } from "../constants/api-endpoint";

export const AuthSevice = {
    register(data:RegisterData) {
        return apiClient.post(AUTH.REGISTER,data);
    },
    login(data:LoginData) {
        return apiClient.post(AUTH.LOGIN,data);
    },
    fortgotPassword(data:ForgotPasswordData) {
        return apiClient.post(AUTH.FORGOT_PASSWORD,data);
    },
    resetPassword(data:ResetPasswordData) {
        return apiClient.post(AUTH.RESET_PASSWORD,data);
    },
    logout() {
        return apiClient.post(AUTH.LOGOUT);
    }
}


export const CurrentUserLogin = () => {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
}

export const isAdmin = () => {
    const user = CurrentUserLogin();
    return user && user.role === 1;
}