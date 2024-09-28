const express=require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server-config');
const apiRouter = require('./routes');
const { rateLimit } = require('express-rate-limit');
const app=express();

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const limiter = rateLimit({
	windowMs: 3 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use("/api",apiRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}`);
})


