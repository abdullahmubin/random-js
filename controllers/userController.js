import express from 'express';
import models from '../models/index.js';
import { saveUser, getAllUsers } from '../services/userService.js';
const router = express.Router();

const postHandler = async (req, res) => {
    const body = req.body;
    const user = await saveUser(body);
    res.send(user._id);

}

const getHaadler = async (req, res) => {
    // const q = JSON.stringify(req.query.dfsdf);
    const users = await getAllUsers();

    res.send(users)
}

router.get('/', getHaadler)

router.post('/', postHandler)

const configure = (app) => {
    app.use('/users', router)
}

export default configure;