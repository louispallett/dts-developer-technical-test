
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const logger = require('morgan');
const path = require("path");
const RateLimit = require("express-rate-limit");
const session = require("express-session");
const cors = require('cors');
require('dotenv').config();


require("./database/mongoConfig.js");


const taskRouter = require("./routes/taskRouter.js");


const app = express();
app.set('trust proxy', 1); 

const allowedOrigins = [
    'http://localhost:3001',
    'https://dts-technical-lnp.netlify.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.use(function (err, req, res, next) {
    if (err instanceof Error && err.message === 'Not allowed by CORS') {
        return res.status(403).json({ message: 'CORS error: This origin is not allowed.' });
    }
    next(err);
});


app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet()); 
app.use(logger('dev'));


const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 75,
});
app.use(limiter);


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        sameSite: 'lax'
    }
}));


app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});


app.use("/api/task", taskRouter);


app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
