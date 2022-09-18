import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';  // DB
import { registerValidation, loginValidation,  postCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as userController from  './controllers/userController.js';
import * as postController from  './controllers/postController.js';

mongoose
.connect('mongodb+srv://constlogin:CQtiN4tsaQEQjGy@cluster0.ticajt4.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));


const app = express();

app.use(express.json());
app.post('/auth/login', loginValidation, userController.login);
app.post('/auth/register', registerValidation, userController.register);
app.get('/auth/me', checkAuth, userController.getMe);

app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getOne);
app.post('/posts', checkAuth, postCreateValidation, postController.create);
app.delete('/posts/:id', checkAuth, postController.remove);
app.patch('/posts/:id', checkAuth, postController.update);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server Ok');
});