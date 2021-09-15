const { Contract, ethers } = require('ethers');
const abi = require('@/abi/Rarity.json')
const contractAddress = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb';  //合约地址
let signer 
let contract
if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);  //获取provider（获取小狐狸当前选择的网络）
    signer = provider.getSigner();  //provider签名（私钥做签名 私钥是小狐狸帮忙管理）
    contract = new Contract(contractAddress, abi, provider);  //生成合约
}

export const summon = (_summoner) => {
    const daiWithSigner = contract.connect(signer); 
    daiWithSigner.summon(_summoner);
}

export const summonerInfo = async(_summoner) => {
    const daiWithSigner = contract.connect(signer);
    return await daiWithSigner.summoner(_summoner);
    // return result;
}

export const isApprovedForAll = async (owner,operator) => {
    const daiWithSigner = contract.connect(signer);  
    return await daiWithSigner.isApprovedForAll(owner,operator);
}

export const setApprovalForAll = async (operator,approved) => {
    const daiWithSigner = contract.connect(signer);  
    return await daiWithSigner.setApprovalForAll(operator,approved);
}


