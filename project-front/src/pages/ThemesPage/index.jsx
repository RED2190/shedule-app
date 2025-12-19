import { useDispatch, useSelector } from 'react-redux'
import styles from './ThemesPage.module.scss'
import React, { useState } from 'react'

function ThemesPage(){

    return(
        <main className={styles['profile-page']}>
            <section className="flex-box column-box themes">
                <h1>Список Тем</h1>

                <button>Добавить тему</button>
            </section>
        </main>
    )
}

export default ThemesPage;