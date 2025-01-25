import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivcation, IRegister, ILogin } from "@/types/Auth";

const authServices = {
    register: (payload: IRegister) =>
        instance.post(`${endpoint.AUTH}/register`, payload),
    activation: (payload: IActivcation) =>
        instance.post(`${endpoint.AUTH}/activation`, payload),
    login: (payload: ILogin) =>
        instance.post(`${endpoint.AUTH}/login`, payload),
    getProfileWithToken: (token: string) =>
        instance.get(`${endpoint.AUTH}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
};

export default authServices;