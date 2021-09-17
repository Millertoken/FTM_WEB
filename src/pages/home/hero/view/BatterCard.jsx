import React, { Component } from 'react';
import { Skeleton, Card, Button, Space } from 'antd';
import '@/APP.less';
import { summonerInfo } from '@/constract/Rarity';
import { getClassesName } from '../utils/constrct_utils';
import { toEth } from '@/utils/util';

class BatterCard extends Component {
  interval;

  componentDidMount() {
    let dataBean = this.props.bean.info;
    this.startTime(dataBean[1].toString() * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000)
      .toLocaleString()
      .replace(/:\d{1,2}$/, ' ');
  }

  // async loadData(tokenId) {
  //   await summonerInfo(tokenId)
  //     .then((response) => {
  //       // console.log("summonerInfo tokenId = "+tokenId+ " , response = "+ response[1].toString())
  //       this.setState({ loading: false, dataBean: response });
  //     })
  //     .catch((error) => {
  //       console.log('summonerInfo error =' + error);
  //     });
  // }

  showtime(endtime) {
    var nowtime = new Date(); //获取当前时间
    if (endtime < nowtime.getTime()) {
      return '可以冒险了';
    }
    var lefttime = endtime - nowtime.getTime(), //距离结束时间的毫秒数
      leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
      lefth = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
      leftm = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
      lefts = Math.floor((lefttime / 1000) % 60); //计算秒数
    var time = lefth + 'h:' + leftm + 'm:' + lefts + 's';
    // console.log("showtime ="+)
    return time; //返回倒计时的字符串
  }

  startTime(endtime) {
    let self = this;
    let key = 'showtime' + this.props.bean.id;
    var div = document.getElementById(key);
    this.interval = setInterval(function () {
      div.innerHTML = self.showtime(endtime);
    }, 1000); //反复执行函数本身
  }

  render() {
    var dataBean = this.props.bean.info;
    var img = require('@/res/images/' + getClassesName(dataBean[2]) + '.png');
    return (
      <div>
        <Card style={{ textAlign: 'center' }}>
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <img src={img} width="100px" height="140px" />
            <p>{getClassesName(dataBean[2])}</p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              <p>Id:</p>
              <p>{this.props.bean.id}</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              <p>等级:</p>
              <p>{dataBean[3].toString()}</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              <p>经验值:</p>
              <p>{toEth(dataBean[0].toString()).toString()}/{toEth(dataBean[4].toString()).toString()}</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              <p>金币:</p>
              <p style={{color: "#e8ac10"}}>{toEth(dataBean[5].toString()).toString()}</p>
            </div>
            <p>下一次冒险时刻</p>
            <p
              id={'showtime' + this.props.bean.id}
              style={{ color: '#e36d11' }}
            >00h:00m:00s</p>
          </Space>
        </Card>
      </div>
    );
  }
}

export default BatterCard;
