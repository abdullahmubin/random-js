import express from 'express';
import models from '../models/index.js';
import { saveUser, getAllUsers, update, deleteById, getById, registerUser, login } from '../services/userService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await saveUser(body);
        res.status(201).send(user._id);
    } catch (error) {
        return next(error, req, res)
    }


    // const body = req.body;
    // const user = await saveUser(body);
    // if (user instanceof Error) {
    //     res.status(409).send(user.message);
    // }
    // else
    //     res.status(201).send(user._id);

}

const registerUserHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await registerUser(body);
        res.status(201).send(user);
    } catch (error) {
        return next(error, req, res)
    }
}

const loginUserHandler = async (req, res, next) => {
    try {
        const body = req.body;
        console.log('body');
        console.log(body)
        const user = await login({ email: body.email, password: body.password });
        res.status(201).send(user);
    } catch (error) {
        return next(error, req, res)
    }
}

const getHaadler = async (req, res) => {
    // const q = JSON.stringify(req.query.dfsdf);
    try {
        const users = await getAllUsers();
        res.status(200).send(users)
    } catch (error) {
        return next(error, req, res)
    }

}

const deleteHandler = async (req, res, next) => {
    try {

        const id = req.query.id;
        await deleteById(id);
        res.status(200).send("User deleted.")

    } catch (error) {
        return next(error, req, res)
    }




}

const putHandler = async (req, res) => {
    const body = req.body;

    const user = await update(body);
    res.status(200).send(user._id);
}

const getByQueryHaadler = async (req, res) => {
    const id = req.params.id;

    // console.log('req');
    // console.log(req)

    if (!id) {
        res.status(400).send("Id not provided");
    }

    const user = await getById(id);
    res.status(200).send(user)
}

router.get('/', getHaadler)
router.get('/:id', getByQueryHaadler)
router.post('/', postHandler)
router.put('/', putHandler);
router.delete('/', deleteHandler)
router.post('/register', registerUserHandler)
router.post('/login', loginUserHandler)

const configure = (app) => {
    app.use('/users', authenticateToken, router)
}

export default configure;