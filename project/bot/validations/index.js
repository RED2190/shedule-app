import userModel from "../../models/users.js"
export const validLogin = async(login = "") => {
        if( login.length < 4 ){ return "mis" }
        // let dog_index = login.indexOf("@")
        // let point_index = login.indexOf(".")
    
        // if( dog_index <= 0 && point_index <= 1 ){return false }
        const user = await userModel.findOne( { "login": login } )
        if( user ){ return  "novalid" }
        else{ return null }
}