import { LoginInfo } from "../login/LoginInfo";
import { WriteInfo } from "../write/WriteInfo";

export interface BlogCreateDto{
    name: String;
    login: LoginInfo;
    write: WriteInfo;
}