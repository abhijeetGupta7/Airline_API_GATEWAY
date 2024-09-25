const express=require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server-config');
const apiRouter = require('./routes');
const app=express();

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api",apiRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}`);
})


