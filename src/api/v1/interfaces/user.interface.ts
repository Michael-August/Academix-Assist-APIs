export interface IUser {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    plan: 'free' | 'premium'
}