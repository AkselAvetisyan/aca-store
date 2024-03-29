import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from 'react-router-dom'
import {db} from "../../services/firebase/Firebase";
import {GREY, MyButton} from "../../main/constants/Constants";
import Loader from "../../main/loader/Loader";
import AboutDevice from "./about/AboutDevice";
import {useTranslation} from "react-i18next";
import DeviceDescription from "./description/DeviceDescription";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useHistory} from "react-router-dom";
import Price from "./price/Price";
import Credits from "./price/Credits";
import DeviceCount from "./count/DeviceCount";
import DeviceImages from "./images/DeviceImages";
import DeleteImagesAdmin from "./images/DeleteImagesAdmin";
import AddImagesAdmin from "./images/AddImagesAdmin";

const useStyles = makeStyles({
    container: {
        minHeight: 628,
        margin: '60px 30px'
    },
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    images: {
        width: 302,
        textAlign: 'center'
    },
    mainImage: {
        width: 160,
        height: 220,
    },
    deviceInfoPart: {
        marginLeft: 30
    },
    info: {
        borderBottom: `2px solid ${GREY}`
    },
    model: {
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: '0 0 15px',
    },
    btnParent: {
        margin: 20
    },
    displayFlex: {
        display: 'flex'
    },
    flexWrap: {
        flexWrap: 'wrap'
    }
})

export default function Device() {
    const [device, setDevice] = useState({})
    const [images, setImages] = useState([])
    const [mainImage, setMainImage] = useState({})
    const [loader, setLoader] = useState(true)
    const [price, setPrice] = useState(0)
    const [deviceCount, setDeviceCount] = useState(1)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deletedImage, setDeletedImage] = useState(null)
    const {id} = useParams()
    const classes = useStyles()
    const {t} = useTranslation()
    const history = useHistory()

    useEffect(() => {
        db.collection('product').doc(id).get().then(doc => {
            setDevice(doc.data())
            setMainImage(doc.data()?.images && doc.data()?.images[0])
            setImages(doc.data()?.images)
            setLoader(false)
        })
    }, [])

    function changeImage(image) {
        setMainImage(image)
    }

    function openDeletePopup(val, image) {
        setDeletedImage(image)
        setOpenDeleteModal(val)
    }

    return (
        <div className={classes.container}>
            <div onClick={() => history.goBack()} className={classes.backIcon}>
                <Fab color="primary"><KeyboardBackspaceIcon/></Fab>
            </div>
            <div className={classes.main}>
                <div className={classes.images}>
                    <div className={classes.relative}>
                        <img className={classes.mainImage} src={mainImage} alt=""/>
                    </div>
                    <div className={`${classes.displayFlex} ${classes.flexWrap}`}>
                        <DeviceImages images={images} setImages={setImages} changeImage={changeImage} openDeletePopup={openDeletePopup}/>
                        <AddImagesAdmin images={images} setImages={setImages} type={device.device}/>
                    </div>
                </div>
                <DeleteImagesAdmin images={images} setImages={setImages}
                                   openDeleteModal={openDeleteModal}
                                   isDeleteModal={setOpenDeleteModal}
                                   deletedImage={deletedImage}
                                   setMainImage={setMainImage}
                                   type={device.device}/>
                <div className={classes.deviceInfoPart}>
                    <div className={classes.info}>
                        <div className={classes.model}>{device.model}</div>
                    </div>
                    <div className={classes.info}>
                        <Price price={price || device.price} setPrice={setPrice} count={deviceCount}/>
                        <Credits price={price || device.price} count={deviceCount}/>
                        <DeviceCount count={deviceCount} setCount={setDeviceCount}/>
                    </div>
                    <div className={classes.info}>
                        <AboutDevice device={device}/>
                    </div>
                    <div className={classes.btnParent}>
                        <MyButton variant="contained" color="primary">{t('buy')}</MyButton>
                    </div>
                </div>
                {loader && <Loader/>}
            </div>
            <DeviceDescription/>
        </div>
    )
}
