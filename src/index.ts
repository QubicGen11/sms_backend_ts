import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import logger from './helpers/logger';
import organisationRouter from './routes/organisationRouter'
import passwordRouter from './routes/passwordRoutes'
import authenticationRouter from './routes/authenticationRouter'
import branchRouter from './routes/branchRouter'
import roleRouter from './routes/roleRouter'
import groupRouter from './routes/groupRouter'
import featureRouter from './routes/featureRouter'
import { limiter } from './helpers/rateLimitter';
import userRouter from './routes/userRouter'
import morgan from 'morgan'
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'))
// app.use(limiter)
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify which methods are allowed
  allowedHeaders: ['Content-Type', 'Authorization'],  // Specify which headers are allowed
  credentials: true  // Allow cookies to be sent with the request
}));

app.use('/sms',organisationRouter)
// app.use('/sms',limiter,passwordRouter)
app.use('/sms',authenticationRouter)
app.use('/sms',branchRouter)
app.use('/sms',roleRouter)
app.use('/sms',groupRouter)
app.use('/sms',featureRouter)
app.use('/sms',userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  logger.info('hello from backend')
});
