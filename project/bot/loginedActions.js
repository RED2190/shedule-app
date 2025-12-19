import userModel from "../../models/users.js"

export default{
    "removeProfile": async( bot, msg, user ) => {
        await userModel.findOneAndDelete( { tg_id: user.tg_id } )
        await bot.sendMessage( msg.chat.id, "Профиль успешно удален!" )
    },
    "addClass": async( bot, msg, user ) => {
        
    }
}