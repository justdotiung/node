const _ = require('./_.js');

var users =[
    {id: 10, name: 'ID', age: 19},
    {id: 20, name: 'BJ', age: 29},
    {id: 30, name: 'PJ', age: 39},
    {id: 40, name: 'GJ', age: 49},
    {id: 50, name: 'KJ', age: 59},
    {id: 60, name: 'AJ', age: 69},
    {id: 70, name: 'QJ', age: 79},
    {id: 80, name: 'WJ', age: 89},
    {id: 90, name: 'EJ', age: 99}
];

console.log(_.rmap(users, user => user.name));

console.log(users[0]);
console.log(_.keys(users[0]));
console.log(_.values(users[0]));

const _values =  _.rmap(_.identity);
// console.log(_._values(users[0]));
console.log(_.rmap(_.identity)(users[0]));
console.log(_.rmap(_.identity)(users[0]));
console.log(_.pluck(users,'age'));
console.log(_.pluck(users,'name'));

console.log(_.rfilter(users, user => user.age>30));
console.log(_.reject(users, user => user.age>30));

console.log(_.compact([1,2,0,false,null,{},[],undefined]));

console.log(_.find(users, user => user.name == "AJ"));