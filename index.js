import express from 'express';
import configure from './controllers/index.js';
import connectionWithAtlas from './mongoManager.js'
import 'dotenv/config'

import cors from 'cors'
import { handleErrors } from './utils/handleErrors.js';
import { uploadFile } from './utils/index.js'
const port = 3030;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
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