import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Menu, message, Space, Button } from 'antd';
// import localStorage from "localStorage";
import Web3 from 'web3';
import { getEllipsisString } from './utils/stringUtls';
// import { ReactComponent as CherryLogo } from '../res/images/cherry_logo.svg'
import { NavLink } from 'umi';
import { METAMASK_REFRESH } from '@/redux/Type';
import { connect } from 'react-redux';
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [250], //能支持的网络
});

let web3;

const Acctount = (props) => {
  useEffect(() => {
    // 这样模拟的是 componentDidMount
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          // User has allowed account access to DApp...
          activate(injectedConnector);
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      message.info('请先安装MetaMask插件');
    }
  }, []);

  // activate(injectedConnector);
  const { chainId, account, activate, active } = useWeb3React();
  // console.log("props ="+ props.store)
  console.log(
    `chainId = ${chainId} , account = ${account} , activate = ${active}`,
  );
  const onClick = () => {
    console.log('onClick');
    activate(injectedConnector);
  };

  //     let obj = {"address":account};
  //     localStorage.setItem("account",JSON.stringify(obj));
  // let user = JSON.parse(localStorage.getItem("account"))

  let isConnected = account ?? false;

  return (
    <div>
      {!isConnected ? (
        <Button onClick={onClick}>Disconnect</Button>
      ) : (
        <Button type="primary">{getEllipsisString(account)}</Button>
      )}
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#001528',
          height: 60,
        }}
      >
        <Space align="center" style={{ height: '100%' }}>
          <span
            style={{
              marginLeft: 16,
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
            }}
          >
            Rarity Manifested
          </span>
        </Space>
        <div
          style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}
        >
          <Space align="center">
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ marginBottom: 0, height: 60 }}
            >
              <Menu.Item key={1}>
                {' '}
                <NavLink to="/home/MainPage">首页</NavLink>
              </Menu.Item>
              <Menu.Item key={2}>
                {' '}
                <NavLink to="/home/HeroCreate">创建</NavLink>
              </Menu.Item>
              <Menu.Item key={3}>
                <NavLink to="/home/HeroList">战斗</NavLink>
              </Menu.Item>
            </Menu>
            <Acctount></Acctount>
          </Space>
        </div>
      </div>
    </div>

    // <div style={{ display: "flex", flexWrap: "nowrap", flexDirection: "row" }}>
    //     <p style={{ color: "white" }}>s2432lklsf   </p>
    //     <p style={{ color: "white" }}>s32424</p>
    // </div>
  );
};

export default Header;
