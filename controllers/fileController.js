import express from 'express';
const router = express.Router();
import { uploadFile } from '../utils/index.js'


router.post('/', uploadFile.single('avatar'), function (req, res, next) {

    const fileObj = req.file;
    res.json(fileObj)
})
const configure = (app) => {
    app.use('/api/file', router)
}

export default configure;