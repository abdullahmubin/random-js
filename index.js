import express from 'express';
import configure from './controllers/index.js';
import connectionWithAtlas from './mongoManager.js'
const port = 3030;
const app = express();
app.use(express.json());

const log = (mssg) => console.log(mssg)
const uri = 'mongodb+srv://codemenalmubin:BxM1RKZqXCwAQUxK@cluster0receipt.lo43e.mongodb.net/';
// @cluster0.hmon7fk.mongodb.net/

connectionWithAtlas();
configure(app);

app.listen(port, () => {
    console.log('listening to port')
})

// log(models)