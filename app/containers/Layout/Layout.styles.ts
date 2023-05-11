import styled from 'styled-components';

export default styled.div`
  .trigger {
    padding: 0 28px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
      color: #ff5629;
  }

  .logo-wrapper {
      display: flex;
      justify-content: center;
  }

  .logo {
    height: 50px;
    text-align: center;
    margin: 6px;    
  }

  .back-top-wrapper {
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;    
    transition: all 0.4s;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: #ff5629;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-shadow: 0px 0px 5px #0000003d;
    opacity: 0.3;
  }

  .back-top-wrapper:hover {    
    opacity: 1;
  }

  .layout-sider {
    overflow: auto;
    min-height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    background: #fff;    
  }

  .site-layout {
    min-height: 100vh;
  }

  .site-layout-header {
    display: flex;
    justify-content: space-between;
    z-index: 99 !important;
  }

  .back-top {    
    font-weight: bold;
    font-size: 22px;
  }  

  .layout-content {
    margin-top: 64px;
    padding: 0px 28px;
    overflow: initial;
    background: #eff2f5;
    min-height: calc(100vh - 128px);    
  }

  #components-layout-demo-fixed-sider .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .site-layout .site-layout-background {
    background: #fff;
    transition: all 0.2s;
    padding: 0px;
  }
`