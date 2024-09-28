const express=require('express');
const bodyParser = require('body-parser');
const { PORT, FLIGHT_SERVICE_URL, BOOKING_SERVICE_URL } = require('./config/server-config');
const apiRouter = require('./routes');
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

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

app.use("/flightService", createProxyMiddleware({ target: FLIGHT_SERVICE_URL, changeOrigin: true, pathRewrite: { '^/flightService': '' } })); // remove /flightService from the request URL , otherwise the finalTarget URL will be http:/localhost:8000/flightService, so in the flightService also we have to handle the /flightService route part by using the app.use("/flightService/api")  
app.use("/bookingService",createProxyMiddleware({ target: BOOKING_SERVICE_URL, changeOrigin: true, pathRewrite: { '^/bookingService': '' } })); // remove /flightService from the request URL 

app.use("/api",apiRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}`);
})


