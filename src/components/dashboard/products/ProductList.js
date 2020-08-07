import React, {useEffect, useState} from 'react';
import Product from './Product';
import uniqId from 'uniqid';
import {db} from '../../services/Firebase';
import {useLocation} from 'react-router-dom';
import {makeStyles, useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        margin: props => props ? '100px 30px 10px' : 10,
        display: props => props && 'flex',
    },
    products: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        marginLeft: 10
    },
    filters: {
        padding: props => !props && '0 10px',
    },
    subFilters: {
        display: props => !props && 'flex',
    },
    filterType: {
        padding: 10
    },
    filtersTitle: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: '30px',
        fontStyle: 'italic',
    }
}))

export default function ProductList() {
    const [prod, setProd] = useState([]);
    const location = useLocation();
    const media = useMediaQuery('(min-width:600px)');
    const classes = useStyles(media);

    useEffect(() => {
        getAllProductInfo();
    }, []);

    async function getAllProductInfo() {
        try {
            const pathName = location.pathname.substr(1)
            let tempArr = [];
            const getModelInfoRef = (await db.collection('product').get()).docs;
            getModelInfoRef.forEach(doc => {
                let temp = doc.data();
                tempArr.push({...temp})
            });
            setProd(tempArr.filter(el => el.device === pathName));
        } catch (e) {
            console.log("can not  get the docs:", e);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.filters}>
                <h2 className={classes.filtersTitle} style={{fontStyle: 'italic'}}>Filters</h2>
                <div className={classes.subFilters}>
                    <div className={classes.filterType}>
                        <div className={classes.filtersTitle}>Brand</div>
                    </div>
                    <div className={classes.filterType}>
                        <div className={classes.filtersTitle}>Price</div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%'}}>
                <div className={classes.products}>
                    {prod.map((item) => (<Product image={item.image}
                                                  name={item.model}
                                                  price={item.price}
                                                  key={uniqId()}/>))}
                </div>
            </div>
        </div>
    )
}