import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose'; 
import { registerValidation } from "./validations/auth.js"
import checkAuth from './utils/checkAuth.js';
import * as userController from './controllers/userController.js'

mongoose
    .connect('mongodb...')
    .then(()=> console.log("DB ok") )
    .catch((err) => console.log(err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },

})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads/', express.static('uploads'))

app.post( '/auth/login', userController.login)

app.post('/auth/registration/', registerValidation, userController.register)

app.post('/me/update', checkAuth, userController.update)

app.get('/me/update/addThemes', userController.updateThemes)

app.get('/me/', checkAuth, userController.getMe)

app.post('/upload', checkAuth ,upload.single('image'), ( req, res ) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

const server = app.listen(port, (err) => {
    if (err){
        return console.log(err)
    }
    else{
        return console.log('SERVER STARTED')
    }
})
