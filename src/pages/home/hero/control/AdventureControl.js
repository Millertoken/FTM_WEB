import { adventureTime, getAllSummoner, level_up ,isApprovedAll,setApproval} from '@/constract/Adventure';
import { toEth } from '@/utils/util';

let MAX_SIZE = 30

function AdventureControl() {

}

AdventureControl.prototype.adventure = (list) => {
    ///超过MAX_SIZE的不处理
    let _ids = []
    console.log(list.length + " heros, is do adventure")
    list.map(item => {
        let time = item.info[1]
        let exp = item.info[0]
        var currentTime = new Date().getTime()
        let expresult = (toEth(exp.toString())).toString();
        console.log(item.id + " , expresult = " + expresult + " , currentTime =" + currentTime + " , time =" + time)
        if (currentTime > time * 1000 && (1000 > expresult)) {
            // console.log(item.id + " , is can adventure")
            _ids.push(item.id)
        }
    })
    // var b = _ids.splice(2); 
    console.log(_ids.length + " heros, is can adventure")
    adventureTime(_ids)
}

AdventureControl.prototype.checkApprovedAll = async (owner) => {
    return await isApprovedAll(owner)
}

AdventureControl.prototype.setApproval = async (approve) => {
    return await setApproval(approve)
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
        if (1000 == (toEth(exp.toString())).toString()) {
            // console.log(item.id +" , is can adventure")
            _ids.push(item.id)
        }
    })
    console.log(_ids.length + " heros, is can levup")
    level_up(_ids)
}

// export.default = AdventureControl
export default AdventureControl


