import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import userModel from ".././models/users.js"
import { validationResult } from 'express-validator';
import { Class, Lesson, Shedule } from '../utils/clases.js';
import {actions} from "../utils/sheduleUpdateActions.js"
export const register = async (req, res) =>{
    try{
        const errors = validationResult(req);
        if( !errors.isEmpty() ){
            return res.status(400).json(errors.array())
        }
    
        const password =  req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new userModel ({
            login: req.body.login,
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            subjects: req.body.subjects,
            shedule: new Shedule( req.body.shedule ),
            clases: req.body.clases,
            themes: req.body.themes,
        })
    
        const user = await doc.save()
        const { passwordHash, ...userData } = user._doc
        const token = jwt.sign({
            _id: user._id
        }, 'secret',{
            expiresIn: '30d'
        })
    
        res.json({
            ...userData,
            token
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться"
        })
    }
}

export const login = async ( req, res ) => {
    console.log(req.ip)
    try{
        const user = await userModel.findOne({ login: req.body.login })
        if( !user ){
            return res.status(404).json({
                message: "Ошибка авторизации, пользователь не авторизирован"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if( !isValidPass ){
            return res.status(400).json({
                message: "Не верный логин или пароль"
            })
        }

        const { passwordHash, ...userData } = user._doc
        const token = jwt.sign({
            _id: user._id
        }, 'secret',{
            expiresIn: '30d'
        })
    
        res.json({
            ...userData,
            token
        })

    }
    catch(err){
        console.log(err)
        res.status(404).json({
            message: "Не удалось авторизироваться"
        })
    }
}

export const getMe = async ( req, res ) => {
    try{
        const user = await userModel.findById(req.userId)
        if( !user ){
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        
        const { passwordHash, ...userData } = user._doc
        res.json(userData)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Нет доступа",
        })
    }
}

export const update = async ( req, res ) => {
    try{
        const user = await userModel.findById(req.userId)
        if( !user ){
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }
        const type = req.body.data.type
        const props = { user, ...req.body.data.props}
        actions[type](props, req, res)

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            message: "Ошибка получения данных!"
        })
    }
}
export const updateThemes = ( req, res ) => {
    console.log( req.file )
}