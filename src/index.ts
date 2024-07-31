import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import logger from './helpers/logger';
import organisationRouter from './routes/organisationRouter'
import branchRouter from './routes/branchRouter'
import passwordRouter from './routes/passwordRoutes'
import { limiter } from './helpers/rateLimitter';
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(limiter)
app.use(cors())


app.use('/sms',organisationRouter)
app.use('/sms',branchRouter)
app.use('/sms',limiter,passwordRouter)




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
