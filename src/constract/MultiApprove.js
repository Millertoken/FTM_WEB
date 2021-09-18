const { Contract, ethers } = require('ethers');
const abi = require('@/abi/MultiApprove.json')
const contractAddress = '0x83a4582935F601ce0f63C455045B9DC07e530A30';  //合约地址
let signer 
let contract
if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);  //获取provider（获取小狐狸当前选择的网络）
    signer = provider.getSigner();  //provider签名（私钥做签名 私钥是小狐狸帮忙管理）
    contract = new Contract(contractAddress, abi, provider);  //生成合约
}

export const isMultiApproved = async (ids) => {
    const daiWithSigner = contract.connect(signer);  
    return await daiWithSigner.isMultiApproved(ids);
}

export const checkMultiApproved = async (ids) => {
    const daiWithSigner = contract.connect(signer);  
    let result = await daiWithSigner.checkMultiApproved(ids);
    return result;
}

export const setMultiApproval = async (ids) => {
    const daiWithSigner = contract.connect(signer);  
    return await daiWithSigner.multiApprove(ids);
}

export const MultiApproveContractAddress =contractAddress

