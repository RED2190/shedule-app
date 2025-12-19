import ini from "ini"
import fs from "fs"
import userModel from ".././models/users.js"
import mongoose from 'mongoose'; 
import TelegramBot from "node-telegram-bot-api"
import texts from "./texts.js"
import sheduleToMes from "./sheduleToMes/index.js";
import clasesToMes from "./clasesToMes/index.js";
import unirest from "unirest";
import { validLogin } from "./validations/index.js";
import regActions from "./regActions.js";
import regularCommands from "./regularCommands.js";
import loginedActions from ".loginedActions.js";
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))
const bot_token = config.Telegram.BOT_TOKEN
const author = "232697306"
var user = null

mongoose
    .connect('mongodb')
    .then( console.log( "DB in bot - ok" ) )
    .catch((err) => console.log(err))

const bot = new TelegramBot(bot_token, { polling: { interval: 300, autoStart: true } });
bot.on("polling_error", err => console.log(err.data.error.message));
bot.on( 'text', async (msg) => {
    try{
        if( msg.chat.id != author ) await bot.sendMessage(author, `Новое сообщение:\n${msg.text} \nПользователь: @${msg.from.username} \nID :${msg.from.id}\nИмя: ${msg.from.first_name} ${msg.from.last_name}`)
        const cmd = msg.text
        const user_name = msg.from.first_name
        const user_id = msg.from.id
        const user_nick = msg.from.username
        const user = await userModel.findOne({ tg_id: user_id })
        if( user ){
            let isRegistration = user.isRegistration
            let isLogining = user.isLogining
            let step = user.step
            if( isRegistration ){
                regActions[step](bot, msg, user)
            }
            else if( isLogining ){

            }
            else{
                regularCommands[cmd](bot, msg, user)
            }
        }
        else{
            let newUser = new userModel({
                tg_id: user_id,
                isRegistration: true,
                step: 1,
            })
            await newUser.save()
            regActions[1](bot, msg, newUser)
            if( msg.chat.id != author ) await bot.sendMessage(author, `Зарегестрирован новый пользователь:\nСообщение: ${msg.text} \nПользователь: @${msg.from.username} \nID :${msg.from.id}\nИмя: ${msg.from.first_name} ${msg.from.last_name}`)
        }
    }
    catch(error){
        console.log(error)
    }
} )
bot.on('callback_query', async ctx => {
    const msg = ctx.message
    try{
        const cmd = ctx.data
        const user_name = msg.chat.first_name
        const user_id = msg.chat.id
        const user_nick = msg.chat.username
        const user = await userModel.findOne({ tg_id: user_id })
        if( user ){
            let isRegistration = user.isRegistration
            if( !isRegistration ){
                loginedActions[cmd]( bot, msg, user )
            }
        }
    }
    catch(e){
        console.log(e)
    }
})