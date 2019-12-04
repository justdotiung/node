//커리
const curry = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(...args, b);
//오른쪽 커리
const curryr = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(b, ...args);

// const add = curry((a, b) => a + b);
// const sub = curryr((a, b) => a - b);

// //더하기 10함수
// const add10 = add(10);
// console.log(add10(5));
// console.log(add(5)(3));
// console.log(add(5,3));
// //빼기 10함수
// const sub10 = sub(10);
// console.log(sub10(5));
// console.log(sub(5,3));

const get = curryr((obj, key) => obj === null || obj === undefined ? undefined : obj[key]);
module.exports={
 curry,
 curryr,
 get
}
