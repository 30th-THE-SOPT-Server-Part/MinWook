import { LoginInfo } from "../login/LoginInfo";
import { WriteInfo } from "../write/WriteInfo";

export interface BlogUpdateDto{
    name? : string;
    login? : LoginInfo;
    write? : WriteInfo;
}