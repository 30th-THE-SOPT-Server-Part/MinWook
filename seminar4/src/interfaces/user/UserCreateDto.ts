import { SchoolInfo } from "../school/SchoolInfo";

export interface UserCreateDto{
    name: string;
    phone: string;
    email: string;
    age?: number;
    school?: SchoolInfo;
} //request로 받을 dto를 만듦