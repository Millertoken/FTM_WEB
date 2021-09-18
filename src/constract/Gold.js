const { Contract, ethers } = require('ethers');
const abi = require('@/abi/Glod.json')
const contractAddress = '0x3d0EA7Bc12ECc7E17B65da50d6DC400D70cE6d24';  //合约地址
let signer 
let contract
if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);  //获取provider（获取小狐狸当前选择的网络）
    signer = provider.getSigner();  //provider签名（私钥做签名 私钥是小狐狸帮忙管理）
    contract = new Contract(contractAddress, abi, provider);  //生成合约
}

export const checkMultiClaim = async (ids) => {
    const daiWithSigner = contract.connect(signer);  
    return await daiWithSigner.checkMultiClaim(ids);
}

