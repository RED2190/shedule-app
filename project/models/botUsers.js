import mongoose from "mongoose";

const BotUser = new mongoose.Schema({
    tg_id:{
        type: Number,
        required: true,
        unique: true,
    },
    isRegistration:{
        type: Boolean,
        required: true,
        default: false
    },
    isLogining:{
        type: Boolean,
        required: true,
        default: false,
    },
    step:{
        type: Number,
        required: true,
        default: 0
    },
},{
    timestamps: true,
    minimize: false,
})

export default mongoose.model('tg-user', BotUser)