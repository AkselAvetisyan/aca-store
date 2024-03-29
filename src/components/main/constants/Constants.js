import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const LOGO = '/images/logo.png'

export const BLACK = '#070506';
export const WHITE = 'white';
export const ORANGE = '#cf8600'
export const BLUE_GRADIENT = 'linear-gradient(to right, #02bbec, #0642ba) no-repeat 0 0 / cover'
export const BLUE = '#3f51b5'
export const GREY = 'rgb(197, 197, 197)';
export const PURPLE = '#942FB8';

export const MyButton = styled(Button)({
    width: '100%',
    color: props => props.newcolor,
    maxWidth: props => props.maxwidth,
    minWidth: props => props.minWidth || 'unset',
    '&:disabled': {
        border: `1px solid ${BLACK}`
    },
})

