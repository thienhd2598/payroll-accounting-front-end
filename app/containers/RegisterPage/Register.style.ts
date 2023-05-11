import styled from 'styled-components';

export default styled.div`
    /* max-width: 1130px; */
    margin: auto;   
    min-height: 100vh;
    position: relative;        

    .card {        
        width: 70%;
        /* margin: auto;
        margin-top: 20%; */        
        border-radius: 12px;
        box-shadow: 0 8px 10px rgba(0,0,0,.08);
    }

    .col-login {
      background: #f0f2f5;      
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .txt-fiin {        
        font-size: 32px;
        font-weight: bold;
        padding: 20px 0px;
    }

    .row-bottom {
        margin-top: 0px;
        margin-bottom: 30px;
    }

    .txt-title {        
        font-size: 32px;
        font-weight: bold;        
    }

    .txt-title-brand {        
      display: flex;
      justify-content: center;
      font-size: 30px;
      font-weight: bold;  
      text-align: center;
      margin: auto;
      margin-bottom: 0px;      
      color: #ff5629;
    }

    .txt-sub-wrapper {
        margin-top: 20px;
    }

    .txt-sub {        
        font-size: 18px;
    }

    .form-brand {
        margin-top: 20px;        
    }

    .input-item {
        border-radius: 6px;
        height: 45px;
    }

    .btn-brand {
        width: 100%;
        height: 45px;
        border-radius: 6px;        
        margin-top: 10px;
    }

    .btn-register {                
    }

    .btn-register .ant-btn > span {        
    }

    .btn-login {        
    }

    .spin-login {
        position: absolute;
        top: 35%;
        left: 50%;
    }

    .txt-tutorial {        
    }

    .txt-tutorial:hover {        
    }

    .icon__check {
        color: #f4a525;
        font-size: 16px;
        position: relative;
        top: -2px;
    }

    .alert-login {
        border: 1px solid #d3f4db;
        /* background-color: rgba(0,197,122, .6); */
        background-color: #d3f4db;
        border-radius: 6px;
        padding: 10px 20px;
        margin: 10px 0px;
    }

    .txt-alert {
        font-size: 14px;
        /* color: #fff;         */        
    }
`;