import React from 'react';
import { Layout} from 'antd';
import TransactionTable from '../components/transactionTable'
import InstallmentTable from '../components/installmentTable'
import {Route} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  return (
      <Layout className="layout">
          <Header>
          <div className="logo" />
          </Header>
          <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content">
                <Route exact path='/' component={TransactionTable}/>
                <Route path='/:transactionId' component={InstallmentTable} />
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
  );
}

export default CustomLayout;