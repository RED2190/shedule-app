import texts from "./texts.js"
import userModel from "../models/users.js"
import { validLogin } from "./validations/index.js"
import bcrypt from "bcrypt"

export default{
    1:async ( bot, msg, user ) => {
        let text = texts["reg_step1"]().text
        let props = texts["reg_step1"]().props
        bot.sendMessage(msg.chat.id, text, props);
        await userModel.findOneAndUpdate( { tg_id: user.tg_id },{$set:{step: 2}})
    },
    2: async( bot, msg, user ) => {
        let text = texts["reg_step2"](msg.text).text
        let props = texts["reg_step2"](msg.text).props
        await bot.sendMessage(msg.chat.id, text, props);
        await bot.on('callback_query', async ctx => {

            try {
                let answer = ctx.data
                if( answer == "resolve" ){
                    text = texts["reg_step2_resolve"](msg.text).text
                    props = texts["reg_step2_resolve"](msg.text).props
                    await userModel.findOneAndUpdate( { tg_id: user.tg_id },{$set:{step: 3, fullName: msg.text}})
                    await bot.sendMessage(msg.chat.id, text, props);        
                }
                else if( answer == "reject" ){
                    // await userModel.findOneAndUpdate( { tg_id: user.tg_id },{$set:{step: 2}})
                    text = texts["reg_step2_reject"]().text
                    props = texts["reg_step2_reject"]().props
                    await bot.sendMessage(msg.chat.id, text, props);        
                }
                await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
            }
            catch(error) {
        
                console.log(error);
        
            }
        
        })
    },
    3: async( bot, msg, user ) => {
        const wait_mes = await bot.sendMessage(msg.chat.id, texts["reg_step3_wait"]().text);
        let tempLogin = msg.text
        let valLogin = validLogin( tempLogin )
        await valLogin.then( async(val) => {
            let text, props;
            if( val == null ){
                text = texts[`reg_step3`](tempLogin).text
                props = texts[`reg_step3`](tempLogin).props
                await userModel.findOneAndUpdate( { tg_id: user.tg_id },{$set:{step: 4, login: tempLogin}})
            }
            else{
                text = texts[`reg_step3_${val}`]().text
                props = texts[`reg_step3_${val}`]().props
    
            }
            await bot.deleteMessage( wait_mes.chat.id, wait_mes.message_id )
            await bot.sendMessage(msg.chat.id, text, props);
        } )
    },
    4: async( bot, msg, user ) => {
        const password = msg.text
        let text = texts["reg_step4"](password).text
        let props = texts["reg_step4"](password).props
        await bot.sendMessage(msg.chat.id, text, props);
        await bot.on( 'callback_query', async ctx => {
            try{
                let answer = ctx.data
                if( answer == "resolve" ){
                    text = texts["reg_step4_resolve"]().text
                    props = texts["reg_step4_resolve"]().props
                    const salt = await bcrypt.genSalt(10)
                    const hash = await bcrypt.hash(password, salt)
                    await userModel.findOneAndUpdate( { tg_id: user.tg_id },{$set:{ passwordHash: hash, isRegistration: false, step: 1 }})
                    await bot.sendMessage(msg.chat.id, text, props);        
                    await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
                }
                else if( answer == "reject" ){
                    text = texts["reg_step4_reject"]().text
                    props = texts["reg_step4_reject"]().props
                    await bot.sendMessage(msg.chat.id, text, props);        
                    await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
                }
            }
            catch(e){
                console.log("error")
            }
        })
    },
    5: async( bot, msg, user ) => {
        
    },
}
var i = 0