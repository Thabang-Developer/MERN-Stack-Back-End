const mongoose = require("mongoose");
require("dotenv").config();

const app = require('./app');


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err);
    process.exit(1);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err);
    db.close(() => { process.exit(1) });
});

const connect = process.env.DB_URI ? process.env.DB_URI : process.env.DB_URL;

mongoose.connect(connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => { console.log(`Successfully connected to the database!!!`) });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server has started on http://127.0.0.1:${PORT}`);
})