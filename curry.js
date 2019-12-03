//커리
const _curry = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(...args, b);
//오른쪽 커리
const _curryr = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(b, ...args);

const __curry =  (...args) => args.length ;

const add = _curry((a, b) => a + b);
const sub = _curryr((a, b) => a - b);
console.log(__curry(1,2,1,2,3,4,3));

//더하기 10함수
const add10 = add(10);
console.log(add10(5));
console.log(add(5)(3));
console.log(add(5,3));
//빼기 10함수
const sub10 = sub(10);
console.log(sub10(5));
console.log(sub(5,3));

module.exports={
 _curry,
 _curryr
}
