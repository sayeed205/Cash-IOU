import axios from "axios";

export const AuthService = {
    login: async (phone: string, password: string) => {
        const response = await axios.post("api/auth/login", {
            phone,
            password,
        });
        return response.data;
    },
};
