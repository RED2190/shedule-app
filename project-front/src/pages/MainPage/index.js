import AuthPanel from '../../components/AuthPanel'
import AlertMessage from '../../components/AlertMsg';
import styles from './MainPage.module.scss'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { openReg, openLog } from '../../redux/slices/authPanelSlice';

function MainPage(){
    const regPanelState = useSelector( (state) => state.regPan.isOpen )
    const authData = useSelector( state => state.auth.data )
    const dispatch = useDispatch()
    return(
        <main className={styles['main-page']}>
            <section className="flex-box column-box">
                <div className={"flex-box "+styles.top}>
                    <button type='button' className="def-button" onClick={() => { dispatch(openLog()) }} >Войти</button>
                </div>
                <div className="flex-box column-box middle">
                    <h1 className={styles.logo + " logo flex-box column-box"}>
                        <span className="logo-color-w">Виртуальный</span>
                        <span className="logo-color-b">Дневник</span>
                        <span className="logo-color-r">Учителя</span>
                    </h1>
                    <p className={styles.description+" p1"}>Виртуальный дневник учителя - это уникальная платформа, созданная для упрощения работы учителей</p>
                    <h2 className="h2">Возможности дневника</h2>
                    <ul>
                        <li>Создавайте виртуальные классы</li>
                        <li>Записывайте задание и расписание сразу для всех участников класса</li>
                        <li>Добавляйте/Удаляйте учащихся в свои классы</li>
                        <li>Больше не нужно узнавать у друзей задание и ждать его</li>
                    </ul>
                    <a className={"def-button " + styles.regBtn}  onClick={() => { dispatch(openReg()) }}>Зарегистрироваться</a>
                </div>
                <div className="flex-box bottom"></div>
            </section>

            <AuthPanel/>

        </main>
    )
}

export default MainPage;