import express from 'express';
import models from '../models/index.js';
import { saveUser, getAllUsers, update, deleteById, getById } from '../services/userService.js';
const router = express.Router();

const postHandler = async (req, res) => {
    const body = req.body;
    const user = await saveUser(body);
    res.status(201).send(user._id);

}

const getHaadler = async (req, res) => {
    // const q = JSON.stringify(req.query.dfsdf);
    const users = await getAllUsers();

    res.status(200).send(users)
}

const deleteHandler = async (req, res) => {
    const id = req.query.id;

    // console.log('req');
    // console.log(req)

    if (!id) {
        res.status(400).send("Id not provided");
    }

    await deleteById(id);
    res.status(200).send("User deleted.")
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

const configure = (app) => {
    app.use('/users', router)
}

export default configure;