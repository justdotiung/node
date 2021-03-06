const users =  [
    {id: 1, name: 'id', age: 19},
    {id: 2, name: '1id', age: 29},
    {id: 3, name: '2id', age: 39},
    {id: 4, name: '3id', age: 49},
    {id: 5, name: '4id', age: 59},
    {id: 6, name: '5id', age: 69}
];

/* 명령형 코드*/ 

//1. 30세 이상인 users를 거른다.
const tempUsers =[];
for(let i = 0; i < users.length ; i++){
    if(users[i].age >= 30)
        tempUsers.push(users[i]);
}
console.log(tempUsers);

//2. 30세 이상인 users의 name 수집
const name = [];
for(let i = 0; i < tempUsers.length ; i++){
    name.push(tempUsers[i].name);
}
console.log(name);

//3. 30세 미만인 users를 거른다.
const tempUsers2 = [];
for(let i = 0; i < users.length ; i++){
    if(users[i].age < 30)
    tempUsers2.push(users[i]);
}
console.log(tempUsers2);

//4. 30세 미만인 users의 age 수집.
const age = [];
for(let i = 0; i < tempUsers2.length ; i++){
    age.push(tempUsers2[i].age);
}
console.log(age);

/*함수형으로 리팩토링하기*/
// 중복의 함수를  filter , map으로 리팩토링하기
const _filter = (list, predi) => {
    const newList = [];
    for(let i = 0; i < list.length ; i++){
        if(predi(list[i]))
        newList.push(list[i]);
    }
    return newList;
};
const newArr = _filter(users, (users) => users.age > 30);

console.log("함수형 리팩토링", _filter(users, (users) => users.age > 30));
console.log("함수형 리팩토링", newArr);
console.log("함수형 리팩토링", _filter(users, (users) => users.age <= 30));
//이런식으로 확장성이 커진다
// console.log("함수형 리팩토링", _filter([1,2,3,4,5], (list) => list > 1));
const _map = (list,mapper) => {
    const newList = [];
    for(let i = 0; i < list.length ; i++){
        newList.push(mapper(list[i]));
    }
    return newList;
}

console.log(_map(newArr,(array)  =>array.name));
// 확장성이 커진 _map
//console.log(_map([1,2,3,4],(array)=>array*2));

//함수형으로 _map() 과 _filter() 를 사용하기
console.log( _map(_filter(users, (users) => users.age > 30),(user) => user.name));

const _ = require('./_.js');
const __ = require('./curry.js');

console.log("함수형 _.js리팩토링", _.filter(users, (users) => users.age > 30));
console.log("함수형 _.js리팩토링" ,_.map(_.filter(users, (users) => users.age > 30),(user) => user.name));

console.log("array" ,_.map([1,2,3,4] ,(arr) => arr % 2 ));
console.log("array" ,_.filter([1,2,3,4] ,(arr) => arr % 2 ));

//_get() 만들기
//const _get = (obj, key) => obj === undefined || obj === null ? undefined : obj[key];

const _get = __.curryr((obj, key) => obj === undefined || obj === null ? undefined : obj[key]);

const getName = _get('name');
//조건으로인해 좀더 유연한 값을 갖게 만든다. 
//console.log(_get(users[1],'id'));
console.log(getName(users[1]));
console.log( _map(_filter(users, (users) => users.age > 30),(user) => user.name));
console.log( _map(_filter(users, (users) => users.age > 30),_get('name')));
console.log( _map(_filter(users, (users) => users.age > 30),_get('age')));

console.clear();
//_reduce 반복적으로 돌면서 
const add = (a, b) => a + b; 
const slice = Array.prototype.slice;
const _rest = (list, num) => slice.call(list, num || 1); 
const _reduce = (list, iter, memo) => { _.each(list, val => memo = iter(memo, val)); return memo };

console.log(_reduce([1,2,3],add,0));//6
console.log(_reduce([1,2,3],add,10));//16

//arraylike 에서 적용이된다
const a = {0: 1, 1: 2, 2: 3, length: 3 };
// Array.prototype.slice 의 this가 a 를 가르키게 된다

console.log(_rest(a,1));
console.log(Array.prototype.slice.call(a,1));
// console.log(a.slice(1)); 배열이 아니기때문에 오류가 나온다.


function reduce(list, iter,memo) {
    if(arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }
    _.each(list, (val) => memo = iter(memo, val));
    return memo;
}
console.log(_.reduce([1,2,3],add,10));//6을 도출하게 만들어야한다.

//파이프라인 만들기
const f1 = _.pipe(
    a => a + 1,
    a => a * 2,
    a => a + 2,
    a => a * a
);

console.log(f1(1));

_.go(1,
    a => a + 1,
    a => a * 2,
    a => a * a,
    console.log
);

console.log( _map(_filter(users, (users) => users.age > 30),_get('name')));
console.log( _map(_filter(users, (users) => users.age > 30),_get('age')));

//user에  go적용하기
_.go(users,
    users => _.filter(users, users => users.age >30),
    users=> _.map(users,__.get('name')),
    console.log);

//curryr을 적용한 filter , map  함수
const __filter = __.curryr(_.filter);
const __map = __.curryr(_.map);


//curryr을 적용한 filter , map 의 go 함수를적용
_.go(users,
    __filter(users => users.age > 30),
    __map(__.get('name')),
    console.log);

console.clear();
// key만 보여주는 함수
console.log(Object.keys(users));
console.log(Object.keys([1,2,3,4]));
//null 을 넣어도  에러가 나지않게
_.each(null, console.log);
console.log(_.map(null, n => n * 2));
//console.log(Object.keys(null)); 에러가 난다.

_.each({
    13: 'id',
    28: 'hd',
    11: 'yd'
}, name => console.log(name));

_.go({
    13: users[0],
    28: users[2],
    11: users[4]
}, __map(user => user.name.toLowerCase()),
console.log);

_.go(users,
    __map( user => user.name),
    __map( name => name.toLowerCase()),
console.log);