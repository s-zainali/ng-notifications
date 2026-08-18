import { api } from "./api";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials{
    fullName: string;
}

export interface AuthResponse {
    auth_token: string;
    user: {
        id: string;
        fullname: string;
        username: string;
    }
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse>{
        const response = await api.post('/users/login', credentials);
        return response.data;
    },

    async register(credentials: RegisterCredentials): Promise<{message: string}> {
        const response = await api.post('/users/register', credentials);
        return response.data;
    },

    logout(): void {
        localStorage.removeItem('token')
    }
}