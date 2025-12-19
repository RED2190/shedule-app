import styles from './FilesPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import xls from '../../icons/xls.svg';
import Upload from '../../components/Upload';
import UpdatePanel from '../../components/UpdatePanel';
import * as inputTypes from '../../components/CustomInputs'
import { useId, useRef, useState } from 'react';
import { fetchFilesData, removeFile } from '../../redux/slices/filesSlice';

import React from "react";


export default function FilesPage(){  
    const dispatch = useDispatch();
    const filesData = useSelector( state => state.files.data )

    React.useEffect( () => {
        dispatch(fetchFilesData())
    }, [])

    const [visibility, setVisibility] = useState(false)
    const valuesRef = useRef({})
    const inputs = [
        { 
            "type": inputTypes.DefaultInput,
            "name": "name",
            "placeholder": "Название"
        },
        { 
            "type": inputTypes.HiddenInput,
            "name": "fileId",
            "placeholder": "",
        },
    ]
    const fileClick = ( ev ) => {
        let btn = ev.target
        let file = btn.parentNode
        let data = file.parentNode
        let active = data.querySelector('[active="true"]')
        if( active ) active.setAttribute('active', "false");
        file.setAttribute('active', "true")
    }
    const closeFileClick = ( ev ) => {
        let btn = ev.target
        let file = btn.parentNode
        let data = file.parentNode
        let active = data.querySelector('[active="true"]')
        if( active ) active.setAttribute('active', "false");
    }
    console.log(filesData)
    const deleteFile = async ( id, name ) => {
        const r = { type: "removeFile", props: {fileId: id } }
        if( window.confirm(`Вы действительно хотите удалить файл <${name}>?`) ){
            dispatch(fetchFilesData(r))
            return
        }
    }
    return(
        <main className={styles['files-page']}>
            <section className="flex-box column-box">
                <h1>Мои файлы</h1>
                <div className={styles['data-group']}>
                    { filesData && filesData.files ? Object.entries(filesData.files).map( ([key, value]) => 
                        <div key={key} className={styles['file']} active="false" >
                            <img src={xls} />
                            <ul>
                                <li><span>Название:&nbsp;</span> { value.clientName }</li>
                                <li><span>Размер:&nbsp;</span> { value.size } Б.</li>
                                <li><span>Создан:&nbsp;</span> { value.created }</li>
                            </ul>
                            <div className="block">
                                <button type='button' onClick={ () => { valuesRef.current["name"] = value.clientName;setVisibility(true); valuesRef.current["fileId"] = key} }>Изменить</button>
                                <button type='button' onClick={ () => { deleteFile( key, value.clientName ) } }>Удалить</button>
                            </div>
                            <button onClick={ closeFileClick } className={styles.closeButton}></button>
                            <div className={styles.clickArea} onClick={ fileClick }></div>
                        </div>
                     ) : "" }
                </div>
                <Upload />
                <UpdatePanel props={{"id": useId(),"inputs":inputs, dataType: "updateName", "visibility": visibility, "setVisibility": (a) => setVisibility(a), "valuesRef": valuesRef, "fetch": (r) => fetchFilesData(r) }} />
            </section>
        </main>
    )
}