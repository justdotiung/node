const _ = require('./_.js');

var users =[
    {id: 10, name: 'ID', age: 19},
    {id: 20, name: 'BJ', age: 29},
    {id: 30, name: 'PJ', age: 39},
    {id: 40, name: 'GJ', age: 49},
    {id: 50, name: 'KJ', age: 59},
    {id: 60, name: 'AJ', age: 59},
    {id: 70, name: 'QJ', age: 44},
    {id: 80, name: 'WJ', age: 32},
    {id: 90, name: 'EJ', age: 37}
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

console.log(_.find(users, user => user.id == 90));
console.log(_.find_index(users, user => user.name == "AJ" ));

_.go(users,
    _.find(user => user.id ==90),
    _.get('name'),
    console.log);
    
console.log(_.some([1,2,3,4]));
console.log(_.some([null,undefined, 0]));
console.log(_.some([null,undefined, 1]));
console.log(_.every([1,2,3,4]));
console.log(_.every([null,undefined, 0]));
console.log(_.every([null,undefined, 1]));

console.clear();

console.log(_.rfilter(users, user => user.age >20));
console.log(_.min([1,2,3,4,-1]));
console.log(_.max([1,2,3,4,-1]));

console.clear();

console.log(_.min_by([1,2,3,4,-1], Math.abs));
console.log(_.max_by([11,2,3,4,-11], Math.abs));
console.log(_.max_by(users, user=>user.name));

_.go(users,
    _.rfilter(user => user.age > 30),
    _.min_by(user => user.name),
    console.log);
    
    console.log(_.reject(users, user => user.age>30));
    
    console.log(_.rmap(users, user => user.name == 'ID'));
    _.go(users, _.group_by(user => user.age - user.age % 10),
    console.log);
    
    _.go(users, _.group_by(user => user.name[1]),
    console.log)
    
    _.go(users, _.group_by(_.get('age')),
    console.log)
    
    console.log(_.count_by(users, user => user.age - user.age % 10));
    
    _.rmap(users[0], console.log)

    console.log(_.pairs(users[0]))

    _.go(users,
        _.count_by( user => user.age - user.age % 10),
        _.rmap((count,key) => key+'대는'+count+'명입니다.'),
        console.log);