import styles from './Footer.module.scss'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom';

function Footer(){
    const { pathname } = useLocation();
    const authData = useSelector( state => state.auth.data )
    const logined = ( authData && "_id" in authData ) ? true : false
    if( logined ){
        return(
            <footer>
                <Link to={"/profile"} className={styles.profile + (pathname === "/profile" ? ` ${styles.active}` : "") }  />
                <Link to={"/dashboard"} className={styles.dashboard + (pathname === "/dashboard" ? ` ${styles.active}` : "") } />
                <Link to={"/themes"} className={styles.themes + (pathname === "/themes" ? ` ${styles.active}` : "") } />
                <Link to={"/shedule"} className={styles.shedule + (pathname === "/shedule" ? ` ${styles.active}` : "") } />
                <Link to={"/files"} className={styles.files + (pathname === "/files" ? ` ${styles.active}` : "") } />
            </footer>
        )
    }
    else{
        return
    }
}

export default Footer;