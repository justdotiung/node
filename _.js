const curry = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(...args, b);

const curryr = (fn) => (...args) => args.length == 2 ? fn(...args) : (b) => fn(b, ...args);
//null check 기능
const get = curryr((obj, key) => obj === null || obj === undefined ? undefined : obj[key]);

//arraylike 와같은것을 slice할수있게한다.
const slice = Array.prototype.slice;

const length = get('length');
//boolean 처리를 위한 !!연산자 사용
const _is_object = obj => typeof obj == 'object' && !!obj ;
//오류처리의 다형성 
const _keys = obj => _is_object(obj) ? Object.keys(obj) : [];
//null, undefined 처리 
const each = (list, iter) => {
    const keys = _keys(list);
    
    for(let i = 0; i < keys.length ; i++){ 
        iter(list[keys[i]])
    }
    return list;
}

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