const days = {
    mo: "Понедельник", 
    tu: "Вторник",
    we: "Среду",
    th: "Четверг",
    fr: "Пятницу",
    st: "Субботу",
    su: "Воскресенье",
}

export default ( shedule ) => {
    let mail = ``;
    for( let i = 0; i < 7; i++ ){
        let day_index = Object.keys(shedule)[i]
        let title = `*Расписание на ${days[day_index]}:*\n`
        let body = ``;
        let day = shedule[day_index]
        if( day.length == 0 ){
            body += "Уроки отсутствуют\n"
        }
        else{
            day.forEach(lesson => {
                
            });
        }
        mail += title + body + '\n'
    }
    return mail
}