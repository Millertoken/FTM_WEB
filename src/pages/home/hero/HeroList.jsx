import React, { Component } from 'react';
import BatterCard from './view/BatterCard';
import { Space, Col, Spin, Row } from 'antd';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import { REQUEST_HEROLIST, METAMASK_REFRESH } from '@/redux/Type';
import AdventureControl from './control/AdventureControl';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';

const adventureControl = new AdventureControl();

const HeroList = () => {
  const [heroList, setHeroList] = useState(null);
  const [approved, setApproved] = useState(false);

  const { chainId, account, activate, active } = useWeb3React();

  useEffect(() => {
    if (account) {
      loadList(account);
      checkApprove(account);
    }
  }, [account]);

  function loadList(address) {
    let url =
      'https://api.ftmscan.com/api?module=account&action=tokennfttx&contractaddress=0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb&address=' +
      address +
      '&apikey=127EZ5EH4QDR1MYWGEHSFTUF3CV6SIRCFN';
    fetch(url, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
      .then((response) => response.json())
      .then((data) => {
        loadInfo(data);
      })
      .catch((err) => {
        console.log(err);
        errorToast('列表加载失败');
      });
  }

  async function loadInfo(data) {
    let array = await adventureControl.getAll(data.result);
    console.log('array.result =' + array.length);
    let list = [];
    data.result.map((item, index) => {
      list.push({
        id: item.tokenID,
        info: array[index],
      });
    });
    setHeroList(list);
  }

  function checkApprove(accountAddress) {
    adventureControl
      .checkApprovedAll(accountAddress)
      .then((result) => {
        console.log(
          'checkApprove result =' +
            result +
            ' , accountAddress = ' +
            accountAddress,
        );
        setApproved(result);
      })
      .catch((e) => {
        errorToast('Approved确认失败');
      });
  }

  const errorToast = (error) => {
    message.error(error + ' ,请刷新界面,否则状态可能不对', 2);
  };

  function LevelUp() {
    adventureControl.LevelUp(heroList);
  }

  function adventure() {
    adventureControl.adventure(heroList);
  }

  function approveAll() {
    adventureControl.setApproval(true);
  }

  let site_card_wrapper = {
    padding: '50px 80px',
    background: '#ececec',
  };

  return (
    <div style={site_card_wrapper}>
      {heroList ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>英雄数量:{heroList.length}</h3>
          {approved ? (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '10px 0px 30px ',
              }}
            >
              <Space>
                <Button type="primary" onClick={adventure}>
                  一键冒险
                </Button>
                <Button type="primary" onClick={LevelUp}>
                  一键升级
                </Button>
                {/* <Button type="primary" onClick={LevelUp}>
                  一键副本
                </Button>
                <Button type="primary" onClick={LevelUp} style={{backgroundColor: 'red',background:"red",borderColor:"red",borderRadius:4}} >
                  一键领金币
                </Button>
                <Button type="primary" onClick={LevelUp}> 
                  一键加点
                </Button> */}
              </Space>
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '10px 0px 30px ',
              }}
            >
              <Space>
                <Button type="primary" onClick={approveAll}>
                  一键授权
                </Button>
              </Space>
            </div>
          )}

          <Row gutter={[16, 16]}>
            {heroList.map((row, index) => (
              <Col key={index} span={4}>
                <BatterCard bean={row}></BatterCard>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div style={{ width: '100%', height: '800px', textAlign: 'center',display:"flex",justifyContent: 'center', alignItems: 'center', }}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default HeroList;
