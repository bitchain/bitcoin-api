import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import routes from './routes';

import './providers';

const node = express();

node.use(cors());
node.use(express.json());
node.use(routes);

node.listen(3333);
