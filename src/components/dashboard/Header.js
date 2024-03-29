import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, styled} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import { BLACK, ORANGE, WHITE, GREY, BLUE } from "../main/constants/Constants"
import DropDown from "../main/dropdown/Dropdown";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {UserContext} from "../main/context/UserContext";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {auth} from "../services/firebase/Firebase";
import {LOGO} from "../main/constants/Constants";
import {useMediaQuery} from "@material-ui/core";
import {HOME_URL, LOGIN_URL} from "../services/api/Navigations";
import {BasketContext} from '../main/context/BasketContext';

const useStyles = makeStyles({
    menu: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: 'space-between',
        background: BLACK,
        opacity: '0.7',
        padding: '0 20px'
    },
    subMenu: {
        minWidth: 230,
        color: WHITE,
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',

    },
    cardItems: {
        position: 'absolute',
        width: '0.8rem',
        height: '0.8rem',
        lineHeight: '0.8rem',
        color: BLUE,
        backgroundColor: GREY,
        fontWeight: 'bolder',
        fontSize: '0.7rem',
        borderRadius: '50%',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        marginLeft: '15px'

    },
    userLogo: {
        fontWeight: 'bold',
        width: '2rem',
        height: '2rem',
        lineHeight: '2rem',
        color: ORANGE,
        backgroundColor: WHITE,
        borderRadius: '50%',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
    },
    display: {
        display: "flex",
        alignItems: "center",
    },
    dropdownItemParent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: '10px 5px',
        padding: '5px 0',
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    menuItem: {
        fontWeight: 'bold',
        color: WHITE,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        padding: '3px 0',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    title: {
        fontSize: props => props.media ? 15 : 24,
        fontWeight: 'bold',
        color: ORANGE,
        fontStyle: 'italic',
        textDecoration: 'none',
        margin: '10px',
        cursor: props => props.pathName && 'unset'
    },
    flagsImg: {
        width: 25,
        height: 15,
        padding: '0 5px'
    },
    flagsImgMedia: {
        width: 35,
        height: 20,
        padding: '5px 0'
    },
    loginBg: {
        height: '100vh',
        backgroundColor: BLACK,
        opacity: '0.7'
    },
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '150px 10px',
        opacity: '0.6',
    },
    checkoutLink: {
        display: 'flex',
        flexDirection: 'row',
        textDecoration: 'none',
        position: 'relative'
    }
});

const MyAppBar = styled(AppBar)({
    background: 'transparent',
    boxShadow: "none",
});

export default function Header() {

    const currentUser = useContext(UserContext)
    const [userInitials, setInitials] = useState(currentUser ? firstLetters(currentUser.displayName) : null)
    const [itemsInBasket, setItemsInBasket] = useContext(BasketContext);
    const media = useMediaQuery('(max-width:600px)');
    const location = useLocation();
    const classes = useStyles({ media, pathName: location.pathname === HOME_URL });
    const { t, i18n } = useTranslation()

    useEffect(() => {
        let temp = '';
        if (currentUser) {
            temp = firstLetters(currentUser.displayName)
        }
        setInitials(temp);
    }, [currentUser, currentUser?.displayName])

    function firstLetters(user) {
        if (user) {
            return user.split(' ').map(namepart => namepart.slice(0, 1).toUpperCase()).join('');
        }
    }

    function handleClick(lang) {
        return i18n.changeLanguage(lang)
    }

    function logOut() {
        auth.signOut().then()
    }

    return (
        <MyAppBar style={{position: media && 'unset'}}>
            <div className={classes.menu}>
                <div className={classes.display}>
                    <img src={LOGO} width={40} height={30} alt=""/>
                    {media ? <Link to={HOME_URL} className={classes.title}> sTORe </Link>
                        : <Link to={HOME_URL} className={classes.title}> sTORe </Link>}
                    {media && <>
                        <ShoppingCartIcon className={classes.menuItem}/>
                        {!currentUser && <Link to={LOGIN_URL} className={classes.menuItem}> {t('login')}</Link>}
                        {currentUser &&
                        <div className={classes.menuItem}>
                            <DropDown name={<div className={classes.userLogo}>{firstLetters(currentUser.displayName)}</div>} dropdownContent={
                                <React.Fragment>
                                    <div onClick={logOut} className={classes.dropdownItemParent}  style={{marginTop: 15}}>
                                        {t('logout')}
                                    </div>
                                </React.Fragment>}
                            />
                        </div>
                        }
                    </>}
                </div>
                {!media ? <div className={classes.subMenu}>
                    <div className={classes.menuItem}><DropDown name={t('languages')} dropdownContent={<>
                        <div className={classes.dropdownItemParent} style={{marginTop: 15}}
                             onClick={() => handleClick('en')}>
                            {t('english')}<img className={classes.flagsImg} src="/images/english-flag.png" alt=""/>
                        </div>
                        <div className={classes.dropdownItemParent} onClick={() => handleClick('arm')}>
                            {t('armenian')}<img className={classes.flagsImg} src="/images/armenian-flag.png" alt=""/>
                        </div>
                        <div className={classes.dropdownItemParent} onClick={() => handleClick('rus')}>
                            {t('russian')}<img className={classes.flagsImg} src="/images/russian-flag.png" alt=""/>
                        </div>
                    </>}/>
                    </div>

                    <Link className={classes.checkoutLink} to='/checkout'>
                        <ShoppingCartIcon className={classes.menuItem}/>
                        <div className={classes.cardItems}
                        >{(itemsInBasket && itemsInBasket.length) ? itemsInBasket.length : null}</div>
                    </Link>
                    {!currentUser && <Link to={LOGIN_URL} className={classes.menuItem}> {t('login')}</Link>}
                    {currentUser &&
                    <div className={classes.menuItem}>
                        <DropDown name={<div className={classes.userLogo}>{firstLetters(currentUser.displayName)}</div>} dropdownContent={
                            <React.Fragment>
                                <div onClick={logOut} className={classes.dropdownItemParent}  style={{marginTop: 15}}>
                                    {t('logout')}
                                </div>
                            </React.Fragment>}
                        />
                    </div>
                    }
                </div> : <div style={{display: 'flex', padding: '5px 0'}}>
                    <img onClick={() => handleClick('en')} className={`${classes.flagsImgMedia} ${classes.menuItem}`}
                         src="/images/english-flag.png" alt=""/>
                    <img onClick={() => handleClick('arm')} className={`${classes.flagsImgMedia} ${classes.menuItem}`}
                         src="/images/armenian-flag.png" alt=""/>
                    <img onClick={() => handleClick('rus')} className={`${classes.flagsImgMedia} ${classes.menuItem}`}
                         src="/images/russian-flag.png" alt=""/>
                </div>}

            </div>
        </MyAppBar>
    )
}
