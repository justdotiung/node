// 순수함수 - 동일한 인자에 동일한 값을 주며 부수효과가 없는 함수
function add(a, b){
    return a + b;
}
console.log(add(10,5));
console.log(add(10,5));
console.log(add(10,5));

// 부수효과가 있는 함수 1 외부에서 영향을 받을때
let c = 10;
function add2(a, b){
    return a + b + c;
}
console.log(add2(11,5));
c = 20;
console.log(add2(11,5));

// 부수효과가 있는 함수 2 외부에 영향을 미칠때
function add3(a, b){
    c = b;
    return a + b ;
}
console.log('c:', c);
console.log(add3(11,5));
console.log('c:', c);
console.log(add3(11,5));

//부수효과가 있는 함수 3 객체 정의
const obj ={ val : 2};
function add4(obj, b){
    return obj.val += b;
}
console.log(obj.val); //val 2
add4(obj, 10);
console.log(obj.val); //val 12

//순수함수의 객체 정의 
const obj1 = {val : 2};
function add5(obj, b){
   return { val : obj.val + b};
}
console.log(obj1.val); //val 2
const obj2 = add5(obj1, 10);
console.log(obj1.val); //val 2
console.log(obj2.val);

// 일급함수
const f1 = (a) => a * a;
const f2 = add;
console.log(f2);
console.log(f1);
//함수를 받아서 함수내부에서 평가를 해서 결과를 반환시킨다.
const f3 = (f) => f();
console.log(f3( () => 10));
console.log(f3( () => 20));

// 기본예제 add_maker
//a는 참조만 하기때문에 순수함수의 구조다.
const addMaker = (a) => (b) => a+b ;

const add6 = addMaker(6);

console.log( add6(10));
 
const f4 =(f1,f2,f3) => f3( f1() + f2() ) ;

console.log( 
    f4( () => 1, () => 2, (a) => a*a )
);

