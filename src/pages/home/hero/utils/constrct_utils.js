
export const getClassesName = (bean, level) => {
    if (level == 1) {
        return "Barbarian";
    } else if (level == 2) {
        return "Bard";
    } else if (level == 3) {
        return "Cleric";
    } else if (level == 4) {
        return "Druid";
    } else if (level == 5) {
        return "Fighter";
    } else if (level == 6) {
        return "Monk";
    } else if (level == 7) {
        return "Paladin";
    } else if (level == 8) {
        return "Ranger";
    } else if (level == 9) {
        return "Rogue";
    } else if (level == 10) {
        return "Sorcerer";
    } else if (level == 11) {
        return "Wizard";
    } else {
        console.log("getClassesName error bean =" + JSON.stringify(bean) );
        return "Wizard";
    }
}

export const getExp = exp => {

}

