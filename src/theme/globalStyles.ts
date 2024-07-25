import { createGlobalStyle } from "styled-components";
import { Theme, theme as projectTheme } from "../theme/theme";

export default createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.newColors.white100};
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: ${projectTheme.newColors.gray100};
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.colors.backgroundMain};
    font-family: "Nunito Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
  }
  @-ms-viewport {
    width: device-width;
  }

  #root {
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
    transition-property: color, background-color, padding, border-color, border-width, box-shadow, stroke, fill;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 500;
  }

  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  hr {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    border-top: 1px solid ${projectTheme.newColors.gray30};
    border-bottom: none;
    margin: 24px 0;
    height: 0;
    overflow: visible;
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }

  article,
  aside,
  dialog,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  a, a:hover, a:active {
    background-color: transparent;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
  }

  a[disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }
`;
