import { DefaultInput, EmailInput, LoginInput, PasswordInput } from '../CustomInputs';
import styles from './AuthPanel.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form'
import { fetchUserData, fetchUserLogin } from '../../redux/slices/authSlice';
import { closeReg, closeLog, openLog, openReg } from '../../redux/slices/authPanelSlice';   
import React from 'react';
import { useState  } from 'react';

function AuthPanel(){
    const authPanelState = useSelector( (state) => state.regPan.isOpen )
    const regPanelState = useSelector( (state) => state.regPan.isOpenReg )
    const logPanelState = useSelector( (state) => state.regPan.isOpenLog )

    const dispatch = useDispatch()

    

    const regForm = useForm({mode: 'all'})
    const logForm = useForm({mode: 'all'})

    const [ registerReg, handleSubmitReg, errorsReg ] = [ regForm.register, regForm.handleSubmit, regForm.formState.errors ]
    const [ registerLog, handleSubmitLog, errorsLog ] = [ logForm.register, logForm.handleSubmit, logForm.formState.errors ]

    
    const onSubmitReg = async ( values ) => {
        if( values.password != values.password2 ){
            return alert("Пароли не совпадают!")
        }
        // values["login"] = values["loginReg"]
        // delete values["loginReg"]
        console.log(values)
        const data = await dispatch(fetchUserData(values))
        if( data.payload && "message" in data.payload ){
            return alert(data.payload.message)
        }
        if( data.payload && 'token' in data.payload ){
            window.localStorage.setItem('token', data.payload.token)
            dispatch(closeReg())
            return
        }
        return alert("Произошла ошибка, попробуйте позже...")
    };
    const onSubmitLog = async ( values ) => {
        const data = await dispatch(fetchUserLogin(values))
        if( data.payload && "message" in data.payload ){
            return alert(data.payload.message)
        }
        if( data.payload && 'token' in data.payload ){
            window.localStorage.setItem('token', data.payload.token)
            dispatch(closeLog())
            return
        }
        return alert("Произошла ошибка, попробуйте позже...")
    };
    
    return(
        
        <section className={styles['auth-panel']}  visible={authPanelState+""}>
            
            <form method='post' className={styles["reg-panel"]} onSubmit={handleSubmitReg(onSubmitReg)} visible={regPanelState+""}>
                <button type='button' onClick={() => { dispatch(closeReg()) }} className={styles['close-icon']}></button>
                <h1 className={styles.title}>Регистрация</h1>
                <p className={styles.desc}>Спасибо, что выбрали Виртуальный Дневник! Зарегистрируйтесь, что бы начать пользоваться </p>
                <EmailInput placeholder="Почта" className="EmailInput" name="EmailInput" status={ errorsReg.email ? false : true } other = { {...registerReg('email', {required: "Укажите почту", pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})} }/>
                <LoginInput placeholder="Логин" isset="true" name="LoginInput" status={ errorsReg.login ? false : true } other = { {...registerReg('login', {required: "Укажите Логин", pattern: /^[\w]{4,}$/g})} }/>
                <DefaultInput placeholder="ФИО" name="NameInput" status={ errorsReg.fullName ? false : true } other = { {...registerReg('fullName', {required: "Укажите Имя", pattern: /^[а-яА-Я ]{2,}$/g})} }/>
                <PasswordInput placeholder="Пароль" name="PasswordInput" className="password" status={ errorsReg.password ? false : true } other = { {...registerReg( 'password', { required: "Укажите Пароль", pattern: /^[\w]{5,}$/g } ) } }/>
                <PasswordInput placeholder="Пароль(повторно)" name="PasswordInput2" className="password" status={ errorsReg.password2 ? false : true } other = { {...registerReg( 'password2', { required: "Укажите Пароль", pattern: /^[\w]{5,}$/g } ) } }/>

                <button type='submit' className={styles.regBtn} >Зарегистрироваться</button>
                <div className={styles.regFooter} >
                    <span>Уже есть акаунт?</span>
                    <button type='button' onClick={() => { dispatch(openLog());  }} >Войти</button>
                </div>
            </form>

            <form method='post' className={styles["log-panel"]} onSubmit={ handleSubmitLog(onSubmitLog) } visible={logPanelState+""}>
                <button type='button' onClick={() => { dispatch(closeLog()) }} className={styles['close-icon']}></button>
                <h1 className={styles.title}>Авторизация</h1>
                <p className={styles.desc}> </p>
                <LoginInput placeholder="Логин" isset="true" status={ errorsLog.login ? false : true } other = { {...registerLog('login', {required: "Укажите Логин", pattern: /^[\w]{4,}$/g})} }/>
                <PasswordInput placeholder="Пароль" name="PasswordInput" className="passwordLog" status={ errorsLog.password ? false : true } other = { {...registerLog( 'password', { required: "Укажите Пароль", pattern: /^[\w]{5,}$/g } ) } }/>

                <button type='submit' className={styles.regBtn} >Авторизироваться</button>
                <div className={styles.regFooter} >
                    <span>Нет акаунта?</span>
                    <button type='button' onClick={() => { dispatch(openReg());  }} >Зарегистрироваться</button>
                </div>
            </form>
        </section>
    )
}

export default AuthPanel;