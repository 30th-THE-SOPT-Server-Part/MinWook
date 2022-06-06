import { LoginInfo } from "../login/LoginInfo";
import { WriteInfo } from "../write/WriteInfo";

export interface BlogInfo {
    name: String;
    login: LoginInfo;
    write: WriteInfo;
}