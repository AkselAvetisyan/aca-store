import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BLACK, GREY, MyButton, ORANGE, WHITE } from '../../main/constants/Constants';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useMediaQuery } from "@material-ui/core";
import { UserContext } from "../../main/context/UserContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BasketContext } from '../../main/context/BasketContext';
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import { removeItem, addItem } from '../../services/redux/actions/counterActions';
import { useDispatch } from 'react-redux';
import { addToFav } from '../../services/redux/actions/favouriteActions';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        width: props => props.mediaTablet ? (props.mediaMobile ? 135 : 200) : 205,
        height: props => props.mediaTablet ? (props.mediaMobile ? 215 : 255) : 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '5px',
        border: `1px solid ${GREY}`,
        borderRadius: '3px',
        cursor: 'pointer',
        opacity: '0.9',
        '&:hover': {
            opacity: '1',
        }
    },
    productImage: {
        width: props => props.mediaTablet ? '60%' : 140,
        height: props => props.mediaTablet ? 115 : 185
    },
    modelInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        color: BLACK,
        fontWeight: '600'
    },
    productName: {
        fontSize: props => props.mediaMobile ? 16 : 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 25,
        paddingBottom: 25
    },
    price: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
    },
    infoWithImage: {
        textAlign: 'center',
        textDecoration: 'none',
        height: '100%',
        padding: 10
    },
    btnWrapper: {
        backgroundColor: WHITE,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        '&hover': {
            transition: '1s all ease-out',
            fontWeight: 'bold'
        }
    },
    btn: {
        fontSize: 13,
        '&:hover': {
            fontWeight: 700
        }
    },
    btnParent: {
        margin: props => !props.mediaMobile && '0 25px',
        '&hover': {
            fontWeight: 'bold'
        }
    },
    deleteBtn: {
        width: 35,
        position: 'absolute'
    }
}));

export default function Product(props) {
    const [hover, setHover] = useState(false);
    const [basket, setBasket] = useContext(BasketContext);
    const { device, images, name, id, price, openModal } = props
    const currentUser = useContext(UserContext)
    const mediaTablet = useMediaQuery('(max-width:600px)');
    const mediaMobile = useMediaQuery('(max-width:475px)');
    const classes = useStyles({ mediaTablet, mediaMobile });
    const { t } = useTranslation()
    const [btnText, setText] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        basket?.includes(id) ? setText('remove from cart') : setText('ADD TO CART');
    }, [])

    const addToBasket = () => {
        let localArr = [];
        if (localStorage.getItem('ItemsInBasket')) {
            localArr = JSON.parse(localStorage.getItem('ItemsInBasket'));
            if (!localArr.includes(id)) { localArr.push(id) }
            localStorage.setItem('ItemsInBasket', JSON.stringify(localArr))
        }
        else {
            localArr.push(id);
            localStorage.setItem('ItemsInBasket', JSON.stringify(localArr))
        }
        setBasket(localArr);
        dispatch(addItem(id, price))
    }

    const removeFromBasket = () => {
        let localArr = [];
        localArr = JSON.parse(localStorage.getItem('ItemsInBasket'));
        localArr.splice(localArr.indexOf(id), 1)
        localStorage.setItem('ItemsInBasket', JSON.stringify(localArr))
        setBasket(localArr);
        dispatch(removeItem(id))
    }

    return (
        <div className={classes.root} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className={classes.deleteBtn}>
                <MyButton newcolor={ORANGE}><HighlightOffIcon /></MyButton>
            </div>
            <Link to={`/categories/${device}/${id}`} className={classes.infoWithImage}>
                {images?.length && <img className={classes.productImage} src={images[0]} alt="" />}
                <div className={classes.modelInfo}>
                    <div className={classes.productName}>{name}</div>
                    <div className={classes.price}>{numberFormat(price, '֏')}</div>
                </div>
            </Link>
            {hover && (<div className={classes.btnWrapper}>
                <div style={{ display: 'flex' }}>
                    <MyButton newcolor={ORANGE}
                        onClick={() => !currentUser && openModal(t('modalTitleForAddFavoriteItems'))}><FavoriteTwoToneIcon onClick={dispatch(addToFav(id))} /></MyButton>
                </div>
                <div className={classes.btnParent}>
                    <MyButton newcolor={ORANGE} className={classes.btn} onClick={() => { btnText === 'ADD TO CART' ? addToBasket() : removeFromBasket() }}>{t(btnText)}</MyButton>
                </div>
            </div>
            )}
        </div>
    )
}
