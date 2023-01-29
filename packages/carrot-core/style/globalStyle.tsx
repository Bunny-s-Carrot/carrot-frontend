import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

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
    padding: 4.2rem 0 0 0;
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
.transition-group {
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
}

.pageSlider-enter {
  opacity: 0;
  transform: scale(1.1);
}

.pageSlider-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms, transform 300ms;

}

.pageSlider-exit {
  opacity: 1;
  transform: scale(1);
}

.pageSlider-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}
.right-to-left-enter {
  transform: translateX(100%);
}
.right-to-left-enter-active {
  transform: translateX(0); 
  transition: transform 200ms;
  -webkit-transition: transform 200ms;
  -webkit-transition: -webkit-transform 200ms;
}      
.right-to-left-exit {
  transform: translateX(100%);
}
.right-to-left-exit-active {
  transform: translateX(0); 
  transition: transform 200ms;
  -webkit-transition: transform 200ms;
  -webkit-transition: -webkit-transform 200ms;
}

.right-to-left-exit {
    transform: translateX(0);
}
.right-to-left-exit-active { 
    transform: translateX(-100%);
    transition:transform 200ms;

    -webkit-transition: transform 200ms;
    -webkit-transition: -webkit-transform 200ms;
}      

.left-to-right-enter { 
    transform: translateX(-100%);
}
.left-to-right-enter-active {
    transform: translateX(0);
    transition:all 1s ease;
}      

.left-to-right-exit {
    transform: translateX(0);
}
.left-to-right-exit-active {
    transform: translateX(100%);
    transition:all 1s ease;
}      
`
export default GlobalStyle
