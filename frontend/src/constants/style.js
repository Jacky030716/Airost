import { keyframes } from '@mui/material'

const styles = {
    inputBoxShadow : "0 2px 4px 0 rgba(0, 0, 0, .13), 0 1px 1px 0 rgba(0, 0, 0, .11)",
    raise: "0px 25px 80px rgba(0, 0, 0, 0.15)",
    boxGradient:{
      color : "#0093E9",
      gradient: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
    }
  };

export const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`

export const slideInFromRight = keyframes`
0% {
  transform: translateX(100%);
  opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;

export const scaleUp = keyframes`
0% {
  transform: scale(1);
}
100% {
  transform: scale(1.05);
`;
  
  export default styles;

