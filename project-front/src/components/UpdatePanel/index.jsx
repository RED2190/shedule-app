import styles from './UpdatePanel.module.scss'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { userUpdate } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

function UpdatePanel({props}){
    const {register, handleSubmit, setValue, formState: {errors} } = useForm({mode: 'all'})
    const dispatch = useDispatch()
    const inputs = props.inputs
    if( !inputs ){
        return(
            <></>
        )
    }
    const updateFormFunc = async (values) => {
        let temp_props = {}
        inputs.forEach( input => {
            temp_props[input.name] = values[input.name]
        });
        const r = { type: values.type, "props": temp_props } 
        console.log(r)
        await dispatch(props.fetch(r))
        props.setVisibility(false)
        props.valuesRef.current = {}        
    }
    return(
        <div id={props.id} className={styles.update} visible={ props.visibility+"" }>
            <form action="" onSubmit={handleSubmit(updateFormFunc)}>
                <h3>Обновление данных</h3>
                <input type="hidden" value={props.dataType} {...register("type")}/>
                <div className={styles.inputs}>
                    { inputs ? inputs.map( input =>
                            input.type( { 
                            placeholder: input.placeholder, 
                            value: () => setValue(input.name, props.valuesRef.current[input.name]),
                            other:{  ...register( input.name) } 
                            })
                    ) : "" }
                </div>
                <button type='submit' className={styles.submit} >Обновить</button>
                <button type='button' onClick={ () => props.setVisibility(false) } className={styles.cancel} >Отменить</button>
            </form>
        </div>
    )
}

export default UpdatePanel