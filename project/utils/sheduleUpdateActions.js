import { Class, Lesson, Shedule } from '../utils/clases.js';
import checkClassValid from '../utils/checkClassValid.js';
import userModel from ".././models/users.js"
import checkLessonValid from './checkLessonValid.js';
const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
export const actions = {
    "addLesson": async ( props = {user: Object, day: String, lesson: Object, index: Number, }, req, res )=>{ 
        const user = props.user
        checkLessonValid( user, props.lesson, res )
        const shedule = new Shedule(props.user.shedule, user);
        const lesson = new Lesson( { ...props.lesson } )
        console.log(lesson)
        shedule.addLesson( props.day, lesson, props.index )
        shedule.reInit(user)
        await userModel.findOneAndUpdate( {_id: user._id}, { $set: {shedule: {...shedule}, clases: { ...user.clases } } } )
        return res.status(200).json( {
            message: "Новый урок успешно добавлен",
            shedule: shedule
        } )
    },
    "addClass": async ( props = {user: Object, name: String, subsjects: Object}, req, res ) => {
        const user = props.user
        const cl = new Class( props.name, props.subjects )
        const checkValid = checkClassValid( user.clases, props.name )
        if( checkValid ){
            return res.status(400).json({
                message: "Класс с таким именем уже существует"
            })
        }
        user.clases[cl.name] = cl
        await userModel.findOneAndUpdate( {_id: user._id}, { $set: { clases: { ...user.clases } } } )            
        return res.status(200).json({
            message: "Класс успешно добавлен!",
        })
    },
    "removeClass": async ( props = { user: Object, name: String }, req, res ) => {
        const user = props.user
        const checkValid = checkClassValid( user.clases, props.name )
        if( !checkValid ){
            return res.status(400).json({
                message: "Класса с таким именем не существуте, проверьте правильность введенной информации"
            })
        }
        const removeClass = removeProperty(props.name)
        const newClases = removeClass( user.clases )
        await userModel.findOneAndUpdate( { _id: user._id }, { $set: { clases: newClases } } )
        res.json({
            message: "Класс был успешно удален!",
            clases: newClases
        })
    },
    "removeLesson": async ( props = { user: Object, day: String, index: Number }, req, res ) => {
        const user = props.user
        const lesson = user.shedule[props.day][props.index-1]
        if( lesson == null ){
            return res.json({
                message: "В указанный день, урока с таким порядковым не существует"
            })
        }
        else{
            return res.json({lesson})
        }
    },
}