import { isApprovedForAll,setApprovalForAll } from '@/constract/Rarity.js';
const { Contract, ethers } = require('ethers');
const abi = require('@/abi/Adventure.json')
const contractAddress = '0xEf73F99d54dB6207E532e7262A7186e3d79b3539';  //合约地址
let signer
let contract
if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);  //获取provider（获取小狐狸当前选择的网络）
    signer = provider.getSigner();  //provider签名（私钥做签名 私钥是小狐狸帮忙管理）
    contract = new Contract(contractAddress, abi, provider);  //生成合约
}

export const adventureTime = (_ids) => {
    // _ids=[746829,746720]
    const daiWithSigner = contract.connect(signer);
    daiWithSigner.adventureTime(_ids);
}

export const getAllSummoner = async (_ids) => {
    const daiWithSigner = contract.connect(signer);
    return await daiWithSigner.getAllSummoner(_ids);
}

export const level_up = (_ids) => {
    const daiWithSigner = contract.connect(signer);
    daiWithSigner.level_up(_ids);
}

export const isApprovedAll = async (owner) => {
    return await isApprovedForAll(owner, contractAddress);
}

export const setApproval = async (approve) => {
    return await setApprovalForAll(contractAddress, approve);
}
