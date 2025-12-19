import checkClassValid from "./checkClassValid.js"
import checkSubjectsValid from "./checkSubjectsValid.js"

export default ( user, lesson, res ) =>{
    const classValid = checkClassValid( user.clases, lesson.class )
    if( !classValid ) return res.status(400).json({ message: "У вас нет указанного класса в подчинении" })

    const userSubjectsValid = checkSubjectsValid( user.subjects, lesson.subject )
    if( !userSubjectsValid ) return res.status(400).json({ message: "Вы не ведете указанный предмет" })

    const classSubjectsValid = checkSubjectsValid( user.clases[lesson.class].subjects, lesson.subject )
    if( !classSubjectsValid ) return res.status(400).json({ message: "Вы не ведете указанный предмет у указанного класса" })


    return true
}