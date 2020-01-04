
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import Middlewares from './api/middlewares'
import Authentication from './api/authentication'
import LoadData from './api/loadData'
import UserRouter from './user/router'
import CategoryRouter from './category/router'
import SubCategoryRouter from './subCategory/router'
import ProductRouter from './product/router'

if(!process.env.JWT_SECRET) {
    const err = new Error('No JWT_SECRET in env variable');
    console.error(err);
}

const app = express();

mongoose.connect(config.mongoose.uri, { useMongoClient: true })
.catch(err=>console.error(err));

mongoose.Promise = global.Promise;

// App Setup
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.post('/signup', Authentication.signup)
app.post('/signin', Authentication.signin)
app.post('/loadData', LoadData.loadData )
app.use('/user', Middlewares.loginRequired, UserRouter)
app.use('/category', CategoryRouter)
app.use('/sub_category', SubCategoryRouter)
app.use('/product', ProductRouter)

app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, ()=>{
    console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
});
