import styles from './CustomInputs.module.scss'
import passHideIco from '../../icons/password-hide.svg'
import passVisibleIco from '../../icons/password-visible.svg'
import { useState } from 'react'
export function EmailInput( props ){
    return( 
        <div className={styles.inputCont}>
            <input autoComplete="off" className={styles.CustomInput+" "+props.className} type="text" placeholder={ props.placeholder } status={ props.status + "" } {...props.other}/>
            <label htmlFor={props.name}>{props.placeholder}</label>
        </div>
    )
}

export function LoginInput( props ){
    
    return(
        <div className={styles.inputCont}>
            <input autoComplete="off" className={styles.CustomInput+" "+props.className} type="text" placeholder={ props.placeholder } status={ props.status + "" }  {...props.other} />
            <label htmlFor={props.name}>{props.placeholder}</label>
        </div>
        
    )
}

export function DefaultInput( props ){
    try{
        props.value()
    }
    catch(e){

    }
    return(
        <div className={styles.inputCont}>
            <input autoComplete="off" className={styles.CustomInput+" "+props.className} type="text" placeholder={ props.placeholder } status={ props.status + "" } {...props.other} />
            <label htmlFor={props.name}>{props.placeholder}</label>
        </div>
    )
}
export function HiddenInput( props ){
    try{
        props.value()
    }
    catch(e){

    }
    return(
        <input type='hidden' name={props.name} {...props.other} />
    )
}
export function PasswordInput( props ){
    return(
        <div className={styles.inputCont}>
            <input autoComplete="off" className={`${styles.CustomInput} ${styles.password} ${props.className}`} type="password" placeholder={ props.placeholder } status={ props.status + "" } {...props.other} />
            <label htmlFor={props.name}>{props.placeholder}</label>
            <img src={passHideIco} onClick={ passwordClick }/>
        </div>
        
    )
}

function passwordClick(event){
    let img = event.target
    let input = img.parentNode.querySelector("input")
    let sc = img.src.substr( img.src.indexOf("/", 7)) 
    if( sc == passHideIco ){
        img.src = passVisibleIco
        input.type = "text"
    }
    else{
        img.src = passHideIco
        input.type = "password"
    }
}