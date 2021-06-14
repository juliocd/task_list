import * as express from 'express';
import * as mongoose from 'mongoose';
import routes from './src/routes/index';

const app = express();

// env setup
require('dotenv').config()

// json setup
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// routes
app.use('/api/v1', routes.api);
// routes(app, '/api/v1');

// Setting up server
const PORT: string = process.env.PORT;

app.get('/', (req, res) =>
    res.send(`Server running on port ${PORT}`)
);

// mongoose connection
const databaseUri: string = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jnmms.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => {    
        console.log(`Server running on port ${PORT}`);
    })
});