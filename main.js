import express from 'express';
import bodyParser from 'body-parser';
import api from './api.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({
  quiet: true
})

import { test_err_test_middleware } from './middlewares/test.middleware.js';

const app = express()
const port = 3000


app.use(cors())

app.use(bodyParser.json())

app.use("/api", api)

app.use(test_err_test_middleware)

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})