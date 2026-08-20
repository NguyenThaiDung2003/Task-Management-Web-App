import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing với tiền tố /api/v1
app.use('/api/v1', routes);

// Middleware xử lý lỗi
app.use(errorHandler);

export default app;