import express from 'express';
import carRoutes from './Routes/CarRoutes';
import motorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);

export default app;
