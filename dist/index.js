"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const index_1 = require("./src/routes/index");
const app = express();
// env setup
require('dotenv').config();
// mongoose connection
const databaseUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jnmms.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log('Database Connected'));
// json setup
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// routes
app.use('/api/v1', index_1.default.api);
// routes(app, '/api/v1');
// Setting up server
const PORT = process.env.PORT;
app.get('/', (req, res) => res.send(`Server running on port ${PORT}`));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
