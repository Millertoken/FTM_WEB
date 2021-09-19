import { isMultiApproved, setMultiApproval ,checkMultiApproved} from '@/constract/MultiApprove.js';
const { Contract, ethers } = require('ethers');
const abi = require('@/abi/MultiAdventure.json')
const contractAddress = '0x3e4A4b6Cb1034a22943D0eE6D4906C62d550A439';  //合约地址
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

export const isMultiApprove = async (ids) => {
    return await isMultiApproved(ids);
}

export const checkMultiApprove = async (ids) => {
    return await checkMultiApproved(ids);
}

export const setMultiApprove = async (ids) => {
    return await setMultiApproval(ids);
}

export const claimGold = (_ids) => {
    const daiWithSigner = contract.connect(signer);
    // console.log("claimGold ids = " + _ids);
    daiWithSigner.claimGold(_ids).then((result) => {
        console.log("claimGold result= "+result);
        // callback()
    }).catch((error) => {
        console.log("claimGold error= "+JSON.stringify(error));
    });
}
