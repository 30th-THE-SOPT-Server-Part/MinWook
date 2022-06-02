import express, {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";

export default (req: Request, res: Response, next: NextFunction) => {
    //request-header 에서 토큰 받아오기!
    const token = req.headers["authorization"]?.split(' ').reverse()[0];// Bearer token 파싱해서 토큰만 가져오기

    if(!token){//token 이 없다면
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
    }

    try{
        const decoded = jwt.verify(token, config.jwtSecret);//verify

        req.body.user = (decoded as any).user;

        next();//next -> middleware 실행 끝나면 다음으로 넘어가게
    } catch (error){
        console.log(error);
        if (error === 'TokenExpireError') {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
        }
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}