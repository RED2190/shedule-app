
export default ( clases ) => {
    clases = Object.keys(clases)
    console.log(clases, clases.length)
    if( clases.length == 0 ){
        return "У вас еще нет классов в подчинении"
    }
    let mail = ``;
    Object.values(clases).forEach( cl => {
        let body = ``
        body += `               *Класс: ${cl.name}*\n`
        body += `ID: <code>${cl.id}</code>\n`
        body += `Предметы у вас: `;
        console.log(body)
        Object.keys(cl.subjects).forEach( p => { body += ` ${p},` } )
        mail += body + `\n`
    } )
    return mail
}