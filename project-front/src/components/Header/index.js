import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


function Header(){
    const dispatch = useDispatch()
    function onClickLogout(){
        if( window.confirm( "Вы точно хотите выйти?" ) ){
            dispatch(logout())        
            window.localStorage.removeItem('token')
        }
    }
    const [hdr, sethdr] = useState(<header className={styles.loadingPage}></header>);
    const authData = useSelector( state => state.auth.data )
    React.useEffect( () => {
        if ( authData && window.localStorage.getItem("token") && "_id" in authData ) { // если в дате есть id и на компьютере есть токен
            sethdr(
            <header>
                <button onClick={() => onClickLogout()}>Выйти</button>
            </header>);
        }
        else if( !authData || !window.localStorage.getItem('token') ){ // если есть токен, но он не прошел проверку или токена нет 
            sethdr(<Navigate to="/" />);
        }
    }, [authData])

    return(hdr)
}

export default Header;