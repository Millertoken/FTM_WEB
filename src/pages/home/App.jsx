import React, { Component } from 'react';
import { Layout } from 'antd';
import HeroCreate from './hero/HeroCreate';
import AcctountHeader from './Header';
import HeroList from './hero/HeroList';
import { Router, Route, Switch } from 'react-router';
import MainPage from './main/MainPage';
// import store from '@/redux/store';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
const { Footer, Header, Content } = Layout;

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Home = () => {
  return (
    <Layout>
      <Header
        style={{ position: 'fixed', zIndex: 1, width: '100%', height: 60 }}
      >
        <AcctountHeader></AcctountHeader>
      </Header>
      <div style={{ marginTop: 64 }}></div>
      <Content className="site-layout" style={{ height: '100%' }}>
        {/* <HeroCreate></HeroList> */}
        <Switch>
          {/* <Route path="/" component={HeroList} exact /> */}
          <Route path="/home/MainPage" component={MainPage} exact />
          <Route path="/home/HeroList" component={HeroList} exact />
          <Route path="/home/HeroCreate" component={HeroCreate} exact />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by MAOYAN
      </Footer>
    </Layout>
  );
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
};

export default App;
