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
  const [multiApproved, setMultiApproved] = useState(false);///授权NFT给Approve合约
  const [allApproved, setAllApproved] = useState(false);///调用Approve合约授权NFT给冒险合约，都是因为金币的合约isApporove判断傻逼,没有用allApprove来判断
  const { chainId, account, activate, active } = useWeb3React();

  useEffect(() => {
    if (account) {
      loadList(account);
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

        let ids = [];
        data.result.map((item) => {
          ids.push(item.tokenID);
        });
        checkApprove(ids);
      })
      .catch((err) => {
        console.log(err);
        errorToast('列表加载失败');
      });
  }

  async function loadInfo(data) {
    let array = await adventureControl.getAll(data.result);
    let list = [];
    data.result.map((item, index) => {
      list.push({
        id: item.tokenID,
        info: array[index],
      });
    });
    setHeroList(list);
  }

  function checkApprove(ids) {
    adventureControl
      .isMultiApproved(ids)
      .then((result) => {
        console.log("isMultiApproved result=" + result)
        setMultiApproved(result);
      })
      .catch((e) => {
        console.log("isMultiApproved e=" + e)
        errorToast('Approved状态确认失败');
      });

    adventureControl
      .isApprovedForAll(account)
      .then((result) => {
        console.log("isApprovedForAll result=" + result)
        setAllApproved(result);
      })
      .catch((e) => {
        console.log("isApprovedForAll e=" + e)
        errorToast('Approved状态确认失败');
      });
  }

  const errorToast = (error) => {
    message.error(error + ' ,请刷新界面,否则状态可能不对', 5);
  };

  function LevelUp() {
    adventureControl.LevelUp(heroList);
  }

  function adventure() {
    adventureControl.adventure(heroList);
  }

  function claimGold() {
    adventureControl.getGlod(heroList,()=>{
      console.log("claimGold success")
    });
  }

  function approveAll() {
    adventureControl.setApprovalForAll(true);
  }

  function setMultiApproval() {
    let ids = [];
    heroList.map((item) => {
      ids.push(item.id);
    });
    adventureControl.setMultiApproval(ids);
  }


  function pointAdd() {

  }

  function fuben() {

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
          <h5 style={{ textAlign: 'center' ,padding: '10px',}}>首次使用或者更新之后需要重新授权</h5>
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '10px 0px 30px ',
          }}>
            <Space>
              <Button type="primary" onClick={approveAll} danger={!allApproved}>
                授权批量合约1
                {
                  allApproved?"(已授权)":"(未授权)"
                }
              </Button>
              <Button type="primary" onClick={setMultiApproval} danger={!multiApproved}>
                授权批量合约2
                {
                  multiApproved?"(已授权)":"(未授权)"
                }
              </Button>
            </Space>
          </div>
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
              <Button type="primary" onClick={fuben} disabled>
                一键副本
              </Button>
              <Button type="primary" onClick={claimGold} style={{ backgroundColor: '#e8ac10', background: "#e8ac10", borderColor: "#e8ac10", borderRadius: 4 }} >
                一键领金币
              </Button>
              <Button type="primary" onClick={pointAdd} disabled>
                一键加点
              </Button>
            </Space>
          </div>

          <Row gutter={[16, 16]}>
            {heroList.map((row, index) => (
              <Col key={index} span={4}>
                <BatterCard bean={row}></BatterCard>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div style={{ width: '100%', height: '800px', textAlign: 'center', display: "flex", justifyContent: 'center', alignItems: 'center', }}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default HeroList;
