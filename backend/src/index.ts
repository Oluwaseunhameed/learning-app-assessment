// import express from 'express';
// import dotenv from 'dotenv';
// import subjectsRoutes from './routes/subjectsRoutes';
// import topicsRoutes from './routes/topicsRoutes';
// import completionsRoutes from './routes/completionsRoutes';
// import rankingsRoutes from './routes/rankingsRoutes';
// import { sequelize } from './config/database';

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use('/api/subjects', subjectsRoutes);
// app.use('/api/topics', topicsRoutes);
// app.use('/api/completions', completionsRoutes);
// app.use('/api/rankings', rankingsRoutes);

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, async () => {
//   console.log(`Server running on port ${PORT}`);
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected');
//   } catch (error) {
//     console.error('Database connection failed', error);
//   }
// });

import express from 'express';
import dotenv from 'dotenv';
import subjectsRoutes from './routes/subjectsRoutes';
import topicsRoutes from './routes/topicsRoutes';
import completionsRoutes from './routes/completionsRoutes';
import rankingsRoutes from './routes/rankingsRoutes';
import { sequelize } from './config/database';
import './models/index';

dotenv.config();

const app = express();
app.use(express.json());

// Register routes
app.use('/api/subjects', subjectsRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/completions', completionsRoutes);
app.use('/api/rankings', rankingsRoutes);

// Root endpoint for basic connectivity check
app.get('/', (req, res) => {
  res.send('Learning App Backend');
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    // Optionally synchronize the database schema
    // await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
  }
};

startServer();

