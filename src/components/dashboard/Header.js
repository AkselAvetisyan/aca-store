import React from 'react';
import {makeStyles, styled} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import {BLACK} from "../main/Styles";
import DropDown from "../main/Dropdown";

const useStyles = makeStyles(() => ({

    menu: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: 'space-between',
        background: "transparent",
        padding: '0 20px'
    },

    subMenu: {
        color: BLACK,
        display: "flex",
        alignItems: "center",
    },

    dropdownItem: {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        cursor: 'pointer'
    },

    title: {
        fontStyle: 'italic',
        padding: '0 10px',
    }
}));

const MyAppBar = styled(AppBar)({
    background: 'transparent',
    boxShadow: "none"
});

export default function Header() {
    const classes = useStyles();

    return (
        <MyAppBar>
            <div className={classes.menu}>
                <div className={classes.subMenu}>
                    <img src="/images/logo.png" width={20} height={20}/>
                    <h2 className={classes.title}>Online Shop</h2>
                </div>
                <div className={classes.subMenu}>
                    <div className={classes.dropdownItem}><DropDown name="Languages" items={<div>
                        <div>English</div>
                        <div>Russian</div>
                        <div>Armenian</div>
                    </div>}/>
                    </div>
                    <div className={classes.dropdownItem}>Checkout</div>
                    <div className={classes.dropdownItem}>Login</div>
                </div>
            </div>
        </MyAppBar>
    )
}