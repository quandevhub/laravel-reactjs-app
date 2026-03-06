export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password?: string;
    remember_token?: string;
    created_at: string | null;
    updated_at: string | null;
    role?: number;
}

export type IListUser = Record<number, string>;