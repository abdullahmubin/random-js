import mongoose from 'mongoose';

const connectionWithAtlas = () => {
    // mongoose.connect(uri) 
    //mongodb + srv://<db_username>:<db_password>@cluster0receipt.lo43e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0Receipt
    mongoose.connect('mongodb+srv://mubingalib:mubingalibtestname@cluster0receipt.lo43e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0Receipt')
        .then(() => console.log('Connected!'));
}

export default connectionWithAtlas;