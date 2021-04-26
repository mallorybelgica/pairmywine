import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html,
body,
div,
span {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}
*,
*:before,
*:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}
html, body {
    margin: 30px 5px;
    max-width: 100vw;
    background-color: #efdcd3;
}
p, span, label {
    font-family: 'Montserrat', sans-serif;
}
h1 {
    font-family: "Mukta", sans-serif;
    text-transform: uppercase;
}
`;
