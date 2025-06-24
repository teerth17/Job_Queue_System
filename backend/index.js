const express = require("express");
const mainRouter = require('./src/routes/index'); 
const cors = require('cors');

const port = 3000;
const app = express();


app.use(express.json());
app.use(cors())
app.use("/api/v1",mainRouter)


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
