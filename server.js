const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const articleRouter = require('./routes/route');
// const URI = require('./keys')

const app = express();
const PORT = process.env.port || 8000;

app.use(cors());
app.use(express.json());
app.use('/articles', articleRouter);

const URI = "mongodb+srv://Mark:6wzxNf4slKPBtK8N@bored-items.xl0qh.mongodb.net/articles?retryWrites=true&w=majority"
// process.env.ATLAS;

mongoose.connect(URI, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once('open', 
    () => console.log(`Database connected on port ${PORT}`)
);

app.listen(PORT, () => console.log("Contraption is working"))