import { adventureTime, getAllSummoner, level_up ,isMultiApprove,setMultiApprove,claimGold} from '@/constract/Adventure';
import {isApprovedForAll  , setApprovalForAll} from '@/constract/Rarity.js';
import BigNumber from 'bignumber.js' 
import {toEth} from '@/utils/util';
function AdventureControl() {

}

AdventureControl.prototype.adventure = (list) => {
    ///超过MAX_SIZE的不处理
    let _ids = []
    console.log(list.length + " heros, is do adventure")
    list.map(item => {
        let time = item.info[1]
        let exp = toEth(item.info[0].toString())
        let exp_request = toEth(item.info[4].toString())
        var currentTime = new Date().getTime()
        if (currentTime > time*1000 && (BigNumber(exp_request).comparedTo(exp))) {
            _ids.push(item.id)
        }else{
            console.log( "adventure time = " + time ++, ",exp_request = " + exp_request +" , exp="+exp)
        }
    })
    // var b = _ids.splice(2); 
    console.log(_ids.length + " heros, is can adventure")
    adventureTime(_ids)
}

AdventureControl.prototype.isMultiApproved = async (ids) => {
    return await isMultiApprove(ids)
}

AdventureControl.prototype.setMultiApproval = async (ids) => {
    return await setMultiApprove(ids)
}

AdventureControl.prototype.isApprovedForAll = async (account) => {
    return await isApprovedForAll(account)
}
AdventureControl.prototype.setApprovalForAll = async (approved) => {
    return await setApprovalForAll(approved)
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

AdventureControl.prototype.LevelUp = (list) => {
    ///超过MAX_SIZE的不处理
    // if (list.length > MAX_SIZE) {

    // }
    let _ids = []
    list.map(item => {
        let exp = item.info[0]
        let exp_request = item.info[4]
        if (exp_request == exp) {
            // console.log(item.id +" , is can adventure")
            _ids.push(item.id)
        }
    })
    console.log(_ids.length + " heros, is can levup")
    level_up(_ids)
}

AdventureControl.prototype.getGlod = async (list,callback) => {
    let ids = []
    try {
        list.map(item => {
            ids.push(item.id)
        })
    } catch (e) {
        console.log("error, getGlod list =" + list)
    } 
    // var b = ids.splice(ids.length-2);
    let result = await claimGold(ids,callback)
    return result;
}

// export.default = AdventureControl
export default AdventureControl


