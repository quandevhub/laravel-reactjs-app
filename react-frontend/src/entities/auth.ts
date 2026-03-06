export interface RegisterData {
    name: string,
    email: string,
    password: string,
}

export interface LoginData {
    email: string,
    password: string,
}

export interface ForgotPasswordData {
    email: string,
}

export interface ResetPasswordData {
    token: string|null,
    email: string|null,
    password: string,
    password_confirmation: string,
}