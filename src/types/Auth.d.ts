import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface ILogin {
    identifier: string;
    password: string;
};

interface IActivcation {
    code: string;
};

interface UserExtended extends User {
    accessToken?: string;
    role?: string;
};

interface SessionExtended extends Session {
    accessToken?: string;
};

interface JWTExtended extends JWT {
    user?: UserExtended;
};

export type { 
    ILogin, 
    IRegister, 
    IActivcation, 
    UserExtended, 
    SessionExtended, 
    JWTExtended,
};