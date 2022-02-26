import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Content from "./home/content/Content";
import Footer from "./home/footer/Footer";
import Header from "./home/header/Header";
function App() {
  return (
    <div className="App">
      <Layout>
        <Header/>
        <Content/>
        <Footer/>
      </Layout>
    </div>
  );
}

export default App;
