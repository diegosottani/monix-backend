import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { root_router } from './api/root_router.js';
import { auth_router } from './api/auth/auth_router.js';
import { auth_middleware } from './api/auth/auth_middleware.js';


const app = express();

app.use(cors({
  origin: ['http://app.monixbr.com', 'https://app.monixbr.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', root_router);
app.use('/auth', auth_middleware)
app.use('/auth', auth_router)


app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);