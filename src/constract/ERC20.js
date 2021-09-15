const { Contract, ethers } = require('ethers');
const abi  =  require('../pages/home/abi/IERC20.json')

const contractAddress = '0x8179D97Eb6488860d816e3EcAFE694a4153F216c';  //合约地址
const provider = new ethers.providers.Web3Provider(window.ethereum);  //获取provider（获取小狐狸当前选择的网络）
const signer = provider.getSigner();  //provider签名（私钥做签名 私钥是小狐狸帮忙管理）
const contract = new Contract(contractAddress, abi, provider);  //生成合约


export const transfer = (toValue,Value) => {
    const daiWithSigner = contract.connect(signer);  //已经签名好的合约（绑定签名）
    // var deci = contract.decimals()
    // console.log("deci ==" + JSON.stringify(deci) +" , toValue =" + toValue + " ,Value "+ Value)
    daiWithSigner.transfer(toValue, Value);  //调用transfer传参
    //0x6998692021b6D8e0877F94d7963e45b2923DAf72
    //1000000000000000000
}

export const balanceOf =(account)=>{
    const daiWithSigner = contract.connect(signer);  
    var balance = daiWithSigner.balanceOf(account)
    return balance
}

