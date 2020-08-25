import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {HOME_URL} from "../../main/constants/navigations";
import Header from "../header/Header";
import Carousel from "../carousel/Carousel";
import CategoryList from "../category/CategoryList";
import Footer from "../footer/Footer";
import ProductList from "../products/ProductList";
import {makeStyles} from "@material-ui/core/styles";
import Device from "../device/Device";
import CheckoutItems from "../checkout/CheckoutItems";
import {useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles({
    dashboardParent: {
        overflowX: 'hidden'
    },
    categoryList: {
        minHeight: 790
    } ,
    productList: {
        height: props => props ? 790 : 730
    }
})

export default function GeneralRoutes() {
    const media = useMediaQuery('(max-width:600px)');
    const classes = useStyles(media);

    return (
        <Switch className={classes.dashboardParent}>
            <Route path={HOME_URL}>
                <div className={classes.categoryList}>
                    <Header/>
                    <Carousel/>
                    <CategoryList/>
                </div>
                <Footer/>
            </Route>
            <Route exact path='/checkout'>
                <CheckoutItems/>
            </Route>
            <Route exact path='/categories/:category'>
                <div className={classes.productList}>
                    <Header/>
                    <ProductList/>
                </div>
                <Footer/>
            </Route>
            <Route exact path='/categories/:category/:id'>
                    <Header/>
                    <Device/>
                <Footer/>
            </Route>
            <Redirect to={HOME_URL}/>
        </Switch>
    )
}
