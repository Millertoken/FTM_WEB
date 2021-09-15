
export const getEllipsisString = (str) => {
    var last = 0;
    var all = str.length;
    var fisrt = str.substring(0, 6);
    if (str.lastIndexOf('（') == -1) {
        // 也没有英文括号(
        if (str.lastIndexOf('(') == -1) {
            last = all - 5;
        }else{
            // 有英文括号(，就从英文括号开始截取
            last = str.lastIndexOf('(');
        }
    }else{
        last = str.lastIndexOf('（');
    }
    let result
    // 如果长度大于13个字符才显示省略号
    if (all > 13) {
        result = fisrt + " ... " + str.substring(last, all)
    }else{
        result = str 
    }
    return result 
}