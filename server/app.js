bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet")
const logger = require('morgan');
const path = require("path");
const RateLimit = require("express-rate-limit");
const session = require("express-session");

require('dotenv').config();

require("./database/mongoConfig.js");

const taskRouter = require("./routes/taskRouter.js");

const limiter = RateLimit({
    windowMs: 1 *  60 * 1000,
    max: 75,
});  

const app = express();

app.use((req, res, next) => {
    const allowedOrigin = process.env.NODE_ENV === 'production' 
        ? 'https://dts-technical-lnp.netlify.app/' 
        : 'http://localhost:3001';
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'", "'https://dts-developer-test.fly.dev/favicon.ico'"],
            "script-src": ["'self'", "'unsafe-inline'"], 
            "img-src": ["'self'", "https://dts-developer-test.fly.dev/favicon.ico"] 
        },
    }),
);
app.use(logger('dev'));
app.use(limiter);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use("/api/task", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));