import texts from "./texts.js"
import userModel from "../models/users.js"
import { validLogin } from "./validations/index.js"
import bcrypt from "bcrypt"
import sheduleToMes from "./sheduleToMes/index.js"
import clasesToMes from "./clasesToMes/index.js"
const c = "`"
export default{
    "/menu": async( bot, msg, user ) =>{ 
        await bot.sendMessage(msg.chat.id, 'Меню бота', {parse_mode: "MarkdownV2", reply_markup: {

            keyboard: [

                ['Мое расписание', 'Мои классы'],
                ['Мои предметы', 'Мои темы']

            ],
            resize_keyboard: true,

        } })
    },
    "/profile": async( bot, msg, user ) => { 
        let shedule = user.shedule
        let shedule_mes = sheduleToMes(shedule)
        let mail = `*Общая информация*
Имя: ${c+user.fullName+c}
Телеграмм ID: ${c+user.tg_id+c}
Логин: ${c+user.login+c}

Расписание:
${shedule_mes}
Классы:

Предметы:`


        await bot.sendMessage(msg.chat.id, mail, {parse_mode: "MarkdownV2", reply_markup: {
            inline_keyboard: [

                [{text: 'Удалить профиль', callback_data: 'removeProfile'} ],
    
            ]

        } })
    },
    "Мои классы": async( bot, msg, user )=> {
        let clases = user.clases
        let clases_mes = clasesToMes(clases)
        let mail = `*Ваши классы:*\n ${clases_mes}`
        await bot.sendMessage(msg.chat.id, mail, {parse_mode: "MarkdownV2", reply_markup: {

            inline_keyboard: [

                [{text: 'Добавить класс', callback_data: 'addClass'},{text: 'Удалить класс', callback_data: 'removeClass'} ],
    
            ]

        } })
    }
}