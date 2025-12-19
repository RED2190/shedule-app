import mongoose from "mongoose";
import { Shedule } from "../utils/clases.js";

const UserShema = new mongoose.Schema({
    login:{
        type: String,
        default: "",
    },
    fullName:{
        type: String,
        default: ""
    },
    email:{
        type: String,
        default: "",
    },
    passwordHash:{
        type: String,
    },
    subjects:{
        type: Object,
        default: {},
    },
    shedule:{
        type: Object,
        default: new Shedule(),
    },
    clases:{
        type: Object,
        default: {},
    },
    themes: {
        type: Object,
        default: {},
    },
    files: {
        type: Array,
        default: [],
    },
    tg_id:{
        type: Number,
        required: true,
        unique: true,
    },
    isRegistration:{
        type: Boolean,
        default: false
    },
    isLogining:{
        type: Boolean,
        default: false,
    },
    step:{
        type: Number,
        default: 0
    },

},{
    timestamps: true,
    minimize: false,
})

export default mongoose.model('users', UserShema)