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

const _get = __._curryr((obj, key) => obj === undefined || obj === null ? undefined : obj[key]);

const getName = _get('name');
//조건으로인해 좀더 유연한 값을 갖게 만든다. 
//console.log(_get(users[11],'id'));
console.log(getName(users[1]));
console.log( _map(_filter(users, (users) => users.age > 30),(user) => user.name));
console.log( _map(_filter(users, (users) => users.age > 30),_get('name')));
console.log( _map(_filter(users, (users) => users.age > 30),_get('age')));