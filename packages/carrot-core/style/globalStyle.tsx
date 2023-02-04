import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}
@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
${reset}

*{
    box-sizing:border-box;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}
html{
    font-size: 62.5%;
    margin:0;
    padding:0;
    overscroll-behavior:contain;
}
body{
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    color: #323232;
    margin:0;
    padding: 0;
    overflow: hidden;
    overscroll-behavior:contain;
    #App { 
        width:100vw;
        height:calc(var(--vh, 1vh) * 100);
    }
}
button{
    outline:none;
    border:none;
    background: none;
    &:hover{
        cursor: pointer;
    }
}
.Toastify__toast-container {
  width: 70%;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
}
.Toastify__toast {
  min-height: 3.2rem;
  font-size: 1.4rem;
}
.Toastify__toast-body {
  div:last-of-type {
    display: flex;
    align-items: center;
  }
}
`
export default GlobalStyle
