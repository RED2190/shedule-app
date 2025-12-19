export default ( clases, className ) => {
    var flag = false
    Object.keys(clases).forEach(element => {
        if( element == className ){
            flag = true
        }
    });
    return flag
}