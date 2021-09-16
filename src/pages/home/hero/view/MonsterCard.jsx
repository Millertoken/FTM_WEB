import React, { Component } from 'react';
import { Card } from 'antd';
import { Button } from 'antd';
import { summon } from '@/constract/Rarity';


const site_card_wrapper = {
    padding: "30px",
    background: "#ececec"
}
const { Meta } = Card;

class MonsterCard extends Component {

    onclick(id) {
        return (event) => {
            console.log(event.target)
            summon(id);
        }
    }

    render() {
        let des = this.props.description
        return (
            <div>
                <Card cover={<img src={this.props.imgUrl} height="350px" style={{ padding: "0px 60px" }} />} title={this.props.title} hoverable style={{ height: 590 ,textAlign:"center" }} >
                    <Meta description={<p style={{ whiteSpace: "pre-line" }}>{des}</p>} />
                    <Button type="primary" block style={{ height: 46, marginTop: 20 }} onClick={this.onclick(this.props.id)}>创建</Button>
                </Card>
            </div>
        );
    }
}

export default MonsterCard;
