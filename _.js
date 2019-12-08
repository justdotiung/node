const filter = (list, predi) => {
    const newList = [];
    each(list, (val) => {
        if(predi(val))
        newList.push(val) });
        
    return newList;
};

const map = (list,mapper) => {
    const newList = [];
    each(list, (val) => newList.push(mapper(val)));
    return newList;
}

//기존 filter와 map 에서 for문 중복 제거.
const each = (list, iter) => {
    for(let i = 0; i < list.length ; i++){
        iter(list[i])
    }
}

//arraylike 와같은것을 slice할수있게한다.
const slice = Array.prototype.slice;
const _rest = (list, num) => slice.call(list, num || 1); 


function reduce(list, iter,memo) {
    if(arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }
    each(list, val => memo = iter(memo, val));
    return memo;
}

function pipe(){
    const fns = arguments;
    return function(arg) {
        return reduce(fns, (arg,fn) => fn(arg), arg);
    }
}

function go(arg){
    const fns = _rest(arguments);
    return pipe.apply(null, fns)(arg);
}

const curry = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(...args, b);

const curryr = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(b, ...args);

const get = curryr((obj, key) => obj === null || obj === undefined ? undefined : obj[key]);
module.exports = {
    filter,
    map,
    each,
    reduce,
    pipe,
    go,
    curry,
    curryr,
    get
}