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

app.listen(port, () => {
    console.log('listening to port')
})

// log(models)