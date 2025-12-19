import React, { useCallback, useId, useMemo, useState } from "react";
import { useForm } from 'react-hook-form'
import styles from './Upload.module.scss'
import axios from '../../axios'
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/slices/filesSlice";
function Upload( props ){
    const dispatch = useDispatch();
    // объявление параметров
    const types = props.allowTypes ? props.allowTypes : null
    
    // ========
    const {register, handleSubmit, setValue, formState: {errors} } = useForm({mode: 'all'})

    
    const id = useId()
    //===============
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState("")
    const [step, setStep] = useState(1)
    // =================
    const uploadFile = async(values) =>{
        const formData = new FormData();
        formData.append("file", values.file[0]);
        const { data } = await axios.post("/files/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})

        dispatch(updateState(data))
        setFileName("")
        setFileSize("")
        setStep(1)
        setValue('file', null)
    }

    const onInputCallBack = useCallback((files) => {
        setFileName(files[0].name);
        setFileSize(Math.floor(files[0].size/1024));
        setStep( 2 )
        if( files[0].size/1024 > 150 ){            
            return "Недопустимый размер"
        }
    }, [fileName, fileSize, step, errors])
    const reg = register('file', { validate: (e) => onInputCallBack(e) } )
    return(
        <form className={styles.form} onSubmit={ handleSubmit(uploadFile) }>
            <div className={`${styles.step} ${styles.step1}`} active={(step === 1 ? "true": "false")}>
                <label htmlFor={id}>Выберите файл</label>
                <input type="file" id={id} {...reg}/>
                <p className="rule">* Размером до 150 кб.</p>
            </div>
            <div className={`${styles.step} ${styles.step2}`} active={(step === 2 ? "true": "false")}>
                <div className={styles.top}>
                    <div className={styles.name}>
                        <p>Название</p>
                        <span>{fileName}</span>
                    </div>

                    <div className={styles.size}>
                        <p>Размер</p>
                        <span>{fileSize} кб.</span>
                    </div>
                </div>
                
                { errors.file ? <><label className={styles.send} errors="true" htmlFor={id}>Загрузить</label></> : <input className={styles.send} type="submit" value="Отправить" errors=""/> }
                <div className={styles.alert}>{ errors.file ? errors.file.message : "" }</div>
            </div>
            <div className={`${styles.step} ${styles.step3}`} active={(step === 3 ? "true": "false")}>

            </div>
            
        </form>
    )
}
export default Upload;