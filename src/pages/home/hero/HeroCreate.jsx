import React, { Component } from 'react';
import { Row, Col } from 'antd';
import MonsterCard from './view/MonsterCard';
const site_card_wrapper = {
    padding: "50px 80px",
    background: "#ececec"
}

class HeroCreate extends Component {

    render() {
        let list = [
            {
                id:1,
                imgUrl: require("@/res/images/Barbarian.png"),
                title:"野蛮人",
                description:"狂怒是一种力量，它不仅能激发战斗的狂怒，还能激发不可思议的反应、韧性和非凡的力量\n..."
            },
            {
                id:2,
                imgUrl: require("@/res/images/Bard.png"),
                title:"吟游诗人",
                description:"他们不仅可以在任何情况下施展魅力，还可以在战场上施展法术，并通过给予盟友有用的增益来支持他们"
            },
            {
                id:3,
                imgUrl: require("@/res/images/Cleric.png"),
                title:"牧师",
                description:"牧师是强大的治疗者，因为他们可以使用大量的治疗和治疗魔法\n..."
            },
            {
                id:4,
                imgUrl: require("@/res/images/Druid.png"),
                title:"德鲁伊",
                description:"作为荒野的守护者，德鲁伊们更不把自己视为自然秩序的主人，而更多地将自己视为自然秩序意志的延伸"
            },
            {
                id:5,
                imgUrl: require("@/res/images/Fighter.png"),
                title:"战士",
                description:"对武器和装甲的高超掌握，以及对战斗技能的全面了解\n..."
            },
            {
                id:6,
                imgUrl: require("@/res/images/Monk.png"),
                title:"僧侣",
                description:"僧侣们团结在一起，他们能神奇地驾驭身体里流动的能量\n..."
            },
            {
                id:7,
                imgUrl: require("@/res/images/Paladin.png"),
                title:"圣骑士",
                description:"圣骑士发誓维护正义和正义，与世界的美好事物站在一起，对抗入侵的黑暗\n..."
            },
            {
                id:8,
                imgUrl: require("@/res/images/Ranger.png"),
                title:"游侠",
                description:"一个游侠真正的使命是保护文明的郊区不受来自荒野的怪物和类人部落的破坏\n..."
            },
            {
                id:9,
                imgUrl: require("@/res/images/Rogue.png"),
                title:"盗贼",
                description:"一个盗贼宁愿精确的攻击，把它精确的放置在攻击对目标伤害最大的地方，而不是用许多小的攻击来消耗对手"
            },
            {
                id:10,
                imgUrl: require("@/res/images/Sorcerer.png"),
                title:"巫师",
                description:"巫师们拥有一种神奇的与生俱来的权利，这是由异国血统、超自然的影响或未知的宇宙力量赋予他们的"
            },
            {
                id:11,
                imgUrl: require("@/res/images/Wizard.png"),
                title:"术士",
                description:"术士是最高的魔法使用者，他们被定义为一个由他们所施的咒语组成的职业\n..."
            }
        ];

        return (
            <div style={site_card_wrapper}>
                <Row gutter={[32,32]}>
                    {
                        list.map((row,index)=> (
                            <Col key={index} span={6} >
                                <MonsterCard id={row.id} imgUrl={row.imgUrl} title={row.title} description={row.description}></MonsterCard>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}

export default HeroCreate;
