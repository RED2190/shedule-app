import styles from './AlertMessage.module.scss'
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { close } from '../../redux/slices/alertSlice';



function AlertMessage(){

    const isOpen = useSelector( state => state.alertSlice.isOpen )
    const msg = useSelector( state => state.alertSlice.msg )
    const dispatch = useDispatch()

    function time(){
        setTimeout(()=>{
            dispatch(close())
        },1000*msg)
    }

    if( isOpen ){
        time()
    }

    return(
        <div className={styles['alert-panel']} visible={isOpen+""}>
            <div className={styles['main']}>
                <p>Уведомление!</p>
                <span>{msg}</span>
                <div className={styles['progress-bar']} ></div>
            </div>
        </div>
    )
}

export default AlertMessage;