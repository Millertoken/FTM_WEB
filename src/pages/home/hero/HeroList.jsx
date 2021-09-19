import React, { Component } from 'react';
import BatterCard from './view/BatterCard';
import { Space, Col, Spin, Row } from 'antd';
import { message, Button } from 'antd';
import AdventureControl from './control/AdventureControl';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';

const adventureControl = new AdventureControl();

const HeroList = () => {
  const [heroList, setHeroList] = useState(null);
  const [notApprovedList, setNotApprovedList] = useState([]);///授权NFT给Approve合约
  const [checkGoldList, setCheckGoldList] = useState([]);///授权NFT给Approve合约
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
      .checkMultiApproved(ids)
      .then((result) => {
        let notApprovedList = [];
        result.map((item) => {
          if (item[1] != true) {
            notApprovedList.push(item);
          }
        })
        // console.log("notApprovedList.length = " + notApprovedList.length);
        setNotApprovedList(notApprovedList);
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

    adventureControl
      .checkMultiClaim(ids)
      .then((result) => {
        setCheckGoldList(result);
      })
      .catch((e) => {
        console.log("checkMultiClaim e=" + e)
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
    let ids = []
    checkGoldList.map((item) => {
      if (item[1]) {
        ids.push(item[0])
      }
    })
    adventureControl.getGlod(ids);
  }

  function approveAll() {
    adventureControl.setApprovalForAll(true);
  }

  function setMultiApproval() {
    let ids = [];
    console.log("notApprovedList.length =" + notApprovedList.length)
    notApprovedList.map((item) => {
      ids.push(item[0]);
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
          <h5 style={{ textAlign: 'center', padding: '10px', }}>首次使用或者更新之后需要重新授权,授权之后才能执行其他操作</h5>
          <h5 style={{ textAlign: 'center', padding: '10px', }}>小狐狸返回成功之后,请刷新界面</h5>
          <h5 style={{ textAlign: 'center', padding: '10px', }}>领金币的合约,1级能领的金币为0,建议升级之后再领</h5>
          <h5 style={{ textAlign: 'center', padding: '10px', }}>建议用小号操作,有任何疑问可以联系开发QQ:2468420514</h5>
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '10px 0px 30px ',
          }}>
            <Space>
              <Button type="primary" onClick={approveAll} danger={!allApproved}>
                授权批量合约1
                {
                  allApproved ? "(已授权)" : "(未授权)"
                }
              </Button>
              <Button type="primary" onClick={setMultiApproval} danger={!(notApprovedList.length == 0)}>
                授权批量合约2
                {
                  (notApprovedList.length == 0) ? "(已授权)" : "(" + notApprovedList.length + "个未授权)"
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
                一键冒险({adventureControl.getCanAdventureIds(heroList).length})
              </Button>
              <Button type="primary" onClick={LevelUp}>
                一键升级({adventureControl.getCanLevelUpIds(heroList).length})
              </Button>
              <Button type="primary" onClick={fuben} disabled>
                一键副本
              </Button>
              <Button type="primary" onClick={claimGold} style={{ backgroundColor: '#e8ac10', background: "#e8ac10", borderColor: "#e8ac10", borderRadius: 4 }} >
                一键领金币({
                  function () {
                    let list = []
                    checkGoldList.map((item) => {
                      if (item[1]) {
                        list.push(item)
                      }
                    })
                    return list.length
                  }()
                })
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
