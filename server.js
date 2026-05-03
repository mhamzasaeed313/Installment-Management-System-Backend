const app = require('./app');
const dotenv = require("dotenv");
dotenv.config(); 

const db_connection = require('./config/db');
db_connection ();


const PORT = process.env.PORT || 5000;
app.listen (PORT,()=>{
    console.log( `Server is running on ${PORT}`)
})