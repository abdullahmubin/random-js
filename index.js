import express from 'express';
import configure from './controllers/index.js';
import connectionWithAtlas from './mongoManager.js'
import 'dotenv/config'

import cors from 'cors'
import { handleErrors } from './utils/handleErrors.js';
import { uploadFile } from './utils/index.js'
import { login } from './services/userService.js';
const port = 3030;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

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

app.use('/login', loginUserHandler)
// GET request to access the photo or file http://localhost:3030/uploads/1725709867714-109407206-Printable Receipt.pdf



const log = (mssg) => console.log(mssg)

connectionWithAtlas();
configure(app);

app.use(handleErrors);

app.post('/api/data', async (req, res) => {
    try {
        await connectionWithAtlas();  // Ensure DB is connected
        // Handle the POST request here
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log('listening to port')
})

// log(models)