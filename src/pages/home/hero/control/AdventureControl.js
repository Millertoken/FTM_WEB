import { adventureTime, getAllSummoner, level_up, isMultiApprove, setMultiApprove, claimGold,checkMultiApprove } from '@/constract/Adventure';
import { isApprovedForAll, setApprovalForAll } from '@/constract/Rarity.js';
import BigNumber from 'bignumber.js'
import { toEth } from '@/utils/util';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {checkMultiClaim} from '@/constract/Gold';
import { Modal } from 'antd';
const { confirm } = Modal;

function AdventureControl() {

}

function showConfirm(content,callback) {
    confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: (
            <div>
                <p>当前可操作的NFT:</p>
                <p>{content}</p>
            </div>
        ),
        onOk() {
            // console.log('OK');
            callback()
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
}

AdventureControl.prototype.adventure = function(list){
    let _ids = this.getCanAdventureIds(list);
    showConfirm(_ids.toString(),()=>{
        adventureTime(_ids)
    })
}

AdventureControl.prototype.isMultiApproved = async (ids) => {
    return await isMultiApprove(ids)
}

AdventureControl.prototype.checkMultiApproved = async (ids) => {
    return await checkMultiApprove(ids)
}


AdventureControl.prototype.setMultiApproval = async (ids) => {
    showConfirm(ids.toString(),()=>{
        setMultiApprove(ids)
    })
}

AdventureControl.prototype.isApprovedForAll = async (account) => {
    return await isApprovedForAll(account)
}
AdventureControl.prototype.setApprovalForAll = async (approved) => {
    return await setApprovalForAll(approved)
}
AdventureControl.prototype.checkMultiClaim = async (ids) => {
    return await checkMultiClaim(ids)
}



AdventureControl.prototype.getAll = async (originList) => {
    let ids = []
    try {
        originList.map(item => {
            ids.push(item.tokenID)
        })
    } catch (e) {
        console.log("error, getAll originList =" + originList)
    }
    let result = await getAllSummoner(ids)
    return result;
    // console.log("getAll result ="+result)
}

AdventureControl.prototype.LevelUp = function(list){
    let _ids = this.getCanLevelUpIds(list)
    showConfirm(_ids.toString(),()=>{
        level_up(_ids)
    })
}

AdventureControl.prototype.getGlod = async (ids) => {
    showConfirm(ids.toString(),()=>{
        claimGold(ids)
    })
}

AdventureControl.prototype.getCanAdventureIds= (list) => {
    let _ids = []
    list.map(item => {
        let time = item.info[1]
        let exp = toEth(item.info[0].toString())
        let exp_request = toEth(item.info[4].toString())
        var currentTime = new Date().getTime()
        if (currentTime > time * 1000 && (BigNumber(exp_request).comparedTo(exp))) {
            _ids.push(item.id)
        } else {
            // console.log("adventure time = " + time++, ",exp_request = " + exp_request + " , exp=" + exp)
        }
    })
    return _ids;
}

AdventureControl.prototype.getCanLevelUpIds = (list) => {
    let _ids = []
    list.map(item => {
        let exp = item.info[0]
        let exp_request = item.info[4]
        if (exp_request.toString() == exp.toString()) {
            _ids.push(item.id)
        }
    })
    return _ids
}


// export.default = AdventureControl
export default AdventureControl


