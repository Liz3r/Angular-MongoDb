module.exports = function isNumber(str){

    const numExp = /[0-9]+/;
    const isMatch = str.match(numExp);
    if(typeof(str) === 'string' && isMatch && isMatch[0] === str)
        return true;
    return false;
}