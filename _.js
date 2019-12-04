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

module.exports = {
    filter,
    map,
    each,
    reduce
}