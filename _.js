const curry = fn => (...args) => args.length == 2 ? fn(...args) : b => fn(...args, b);

const curryr = fn => (...args) => args.length == 2 ? fn(...args) : b => fn(b, ...args);
//null check 기능
const get = curryr((obj, key) => obj === null || obj === undefined ? undefined : obj[key]);

//arraylike 와같은것을 slice할수있게한다.
const slice = Array.prototype.slice;

const length = get('length');
//boolean 처리를 위한 !!연산자 사용
const _is_object = obj => typeof obj == 'object' && !!obj ;
//오류처리의 다형성 
const keys = obj => _is_object(obj) ? Object.keys(obj) : [];
//역으로 주는 함수
const negate = func => val => !func(val);
//null, undefined 처리 
const each = (list, iter) => {
    const _keys = keys(list);    
    
    for(let i = 0; i < _keys.length ; i++){ 
        iter(list[_keys[i]], _keys[i])
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
    each(list, (val, key) => newList.push(mapper(val, key)));
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

//curryr을 적용한 filter , map  함수
const rfilter = curryr(filter);
const rmap = curryr(map);

//keys와 마찬가지로 객체형태로 들어왔을경우 value값만 뽑아준다.
// const values = data => rmap(data, val => val);
const values = data => rmap(data, identity);//함수 선언식
// const _values = rmap(identity) ;// 함수 표현식 으로서 호이스팅 불가능
const identity = val => val;

// const pluck = (data, key) => map(data, obj => obj[key]);
const pluck = (data, key) => map(data, get(key));

// const reject = (data, predi) => rfilter(data, val => !predi(val));
const reject = (data, predi) => rfilter(data, negate(predi));

const compact = rfilter(identity);
//못찾으면 undefined 를 반환
const find = curryr((list, predi) => {
    const _keys = keys(list);
    for(let i = 0 , len = _keys.length; i< len ; i++){
        const val = list[_keys[i]];
        if(predi(val)) return val;
    }
});

const find_index = curryr((list, predi) => {
    const _keys = keys(list);
    for (let i = 0; i < _keys.length; i++) {
        const val = list[_keys[i]];
        if(predi(val)) return i;
    }
    return -1;
});

const some = (data, predi) => find_index(data, predi || identity) != -1;
 
const every = (data, predi) => find_index(data, negate(predi || identity)) == -1;

const min = data => reduce(data, (a, b) => a < b ? a : b);

const max = data => reduce(data, (a, b) => a > b ? a : b);

const min_by = curryr((data, iter) => reduce(data, (a, b) => iter(a) < iter(b) ? a : b));

const max_by = curryr((data, iter) => reduce(data, (a, b) => iter(a) > iter(b) ? a : b));

const push = (obj, key, val) => { (obj[key] =obj[key] || [] ).push(val);  return obj; } ;

const group_by = curryr((data, iter) => reduce(data, (grouped, val) => push(grouped, iter(val), val), {}));

const inc = (count, key) => { count[key] ? count[key]++ : count[key] = 1; return count }

// const count_by =  curryr((data, iter) => reduce(data, (count, val) => {
    //     const key = iter(val); 
    //     count[key] ? count[key]++ : count[key] =1; 
    //     return count;}, {}));
    
const count_by = curryr((data, iter) => reduce(data, (count, val) => inc(count, iter(val)), {}));

const pairs = rmap((val, key) => [key, val]);

module.exports = { 
    each, reduce, pipe, go, curry, curryr, get, rfilter, rmap,
    values, keys, identity, pluck, reject, compact, find, find_index,
    some, every, min, max, min_by, max_by, group_by, count_by , pairs
}