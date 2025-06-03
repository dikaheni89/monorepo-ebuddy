import express from 'express';
import cors from 'cors';
import userRoutes from '@/routes/userRoutes';
import { errorHandler } from '@/utils/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());

app.use('/api', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
