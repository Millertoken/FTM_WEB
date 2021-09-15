const BigNumber = require('bignumber.js');
/**
 * 放大到最小单位
 * @param {*} n 
 * @param {*} decimals 
 */
function toWei(n, decimals = 18) {
    let bn = new BigNumber(n);
    let s = new BigNumber(10).pow(decimals);
    bn = bn.times(s);
    return bn;
}

function toEth(n, decimals = 18) {
    let bn = new BigNumber(n);
    let s = new BigNumber(10).pow(decimals);
    bn = bn.div(s);
    return bn;
}

module.exports = {
    toWei,
    toEth,
    MAX: "100000000000000000000000000000000000000000000000000"
}