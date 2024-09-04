import express from 'express';
import configure from './controllers/index.js';
import connectionWithAtlas from './mongoManager.js'
import 'dotenv/config'
const port = 3030;
const app = express();
app.use(express.json());

const log = (mssg) => console.log(mssg)

connectionWithAtlas();
configure(app);

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