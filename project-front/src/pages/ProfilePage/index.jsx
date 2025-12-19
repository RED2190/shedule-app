import { useDispatch, useSelector } from 'react-redux'
import styles from './ProfilePage.module.scss'
import AuthPanel from '../../components/AuthPanel'
import { openReg } from '../../redux/slices/authPanelSlice'
import { useForm } from 'react-hook-form'
import axios from '../../axios'
import React, { useState } from 'react'
import { userUpdate } from '../../redux/slices/authSlice'
import { DefaultInput } from '../../components/CustomInputs'

function ProfilePage(){
    const dispatch = useDispatch()
    const authData = useSelector( state => state.auth.data )
    const [ isVisibleUpdateF, setVisibleUpdateF ] = useState(false)
    const [ updateInputs, setUpdateInputs ] = useState([])
    
    function generateUpdatesInputs( inputs = [] ){
        let result = []
        inputs.forEach( ([ name, type, placeholder, value,  ]) => {
            let inp = type( { placeholder: placeholder, other: {...registerUpd( name )} } )
            result.push(inp)
        } )
        setUpdateInputs(result)
        setVisibleUpdateF(true)
    }
    // Форма удаления преподаваемых предметов
    const subjectForm = useForm({mode: 'all'})
    const [ registerSub, handleSubmitSub, errorsSub ] = [ subjectForm.register, subjectForm.handleSubmit, subjectForm.formState.errors ]
    // Форма обновления полей
    const updateForm = useForm({mode: 'all'})
    const [ registerUpd, handleSubmitUpd, errorsUpd ] = [ updateForm.register, updateForm.handleSubmit, updateForm.formState.errors ]
    
    // const themesForm = useForm({mode: 'all'})
    // const [ registerThemes, handleSubmitThemes, errorsThemes ] = [ themesForm.register, themesForm.handleSubmit, themesForm.formState.errors ]

    const deleteSubject = async ( id, name ) => {
        const r = { type: "removeSubject", props: {id: id } }
        console.log(r)
        if( window.confirm(`Вы действительно хотите удалить предмет <${name}>?`) ){
            dispatch(userUpdate(r))
            return
        }
    }

    const updateFormFunc = async (values) => {
        const r = { type: values.type, props: {name: values.name } }
        let res = await dispatch(userUpdate(r))
        console.log(res)
        setVisibleUpdateF(false)
        setUpdateInputs([])
    }

    return(
        <main className={styles['profile-page']}>
            <section className="flex-box column-box profile">
                <h1>Профиль</h1>
                <div className={styles['data-group']}>
                    <h2>Личные данные:</h2>
                    <ul>
                        <li>ФИО<span>|</span>{ authData && "fullName" in authData ? authData.fullName : "" }</li>
                        <li>Логин<span>|</span>{ authData && "login" in authData ? authData.login : "" }</li>
                        <li>Почта<span>|</span>{ authData && "email" in authData ? authData.email : "" }</li>
                    </ul>
                </div>

                <div className={styles['data-group']}>
                    <h2>Преподоваемые предметы:</h2>
                    { authData && Object.keys(authData.subjects).length > 0 ? "" : "У вас еще не зарегистрировано ни одного предмета." }
                    <form onSubmit={handleSubmitSub(deleteSubject)} >
                        <ul>
                            { authData && Object.keys(authData.subjects).length > 0 ? Object.entries(authData.subjects).map(( [id, value ] ) => 
                                <li key={id} className='subject'>
                                    <button key={id} className='delete' type='button' onClick={ () => { deleteSubject( id, value.name ) } } ></button>
                                    {value.name}
                                </li> ) : ""}
                        </ul>
                    </form>
                    <button onClick={ () => { generateUpdatesInputs( [ ["name", DefaultInput, "Предмет"] ] ) } }>Добавить</button>
                </div>

                <div className={styles.update} visible={ isVisibleUpdateF+"" }>
                    <form action="" onSubmit={handleSubmitUpd(updateFormFunc)}>
                        <h3>Обновление данных</h3>
                        <input type="hidden" value="addSubject" {...registerUpd("type")}/>
                        <div className={styles.inputs}>
                            { updateInputs }
                        </div>
                        <button type='submit' className={styles.submit} >Обновить</button>
                        <button type='button' onClick={ () => { setVisibleUpdateF(false); setUpdateInputs([]) } } className={styles.cancel} >Отменить</button>
                    </form>
                </div>

                <div className={styles.update} visible={ isVisibleUpdateF+"" }>
                    <form action="" onSubmit={handleSubmitUpd(updateFormFunc)}>
                        <h3>Обновление данных</h3>
                        <input type="hidden" value="addSubject" {...registerUpd("type")}/>
                        <div className={styles.inputs}>
                            { updateInputs }
                        </div>
                        <button type='submit' className={styles.submit} >Обновить</button>
                        <button type='button' onClick={ () => { setVisibleUpdateF(false); setUpdateInputs([]) } } className={styles.cancel} >Отменить</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default ProfilePage;