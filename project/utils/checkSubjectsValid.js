export default ( subjects, subjectName ) => {
    var flag = false
    Object.keys(subjects).forEach(name => {
        if( name == subjectName ){
            flag = true
        }
    });
    return flag
}