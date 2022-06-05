// const days = ['월요일', '화요일', '수요일', '목요일', '금요일'];
// console.log(days.map( x => `👎${x}`) )

import { resolve } from "path";

// function foo(bar: object){
//     console.log(bar);
// }
// foo([1,2,3]);
// foo({a:1, b:2});
// // foo(123); error

// function boo(bar: Object){
//     console.log(bar);
// }
// boo(123);

// const foo2 = (a: number, b: number):number => {
//     return a + b;
// }

// let myName: string = 'kim min wook';
// let myNameLength: number = (<string>myName).length;

// interface School{
//     name: string;
//     age: number;
//     organization: string;
//     class: string[];
// }

// const school: School[] = [
//     {
//         name: '김민욱',
//         age: 26,
//         organization: '상명대학교',
//         class: ['컴과', '좋아할과']
//     },
//     {
//         name: '최병호',
//         age: 26,
//         organization: '고려대학교',
//         class: ['전전과', '사랑할과']
//     },
//     {
//         name: '김범영',
//         age: 26,
//         organization: '카이스트',
//         class: ['산공과', '오늘뭐할과']
//     }
// ]


// function test() {
//     console.log('start');
    
//     return 'start';
// }

// function time() {
//     return setTimeout( ():String => {
//         console.log('end');
        
//         return 'end';
//     }, 3000);
// }

// test();
// time();



// console.log('---------------');

// console.log('hello server');

// setTimeout(()=>{
//     console.log('hello server2');
    
// }, 2000);

// console.log('hello server3');

// console.log('---------------');

// const promise = new Promise((resolve, reject) => {
//     if(false){
//         resolve('성공');
//     }else{
//         reject(new Error('error 발생'));
//     }
// });

// promise
//     .then((resolveData): void =>console.log(resolveData))
//     .catch(err => console.log(err));


// const restaurant = (callback: () => void, time: number) =>{
//     setTimeout(callback, time);
// }

// const order = (): Promise<string> =>{
//     return new Promise((resolve, reject) =>{
//         restaurant(() =>{
//             console.log('레스토랑 진행 상황 - 음식주문');
//             resolve('음식 주문 시작');
            
//         }, 1000);
//     });
// }

// const asyncFunc = (msg: string): Promise<string> =>{
//     return new Promise(resolve =>{
//         setTimeout(()=>{
//             resolve('성공');
//         }, 1000);
//     });
// };


// const asyncMain = async(): Promise<void> => {
//     let result = await asyncFunc('hi');
//     console.log(result);
// }


const http = require('http');


