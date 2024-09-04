import mongoose from 'mongoose';
import 'dotenv/config'
const connectionWithAtlas = () => {
    mongoose.connect(process.env.connectionString)
        .then(() => console.log('Connected!'));
}

export default connectionWithAtlas;