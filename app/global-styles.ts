import { createGlobalStyle } from 'styles/styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  /* p,
  label {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  } */

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .icon-base {
    position: relative;
    top: -3px;
  }

  .card {
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 9px -3px;
  }

  .space-base { 
    width: 100%;
  }

  .space-base .space-item-full.ant-space-item {
    width: 100%;
  }

  .spin-inline {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
  }  

  .btn-base {
    border-radius: 4px;
    height: 40px;
    min-width: 100px;    
  }

  .btn-modal {
    border-radius: 4px;
    height: 40px;
    min-width: 120px;
  }

  .input-item.ant-picker {
    width: 100% !important;
    border-radius: 4px !important;
    height: 40px !important;
  }

  .input-item.ant-input-number {
    width: 100% !important;
    border-radius: 4px !important;
    height: 40px !important;

    & .ant-input-number-input-wrap {
      height: 100% !important;
      
      & > input {
        height: 100% !important;
      }
    }
  }

  .input-item .ant-select-selector .ant-select-selection-item {
    padding-top: 4px;
  }

  .input-item .ant-select-selector .ant-select-selection-placeholder {
    padding-top: 4px;
  }

  .input-item .ant-select-selector {
    width: 100% !important;
    border-radius: 4px !important;
    height: 40px !important;
  }

  .overlay-loading {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
  }

  .text-center {
    text-align: center !important;
  }

  .txt-right {
    margin-right: 10px;
    margin-bottom: 2px;
  }

  .spinner {
    position: relative;
    width: 50px;
    height: 50px;
    margin: 15px 5px 0 0;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
  }

  @keyframes spinner1 {
    to {
        transform: rotate(360deg);
    }
  }

  .spinner-1:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    margin-left: -20px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: #ff5629;
    animation: spinner1 0.6s linear infinite;
  }  

  .ant-modal-content {
    border-radius: 6px;
  }

  .ant-modal-header {
    border-radius: 6px 6px 0 0;
  }

  .ant-image-mask-info .anticon {
    position: relative;
    top: -3px;    
  }

  .ant-select-selector {
    height: 35px;
  }  

  .ant-input {
    height: 30px;
  }  

  .ant-input-number-input-wrap input {
    height: 38px;
  }

  .input-item .ant-select-selector {
    width: 100%;
    border-radius: 4px;
    height: 40px;        
  }

  .input-item.ant-picker {
    width: 100%;
  }
  
  .base-tab .ant-tabs-tab {
    padding: 12px !important;
  }

  .ant-pagination-options {
    display: none;
  }

  .ant-pagination-item-link .anticon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wpnp-notification {
    padding: 15px !important;
    max-height: unset !important;
  }

  .wonderpush-notification-preview {
    min-height: unset !important;
  }

  .wonderpush-notification-preview {
    align-items: start !important;
  }

  .wonderpush-notification-preview .wpnp-ios {
    border-color: #000 !important;
  }

  .wonderpush-notification-preview .wpnp-android {
    border-color: #000 !important;
  }

  .wonderpush-notification-preview .wpnp-android .wpnp-volume {
    background-color: #000 !important;
  }

  .wonderpush-notification-preview .wpnp-android .wpnp-lock {
    background-color: #000 !important;
  }
  
  .wonderpush-notification-preview .wpnp-android .wpnp-screen .wpnp-current-date {
    color: gray !important;
  }
  .wonderpush-notification-preview .wpnp-android .wpnp-screen .wpnp-current-time {
    color: gray !important;
  }
  .wonderpush-notification-preview .wpnp-ios .wpnp-screen .wpnp-close-notification .wpnp-current-time {
    color: gray !important;
  }
  .wonderpush-notification-preview .wpnp-ios .wpnp-screen .wpnp-close-notification .wpnp-current-date {
    color: gray !important;
  }

  .wonderpush-notification-preview .wpnp-ios .wpnp-button {
    background-color: #000 !important;
  }

  .wonderpush-notification-preview .wpnp-android .wpnp-button {
    background-color: #000 !important;
  }

  .wonderpush-notification-preview .wpnp-android .wpnp-screen .wpnp-current-time {
    margin-top: 30px !important;
    font-size: 50px !important;
  }

  .wonderpush-notification-preview .wpnp-ios .wpnp-screen .wpnp-close-notification .wpnp-current-time {
    margin-top: 30px !important;
    font-size: 50px !important;
  }


  .editor-wrapper {
    border: 1px solid #f1f1f1;
    min-height: 200px;
    max-height: 400px;
    border-radius: 2px;
    padding: 12px;
  }

  .toolbar-wrapper {
    display: none !important;
  }

  .rdw-mention-link {
    color: '#ff5629' !important;
  }

  .ant-table-scroll-horizontal {
    color: red !important; 
  }

  .modal-warning .ant-modal-content {
    border-radius: 6px !important;    
  }

  .modal-warning .ant-modal-header {
    border-radius: 6px 6px 0px 0px !important;
    text-align: center;
    border-bottom: none;
    background: rgb(247,127,0);
    background: linear-gradient(90deg, rgba(247,127,0,1) 3%, rgba(211,13,13,1) 100%);

    & .ant-modal-title {
      color: #fff;
    }

  }

  .modal-warning .incident-item {
    background: #F77F0019;
    padding: 10px 25px;
    border-radius: 6px;
  }

  .modal-warning .ant-modal-footer {    
    text-align: center;
    border-top: none;
    padding-bottom: 20px;
  }    

  .text-title-bottom {
    font-size: 14px;    
    position: relative;

    &:before {
      content: "";
      background: linear-gradient(90deg,#ffb86c 0,#fc6c8f);
      position: absolute;
      bottom: -10px;
      border-radius: 6px;
      height: 0.25rem;
      width: 3rem;
    }
  }

  .card-inline {
    background-color: rgba(240,242,245, .3);
  }  
`;

export default GlobalStyle;
